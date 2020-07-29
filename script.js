class ToDoList {

    constructor(initialTaskList) {
        this.taskInput = document.querySelector("input.section-main-input-box__input-task");
        this.taskAddButton = document.querySelector("button.add-task");
        this.choiceButtonsContainer = document.querySelector("div.section-main-content__choice-buttons");
        this.taskList = initialTaskList;
        this.taskListContainer = document.querySelector("ul.section-main-content__task-list");
        this.taskRenderType = "All";
    }

    renderTaskList() {
        this.taskListContainer.innerHTML = "";
        let taskList = this.getTaskByType();
        let count = 0;
        taskList.forEach((val) => {
            let classNameTaskState = 'current';

            if (val.isCompleted)
                classNameTaskState = 'completed';

            this.taskListContainer.innerHTML += `
            <li class="task ${classNameTaskState}" >
            <span class="task__text" id="${val.taskId}">${++count}. ${val.text}</span>
            <button class="task__del">-</button>
        </li>
            `
        })
    }

    getTaskByType() {
        switch (this.taskRenderType) {
            case "All":
                return this.taskList;
            case "Current":
                return this.taskList.filter(item => item.isCompleted === false);
            case "Completed":
                return this.taskList.filter(item => item.isCompleted === true);
        }
    }

    createTask() {
        this.taskList.push({
            taskId: Date.now().toString(),
            isCompleted: false,
            text: this.checkInputTask()
        })
    }

    createTaskCreatListener() {
        this.taskAddButton.addEventListener("click", () => {
            this.createTask();
            this.renderTaskList();
            this.taskInput.value = '';
        })

        this.taskInput.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                this.createTask();
                this.renderTaskList();
                this.taskInput.value = '';
            }
        })
    }

    checkInputTask() {
        return this.taskInput.value === '' ? 'Empty task!!!' : this.taskInput.value;
    }

    createChangeTaskStateListener() {
        this.taskListContainer.addEventListener("click", (e) => {
            if (this.taskList.find(item => item.taskId === e.target.id)) {
                let taskListElement = e.target.parentElement;
                let currentElementIndex = this.taskList.findIndex(item => item.taskId === e.target.id);

                if (taskListElement.classList.contains("current")) this.taskList[currentElementIndex].isCompleted = true;
                else this.taskList[currentElementIndex].isCompleted = false;
                this.renderTaskList();
            }
        })
    }

    createDeleteTaskListener() {
        this.taskListContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("task__text")) return;

            if (this.taskList.find(item => item.taskId === e.target.previousElementSibling.id)) {
                let currentElementIndex = this.taskList.findIndex(item => item.taskId === e.target.previousElementSibling.id);
                this.taskList.splice(currentElementIndex, 1);
                this.renderTaskList();
            }
        })
    }

    createChoiceButtonsListener() {
        this.choiceButtonsContainer.addEventListener("click", (e) => {
            let choiceButtonsClass = e.target.classList[0];
            let newActiveButton = e.target;
            
            switch (choiceButtonsClass) {
                case "task-all":
                    this.taskRenderType = "All";
                    this.renderTaskList();
                    break;
                case "task-current":
                    this.taskRenderType = "Current";
                    this.renderTaskList();
                    break;
                case "task-completed":
                    this.taskRenderType = "Completed";
                    this.renderTaskList();
                    break;

            }
            this.changeButtonState(newActiveButton);
        })
    }

    changeButtonState(newActiveButton) {
        let oldActiveButton = document.querySelector("button.active-task-type");
        oldActiveButton.classList.toggle("active-task-type");
        newActiveButton.classList.toggle("active-task-type");
        newActiveButton.disabled = true;
        oldActiveButton.disabled = false;
    }

}

let toDoList = new ToDoList([
    {
        taskId: '111111',
        isCompleted: true,
        text: "Wash the dishes"
    },
    {
        taskId: '111112',
        isCompleted: false,
        text: "Read a book"
    },
    {
        taskId: '111113',
        isCompleted: false,
        text: "Go to the Moon"
    },
    {
        taskId: '111114',
        isCompleted: true,
        text: "Call Mom"
    },
    {
        taskId: '111115',
        isCompleted: false,
        text: "Find the truth"
    }
]);

toDoList.renderTaskList();
toDoList.createTaskCreatListener();
toDoList.createChangeTaskStateListener();
toDoList.createDeleteTaskListener();
toDoList.createChoiceButtonsListener();
