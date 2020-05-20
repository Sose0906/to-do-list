"use strict";
const addInput = document.getElementById('add-input');
const addBtn = document.getElementById('add-btn');
const tasksDiv = document.getElementsByClassName('tasks')[0];
const searchDiv = document.getElementById('search-div');
const searchInput = document.getElementById('search-input');

window.onload = function () {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let checked = localStorage.getItem(key)=="true"? true : false;
        let element = makeElement(key,checked);
        let newDiv = document.createElement("div");
        newDiv.classList.add('element');
        newDiv.innerHTML = element;
        newDiv.setAttribute('data-key', key);
        tasksDiv.appendChild(newDiv);
    }
    if (localStorage.length > 0) {
        searchDiv.classList.remove('d-none');
    }


};


addBtn.onclick = function () {

    addTask();
};
addInput.onkeydown = function (e) {
    if (e.keyCode == 13) {
        addTask();
    }
};


function addTask() {

    let value = addInput.value.trim();
    let alertMessage = 'Input value is empty';
    if (value === '' || localStorage.hasOwnProperty(value.toLowerCase())) {
        if (localStorage.hasOwnProperty(value.toLowerCase())) {
            alertMessage = 'Task already exists';
        }
        alert(alertMessage);
    } else {
        addInput.value = '';
        let lowerValue = value.toLowerCase();
        let element = makeElement(lowerValue);

        let newDiv = document.createElement("div");
        newDiv.classList.add('element');
        newDiv.innerHTML = element;
        newDiv.setAttribute("data-key", lowerValue);

        tasksDiv.appendChild(newDiv);
        addInput.value = '';
        localStorage.setItem(lowerValue, "false");
        searchDiv.classList.remove('d-none');

    }
}

function makeElement(key, checked = false) {
    let str1 = `<div class="checkbox"><label class="check-input" for="${key}" style="font-size:1.5em"><input data-key="${key}" class="check-input" id="${key}" type="checkbox" value=""><span class="cr"><i class="cr-icon fa fa-check"></i></span></label></div><div class="task-text">${key}</div>`;
    if (checked) {
        str1 = `<div class="checkbox"><label class="check-input" for="${key}" style="font-size:1.5em"><input checked data-key="${key}" class="check-input" id="${key}" type="checkbox" value=""><span class="cr"><i class="cr-icon fa fa-check"></i></span></label></div><div class="task-text check-done">${key}</div>`;
    }
    return str1 +
        `<div style="border: none" class="delete"><button data-key="${key}" class="delete-btn"><img class="delete-img" style="width: 30px; height: 30px" src="./icons/remove.png" alt=""></button></div>`;

}

document.addEventListener('click', function (e) {

    if (e.target && e.target.className == 'check-input') {
        let parentDiv = e.target.closest('.element');
        parentDiv.childNodes[1].classList.toggle('check-done');
        let value = e.target.dataset.key;
        localStorage[value.toLowerCase()] = e.target.checked;
    } else if (e.target && e.target.className == 'delete-img' && e.target.closest('button').classList.contains("delete-btn")) {
        e.target.closest('.element').remove();
        let value = e.target.closest('button').dataset.key;
        localStorage.removeItem(value.toLowerCase());
        if (localStorage.length === 0) {
            searchDiv.classList.add('d-none');
        }

    }
});
searchInput.onkeyup = function (e) {
    let elements = document.querySelectorAll('.element');
    let value = this.value;
    elements.forEach(
        function (item) {
            if (value != '') {
                if (!item.dataset.key.startsWith(value)) {
                    item.style.display = 'none';
                }
                else
                {
                    item.style.display = 'inline-block';
                }
            } else {
                item.style.display = 'inline-block';

            }
        }
    );


};









