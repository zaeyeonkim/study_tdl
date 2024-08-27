// user 값 입력
// + 버튼 할일 추가
// del 버튼 할일 삭제
// check 버튼 할일 끝 삭선
// 탭 누르면 언더바 이동
// 탭마다 구별하기

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underline = document.getElementById("underline");
let taskList = [];
let mode = 'all';
let filterList = [];

function underlinePosition(target) {
    underline.style.width = `${target.offsetWidth}px`;
    underline.style.left = `${target.offsetLeft}px`;
}

for (let i=1;i<tabs.length;i++) {
    tabs[i].addEventListener("click",function(event){
        filter(event)
        underlinePosition(event.target);
    });
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    if (taskInput.value.trim() === '') {
        return;
    }
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    };
    taskList.push(task);
    taskInput.value = '';
    filterList = [];
    render();
}

function render() {
    let list = [];
    if (mode === "all") {
        list = taskList;
    } else if (mode === "ongoing") {
        list = filterList;
    } else if (mode === "done") {
        list = filterList.filter(task => task.isComplete);
    }
    let resultHTML = '';
    for (let i = 0; i<list.length;i++) {
        if(list[i].isComplete == true) {
            resultHTML +=
                `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
        } else {
            resultHTML += 
                `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete (id) {
    for (let i=0; i<taskList.length;i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filterList = [];
    render();
}

function deleteTask (id) {
    for (let i=0; i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
            break;
        }
    }
    filterList = [];
    render();
}

function filter (event) {
    mode = event.target.id;
    if(mode === "all") {
        filterList = [];
        render() ;
    } else if (mode === "ongoing") {
        for (let i=0;i<taskList.length;i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === "done") {
        for (let i=0;i<taskList.length;i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function randomIDGenerate () {
    return Math.random().toString(36).substr(2, 16);
}
