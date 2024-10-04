let characterHealth = 100;
let enemyHealth = 100;

const healthCharacterDisplay = document.getElementById("health-character");
const healthEnemyDisplay = document.getElementById("health-enemy");
const progressBarCharacter = document.getElementById("progressbar-character");
const progressBarEnemy = document.getElementById("progressbar-enemy");
const attackButton = document.getElementById("btn-kick");
const attackButton2 = document.getElementById("btn-attack-2");
const harmButton = document.getElementById("btn-harm");

// Масив суперників з їх характеристиками
const enemies = [
    {name: 'Charmander', maxHealth: 100, sprite: '/assets/Charmander.png'},
    {name: 'Bulbasaur', maxHealth: 120, sprite: '/assets/Bulbasaur.png'},
    {name: 'Squirtle', maxHealth: 140, sprite: '/assets/Squirtle.png'}
];

let currentEnemyIndex = 0; // Індекс поточного суперника

function updateCharacterHealth() {
    healthCharacterDisplay.textContent = `${characterHealth} / 100`;
    progressBarCharacter.style.width = `${(characterHealth / 100) * 100}%`;
}

function updateEnemyHealth() {
    healthEnemyDisplay.textContent = `${enemyHealth} / ${enemies[currentEnemyIndex].maxHealth}`;
    progressBarEnemy.style.width = `${(enemyHealth / enemies[currentEnemyIndex].maxHealth) * 100}%`;
}

// Оновлюємо зображення та інформацію про суперника
function updateEnemyDisplay() {
    const enemySprite = document.querySelector('.enemy .sprite');
    const enemyName = document.getElementById("name-enemy");

    // Оновлюємо зображення та ім'я
    enemySprite.src = enemies[currentEnemyIndex].sprite;
    enemyName.textContent = enemies[currentEnemyIndex].name;

    // Оновлюємо здоров'я
    enemyHealth = enemies[currentEnemyIndex].maxHealth;
    updateEnemyHealth();
}

attackButton.addEventListener("click", () => {
    performAttack(true); // Thunder Jolt - Character attacks
});

attackButton2.addEventListener("click", () => {
    performAttack2(true); // Quick Attack - Character attacks
});

harmButton.addEventListener("click", () => {
    harmEnemy(); // Fire Blast - Enemy takes damage only
});

function performAttack(isCharacterAttacking) {
    const damage = Math.floor(Math.random() * 30) + 1;
    if (isCharacterAttacking) {
        enemyHealth -= damage;
        if (enemyHealth < 0) enemyHealth = 0;
        updateEnemyHealth();
        if (enemyHealth === 0) {
            alert(`Ви перемогли ${enemies[currentEnemyIndex].name}!`);
            loadNextEnemy(); // Завантажуємо нового суперника після перемоги
        } else {
            attackCharacter();
        }
    } else {
        characterHealth -= damage;
        if (characterHealth < 0) characterHealth = 0;
        updateCharacterHealth();
        if (characterHealth === 0) {
            alert("Вам не пощастило! Ви програли!");
            resetGame(); // Перезапускаємо гру після програшу
        }
    }
}
function performAttack2(isCharacterAttacking) {
    const damage = Math.floor(Math.random() * 10) + 1;
    if (isCharacterAttacking) {
        enemyHealth -= damage;
        if (enemyHealth < 0) enemyHealth = 0;
        updateEnemyHealth();
        if (enemyHealth === 0) {
            alert(`Ви перемогли ${enemies[currentEnemyIndex].name}!`);
            loadNextEnemy(); // Завантажуємо нового суперника після перемоги
        } else {
            attackCharacter();
        }
    } else {
        characterHealth -= damage;
        if (characterHealth < 0) characterHealth = 0;
        updateCharacterHealth();
        if (characterHealth === 0) {
            alert("Вам не пощастило! Ви програли!");
            resetGame(); // Перезапускаємо гру після програшу
        }
    }
}
function harmEnemy() {
    const damage = Math.floor(Math.random() * 20) + 1;
    enemyHealth -= damage;
    if (enemyHealth < 0) enemyHealth = 0;
    updateEnemyHealth();

    if (enemyHealth === 0) {
        alert(`Вы перемогли ${enemies[currentEnemyIndex].name}!`);
        loadNextEnemy(); // Завантажуємо нового суперника після перемоги
    }
}

function attackCharacter() {
    const damageToCharacter = Math.floor(Math.random() * 10) + 1;
    characterHealth -= damageToCharacter;

    if (characterHealth < 0) characterHealth = 0;

    updateCharacterHealth();

    if (characterHealth === 0) {
        alert("Вам не пощастило! Ви програли!");
        resetGame(); // Перезапускаємо гру після програшу
    }
}

// Завантаження наступного суперника
function loadNextEnemy() {
    currentEnemyIndex++;

    // Якщо всі суперники переможені
    if (currentEnemyIndex >= enemies.length) {
        alert("Ви перемогли всіх суперників! Гра завершена!");
        resetGame(); // Перезапускаємо гру після перемоги над усіма суперниками
        return;
    }

    // Оновлюємо зображення та інформацію про нового суперника
    updateEnemyDisplay();
}

function resetHealth() {
    characterHealth = 100;
    enemyHealth = enemies[currentEnemyIndex].maxHealth;
    updateCharacterHealth();
    updateEnemyHealth();
}
function resetGame() {
    currentEnemyIndex = 0;
    characterHealth = 100;
    enemyHealth = enemies[currentEnemyIndex].maxHealth;
    updateCharacterHealth();
    updateEnemyDisplay();
}

// Початкове оновлення стану гри
updateCharacterHealth();
updateEnemyDisplay();