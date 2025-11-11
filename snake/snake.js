// Draw snake
snake.forEach((segment, index) => {
    // Head is a different color
    ctx.fillStyle = index === 0 ? "#4da3ff" : "#1e88e5"
    drawCell(segment.x, segment.y)
  })

  // Draw food
  ctx.fillStyle = "#ff5252"
  drawCell(food.x, food.y)

  // Draw grid (optional)
  drawGrid()


// Draw a single cell
function drawCell(x, y) {
  const cellSize = canvas.width / gridSize
  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

  // Add a small border to make cells more visible
  ctx.strokeStyle = "#333"
  ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
}

// Draw grid lines
function drawGrid() {
  ctx.strokeStyle = "#333"
  ctx.lineWidth = 0.5

  const cellSize = canvas.width / gridSize

  // Draw vertical lines
  for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath()
    ctx.moveTo(i * cellSize, 0)
    ctx.lineTo(i * cellSize, canvas.height)
    ctx.stroke()
  }

  // Draw horizontal lines
  for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * cellSize)
    ctx.lineTo(canvas.width, i * cellSize)
    ctx.stroke()
  }
}

// Draw welcome screen
function drawWelcomeScreen() {
  // Clear canvas
  ctx.fillStyle = "#222"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw title
  ctx.fillStyle = "#fff"
  ctx.font = "24px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Snake Game", canvas.width / 2, canvas.height / 2 - 50)

  // Draw instructions
  ctx.font = "16px Arial"
  ctx.fillText("Use arrow keys to move", canvas.width / 2, canvas.height / 2)
  ctx.fillText("Press Start to play", canvas.width / 2, canvas.height / 2 + 30)

  // Show start button
  document.getElementById("start-button").style.display = "block"
}

// Game over
function gameOver() {
  clearInterval(gameInterval)
  gameRunning = false

  // Draw game over screen
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#fff"
  ctx.font = "24px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50)
  ctx.fillText('Score: ${score}', canvas.width / 2, canvas.height / 2)

  // Show start button
  document.getElementById("start-button").style.display = "block"
  document.getElementById("start-button").textContent = "Play Again"
}

// Update score display
function updateScore() {
  document.getElementById("score").textContent = 'Score: ${score}'
}

// Return public methods
return {
  init,
}


// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
const game = SnakeGame()
game.init()
})