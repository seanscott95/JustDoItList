const formEl = document.getElementById('itemForm');
const itemInputEl = document.getElementById('itemInput');
const itemListEl = document.getElementById('itemList');
const btnClearEl = document.getElementById('clear');
const filterInputEl = document.getElementById('filter');

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

// Filters items in the list by the filter items input
const filterItem = (e) => {
    const listItems = itemListEl.querySelectorAll('li');
    const userInput = e.target.value.toLowerCase().trim();

    listItems.forEach((item) => {
        const itemText = item.innerText.toLowerCase();
        // If the user input is in the list items name then that listItem will
        // display in the list, if it doesn't the item will not be displayed
        if (itemText.indexOf(userInput) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        };
    });
};

const init = () => {
    formEl.addEventListener('submit', addItem);
    btnClearEl.addEventListener('click', clearAllItems);
    itemListEl.addEventListener('click', deleteItem);
    filterInputEl.addEventListener('input', filterItem);
};

init();