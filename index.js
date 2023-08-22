const formEl = document.getElementById('itemForm');
const itemInputEl = document.getElementById('itemInput');
const itemListEl = document.getElementById('itemList');
const btnClearEl = document.getElementById('clear');

// Adds the item inputted to the list
const addItem = (e) => {
    e.preventDefault();

    const newItem = itemInputEl.value.trim();
    if (newItem === '') return;
  
    const li = document.createElement('li');

    const btn = document.createElement('button');
    btn.className = 'removeItem btnLink textRed';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';

    btn.append(icon);
    li.append(newItem, btn);
    itemListEl.append(li);

    itemInputEl.value = '';
};

// Clears all items from the list
const clearAllItems = () => {
    while(itemListEl.firstChild) itemListEl.removeChild(itemListEl.firstChild);
};

// Deletes the item when the red x button is clicked
const deleteItem = (e) => {
    if (e.target.parentElement.classList.contains('removeItem')) {
        e.target.parentElement.parentElement.remove();
    };
};

const init = () => {
    formEl.addEventListener('submit', addItem);
    btnClearEl.addEventListener('click', clearAllItems);
    itemListEl.addEventListener('click', deleteItem);
};

init();