class TodoApp {
    constructor() {
        // 初始化待辦事項陣列
        this.todos = [
            { id: 1, text: "todo 1", description: "This is the description for todo 1", completed: false, expanded: false },
            { id: 2, text: "todo 2", description: "This is the description for todo 2", completed: false, expanded: false }
        ];
        this.nextId = 3;
        
        this.initializeElements();
        this.bindEvents();
        this.renderTodos();
    }
    
    // 從 HTML 抓取元素（透過 id）
    initializeElements() {
        this.todoInput = document.getElementById("todoInput");
        this.descriptionInput = document.getElementById("descriptionInput");
        this.addBtn = document.getElementById("addBtn");
        this.todoList = document.getElementById("todoList");
    }
    
    // 綁定事件處理器
    bindEvents() {
        // 按鈕點擊
        this.addBtn.addEventListener("click", () => this.addTodo());
        
        // Enter 鍵新增
        this.todoInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.addTodo();
        });
        
        // Ctrl+Enter 新增
        this.descriptionInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && e.ctrlKey) this.addTodo();
        });
    }
    
    // 新增待辦事項
    addTodo() {
        const text = this.todoInput.value.trim();
        const description = this.descriptionInput.value.trim();
        
        if (!text) return;
        
        const newTodo = {
            id: this.nextId++,
            text: text,
            description: description || "No description provided",  // || 提供預設值
            completed: false,
            expanded: false
        };
        
        this.todos.push(newTodo);
        this.renderTodos();
        
        // 清空輸入框
        this.todoInput.value = "";
        this.descriptionInput.value = "";
        this.todoInput.focus();
    }
    
    // 刪除待辦事項
    deleteTodo(id) {
        // filter 保留 id 不相等的項目（類似 remove_if）
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.renderTodos();
    }
    
    // 切換完成狀態
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }
    
    // 切換描述顯示
    toggleDescription(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.expanded = !todo.expanded;
            this.renderTodos();
        }
    }
    
    // 建立單個 Todo 元素
    createTodoElement(todo) {
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";
        todoItem.dataset.id = todo.id;
        
        // 勾選框
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => this.toggleTodo(todo.id));
        
        // 文字
        const todoText = document.createElement("span");
        todoText.className = "todo-text";
        todoText.textContent = todo.text;
        
        // 刪除按鈕
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "delete";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();  // 阻止事件冒泡
            this.deleteTodo(todo.id);
        });
        
        // 組裝元素
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        
        // 點擊項目展開描述
        todoItem.addEventListener("click", (e) => {
            if (e.target !== checkbox && e.target !== deleteBtn) {
                this.toggleDescription(todo.id);
            }
        });
        
        return todoItem;
    }
    
    // 建立描述元素
    createDescriptionElement(todo) {
        const description = document.createElement("div");
        description.className = `todo-description ${todo.expanded ? "show" : ""}`;
        description.textContent = todo.description;
        return description;
    }
    
    // 渲染所有待辦事項
    renderTodos() {
        this.todoList.innerHTML = "";  // 清空
        
        // 遍歷所有 todos（類似 for loop）
        this.todos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            this.todoList.appendChild(todoElement);
            
            const descriptionElement = this.createDescriptionElement(todo);
            this.todoList.appendChild(descriptionElement);
        });
    }
}

// 程式入口點：DOM 載入完成後建立 TodoApp
document.addEventListener("DOMContentLoaded", () => {
    new TodoApp();
});
