const dropdown = document.querySelector('.container');
const filters = document.querySelectorAll('.child');

let isActive = false;

let currentSelection = null;

window.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.key === 'Tab' && isActive) {
        currentSelection++;
        if(currentSelection > filters.length - 1) {
            currentSelection = 0;
        }
        const params = filters[currentSelection].getBoundingClientRect();
        dropdown.style.left = params.x + params.width - 10 + 'px';
        console.log(filters[currentSelection].textContent)
    }
});

function setDropdownPosition() {
    if (!isActive) {
        isActive = true;
        dropdown.style.display = 'flex';
    }
    const currentBtnPosition = this.getBoundingClientRect();
    dropdown.style.left = currentBtnPosition.x + currentBtnPosition.width - 10 + 'px';
    const convertedArray = Array.from(filters);
    currentSelection = convertedArray.findIndex((item) => item === this);
}

filters.forEach(item => item.addEventListener('click', setDropdownPosition));

