const formEl = document.getElementById('itemForm');
const itemInputEl = document.getElementById('itemInput');
const itemListEl = document.getElementById('itemList');
const btnClearEl = document.getElementById('clear');
const filterInputEl = document.getElementById('filter');
let isEditMode = false;

// Adds the item inputted to the list
const addItem = (e) => {
    e.preventDefault();

    if (isEditMode) {
        const itemToEdit = itemListEl.querySelector('.editMode');
        itemToEdit.innerText = itemInputEl.value;

        // Creating new delete button for the updated item
        const itemBtn = document.createElement('button');
        itemBtn.className = 'removeItem btnLink textRed';

        const itemIcon = document.createElement('i');
        itemIcon.className = 'fa-solid fa-xmark';
        itemBtn.append(itemIcon);

        itemToEdit.append(itemBtn);

        itemToEdit.classList.remove('editMode');

        // Creating the Add Item Button that will display again after editing
        const addButton = document.createElement('button');
        addButton.className = 'btn';

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-plus';

        addButton.append('Add Item ', icon);

        // Replaces the Add Item button with an Update Item Button
        const formBtn = formEl.querySelector('button');
        formBtn.replaceWith(addButton);
        
        isEditMode = false;
        itemInputEl.value = '';

        return;
    };

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

const onItemClick = (e) => {
    if (e.target.closest('li')) {
        editItem(e.target);
    };
    if (e.target.parentElement.classList.contains('removeItem')) {
        deleteItem(e);
    };
};

const editItem = (item) => {
    isEditMode = true;

    // Removes the class editMode for all list items, if an element was already being edited
    // and a new element was clicked the class will still be on the previous item as well, 
    // this will remove the class of the previously edited item
    itemListEl
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('editMode'));

    item.classList.add('editMode');

    const updateButton = document.createElement('button');
    updateButton.className = 'btn';
    updateButton.style.backgroundColor = '#228B22';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-pen';

    updateButton.append(icon, ' Update Item');

    // Replaces the Add Item button with an Update Item Button
    const formBtn = formEl.querySelector('button');
    formBtn.replaceWith(updateButton);

    itemInputEl.value = item.innerText;
}

// Clears all items from the list
const clearAllItems = () => {
    while (itemListEl.firstChild) itemListEl.removeChild(itemListEl.firstChild);
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
    itemListEl.addEventListener('click', onItemClick);
    filterInputEl.addEventListener('input', filterItem);
};

init();