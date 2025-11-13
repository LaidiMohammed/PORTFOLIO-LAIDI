// Theme Management
function setTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
        const icon = toggleBtn.querySelector("i");
        /* Updated button text based on theme */
        if (themeName === "dark") {
            icon.className = "fas fa-sun";
            toggleBtn.querySelector("span").textContent = "Light";
        } else {
            icon.className = "fas fa-moon";
            toggleBtn.querySelector("span").textContent = "Dark";
        }
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    const toggleBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;
    
    // Add spinning animation to button
    toggleBtn.classList.add("switching");
    body.classList.add("theme-switching");
    
    // Remove animations after they complete
    setTimeout(() => {
        toggleBtn.classList.remove("switching");
        body.classList.remove("theme-switching");
    }, 600);
    
    setTheme(currentTheme === "light" ? "dark" : "light");
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDarkMode ? "dark" : "light");
    }
}

// Progress Bar
function updateProgressBar() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}

function setupModals() {
    const modals = document.querySelectorAll(".modal");
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        const button = card.querySelector(".project-btn");
        const projectType = card.getAttribute("data-project");
        const modal = document.getElementById(projectType + "-modal");

        if (button && modal) {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                modal.classList.add("show");
            });
        }
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector(".close-modal");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("show");
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    });
}

function initCalculator() {
    let displayValue = "0";
    let lastKeyWasOperator = false;
    let calculationJustPerformed = false;
    const display = document.getElementById("display");

    if (!display) return;

    const buttons = document.querySelectorAll("#calculator .calc-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            handleInput(value);
        });
    });

    document.addEventListener("keydown", handleKeyboard);

    function handleInput(value) {
        if (value === "clear") {
            clearDisplay();
        } else if (value === "=") {
            calculate();
        } else if (["+", "-", "*", "/"].includes(value)) {
            handleOperator(value);
        } else if (value === ".") {
            addDecimal();
        } else {
            addDigit(value);
        }
        updateDisplay();
    }

    function handleKeyboard(e) {
        if (e.key >= "0" && e.key <= "9") handleInput(e.key);
        else if (e.key === ".") handleInput(".");
        else if (["+", "-", "*", "/"].includes(e.key)) handleInput(e.key);
        else if (e.key === "Enter" || e.key === "=") handleInput("=");
        else if (e.key === "Escape" || e.key === "c" || e.key === "C") handleInput("clear");
    }

    function addDigit(digit) {
        if (displayValue === "0" || calculationJustPerformed || lastKeyWasOperator) {
            displayValue = digit;
            calculationJustPerformed = false;
            lastKeyWasOperator = false;
        } else {
            displayValue += digit;
        }
    }

    function addDecimal() {
        if (calculationJustPerformed || lastKeyWasOperator) {
            displayValue = "0.";
            calculationJustPerformed = false;
            lastKeyWasOperator = false;
        } else if (!displayValue.includes(".")) {
            displayValue += ".";
        }
    }

    function handleOperator(operator) {
        if (calculationJustPerformed) calculationJustPerformed = false;
        if (lastKeyWasOperator) {
            displayValue = displayValue.slice(0, -1) + operator;
        } else {
            displayValue += operator;
        }
        lastKeyWasOperator = true;
    }

    function calculate() {
        try {
            if (lastKeyWasOperator) displayValue = displayValue.slice(0, -1);
            const result = new Function("return " + displayValue)();
            displayValue = Number.isInteger(result) ? result.toString() : result.toFixed(2);
            calculationJustPerformed = true;
            lastKeyWasOperator = false;
        } catch (error) {
            displayValue = "Error";
            setTimeout(clearDisplay, 1500);
        }
    }

    function clearDisplay() {
        displayValue = "0";
        lastKeyWasOperator = false;
        calculationJustPerformed = false;
    }

    function updateDisplay() {
        display.textContent = displayValue;
    }
}

function initSnakeGame() {
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const gridSize = 20;
    const cellSize = canvas.width / gridSize;
    
    let snake = [{x: 10, y: 10}];
    let food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
    let direction = {x: 1, y: 0};
    let nextDirection = {x: 1, y: 0};
    let score = 0;
    let gameRunning = false;
    let gameInterval;

    const startButton = document.getElementById("start-button");
    const scoreDisplay = document.getElementById("score");

    /* Improved snake rendering with smooth animations */
    function drawGame() {
        ctx.fillStyle = "#0f0f23";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#64b5f6";
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? "#00d4ff" : "#64b5f6";
            ctx.shadowColor = "rgba(0, 212, 255, 0.6)";
            ctx.shadowBlur = 8;
            ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
            if (index === 0) {
                ctx.strokeStyle = "#00d4ff";
                ctx.lineWidth = 2;
                ctx.shadowColor = "rgba(0, 212, 255, 0.8)";
                ctx.shadowBlur = 12;
                ctx.strokeRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
            }
        });

        ctx.fillStyle = "#ff6b6b";
        ctx.shadowColor = "rgba(255, 107, 107, 0.8)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "transparent";
    }

    function update() {
        direction = nextDirection;
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            endGame();
            return;
        }

        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                endGame();
                return;
            }
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = score;
            food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
        } else {
            snake.pop();
        }

        drawGame();
    }

    function startGame() {
        if (!gameRunning) {
            gameRunning = true;
            startButton.textContent = "Pause";
            gameInterval = setInterval(update, 100);
        } else {
            gameRunning = false;
            startButton.textContent = "Resume";
            clearInterval(gameInterval);
        }
    }

    function endGame() {
        gameRunning = false;
        clearInterval(gameInterval);
        startButton.textContent = "Play Again";
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00d4ff";
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 212, 255, 0.8)";
        ctx.shadowBlur = 16;
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = "bold 24px Arial";
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
        ctx.shadowColor = "transparent";
        snake = [{x: 10, y: 10}];
        direction = {x: 1, y: 0};
        nextDirection = {x: 1, y: 0};
        score = 0;
        scoreDisplay.textContent = "0";
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction.y === 0) nextDirection = {x: 0, y: -1};
        else if (e.key === "ArrowDown" && direction.y === 0) nextDirection = {x: 0, y: 1};
        else if (e.key === "ArrowLeft" && direction.x === 0) nextDirection = {x: -1, y: 0};
        else if (e.key === "ArrowRight" && direction.x === 0) nextDirection = {x: 1, y: 0};
    });

    startButton.addEventListener("click", startGame);
    drawGame();
}

function initTodoList() {
    const input = document.getElementById("todoInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");

    if (!input || !addBtn || !todoList) return;

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;

        const li = document.createElement("li");
        li.className = "todo-item";
        li.innerHTML = `
            <span class="todo-text">${text}</span>
            <div class="todo-buttons">
                <button class="complete-btn">Done</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const completeBtn = li.querySelector(".complete-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        completeBtn.addEventListener("click", () => {
            li.classList.toggle("completed");
        });

        deleteBtn.addEventListener("click", () => {
            li.style.animation = "slideInLeft 0.3s ease-out reverse";
            setTimeout(() => li.remove(), 300);
        });

        todoList.appendChild(li);
        input.value = "";
        input.focus();
    }

    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo();
    });
}

// Initialize Everything on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupModals();
    initCalculator();
    initSnakeGame();
    initTodoList();

    const themeToggle = document.getElementById("theme-toggle-btn");
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("resize", updateProgressBar);
});
