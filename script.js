document.addEventListener('DOMContentLoaded', () => {
    const generateColorBtn = document.getElementById('generateColorBtn');
    const saveColorBtn = document.getElementById('saveColorBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const colorDisplay = document.getElementById('colorDisplay');
    const colorHex = document.getElementById('colorHex');
    const favoriteColors = document.getElementById('favoriteColors');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const MAX_FAVORITE_COLORS = 10;
    let currentUser = null;

    function getRandomColor() {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }

    function displayColor(color) {
        colorDisplay.style.backgroundColor = color;
        colorHex.textContent = color;
    }

    function loadFavoriteColors() {
        const colors = JSON.parse(localStorage.getItem(`favoriteColors_${currentUser}`)) || [];
        colors.forEach(color => addColorToFavorites(color));
    }

    function saveColor(color) {
        let colors = JSON.parse(localStorage.getItem(`favoriteColors_${currentUser}`)) || [];
        if (colors.includes(color) || colors.length >= MAX_FAVORITE_COLORS) return;
        colors.push(color);
        localStorage.setItem(`favoriteColors_${currentUser}`, JSON.stringify(colors));
        addColorToFavorites(color);
    }

    function addColorToFavorites(color) {
        const colorBox = document.createElement('div');
        colorBox.classList.add('colorBox');
        colorBox.style.backgroundColor = color;
        colorBox.innerHTML = `<span>${color}</span><button>X</button>`;
        favoriteColors.appendChild(colorBox);

        colorBox.querySelector('button').addEventListener('click', () => {
            removeColorFromFavorites(color, colorBox);
        });
    }

    function removeColorFromFavorites(color, element) {
        let colors = JSON.parse(localStorage.getItem(`favoriteColors_${currentUser}`)) || [];
        colors = colors.filter(c => c !== color);
        localStorage.setItem(`favoriteColors_${currentUser}`, JSON.stringify(colors));
        favoriteColors.removeChild(element);
    }

    function loadColors() {
        if (currentUser) {
            loadFavoriteColors();
        }
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        favoriteColors.innerHTML = ''; // Vyčistíme zobrazení oblíbených barev
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username && password) {
            currentUser = username;
            localStorage.setItem('currentUser', currentUser); // Uložíme aktuálního uživatele do LocalStorage
            loadColors();
            loginForm.reset();
            console.log(`Přihlášen uživatel: ${currentUser}`);
        }
    });

    generateColorBtn.addEventListener('click', () => {
        const randomColor = getRandomColor();
        displayColor(randomColor);
    });

    saveColorBtn.addEventListener('click', () => {
        const color = colorHex.textContent;
        if (color) saveColor(color);
    });

    logoutBtn.addEventListener('click', () => {
        logout();
        console.log('Uživatel odhlášen');
    });

    // Pokud je uživatel již přihlášen, načteme jeho oblíbené barvy
    currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        loadColors();
        console.log(`Přihlášen uživatel: ${currentUser}`);
    }
});


 



