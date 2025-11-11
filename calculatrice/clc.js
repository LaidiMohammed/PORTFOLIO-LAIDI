// Simple Calculator JavaScript
function Calculator() {
  // Store the current display value
  let displayValue = "0"
  // Store if the last key was an operation
  let lastKeyWasOperator = false
  // Store if calculation was just performed
  let calculationJustPerformed = false

  // DOM Elements
  const display = document.getElementById("display")

  // Initialize the calculator
  function init() {
    // Set up event listeners for all buttons
    document.querySelectorAll(".calc-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.getAttribute("data-value")
        handleInput(value)
      })
    })

    // Set up keyboard support
    document.addEventListener("keydown", handleKeyboard)

    // Initialize display
    updateDisplay()
  }

  // Handle button input
  function handleInput(value) {
    // Handle different types of input
    if (value === "clear") {
      clearDisplay()
    } else if (value === "=") {
      calculate()
    } else if (["+", "-", "*", "/"].includes(value)) {
      handleOperator(value)
    } else if (value === ".") {
      addDecimal()
    } else {
      // Must be a number
      addDigit(value)
    }

    updateDisplay()
  }

  // Handle keyboard input
  function handleKeyboard(e) {
    if (e.key >= "0" && e.key <= "9") {
      handleInput(e.key)
    } else if (e.key === ".") {
      handleInput(".")
    } else if (e.key === "+"||  e.key === "-" || e.key === "*" || e.key === "/") {
      handleInput(e.key)
    } else if (e.key === "Enter" || e.key === "=") {
      handleInput("=")
    } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
      handleInput("clear")
    }
  }

  // Add a digit to the display
  function addDigit(digit) {
    if (displayValue === "0" || calculationJustPerformed || lastKeyWasOperator) {
      displayValue = digit
      calculationJustPerformed = false
      lastKeyWasOperator = false
    } else {
      displayValue += digit
    }
  }

  // Add a decimal point
  function addDecimal() {
    if (calculationJustPerformed || lastKeyWasOperator) {
      displayValue = "0."
      calculationJustPerformed = false
      lastKeyWasOperator = false
    } else if (!displayValue.includes(".")) {
      displayValue += "."
    }
  }

  // Handle operator input
  function handleOperator(operator) {
    // If we just performed a calculation, we can continue with the result
    if (calculationJustPerformed) {
      calculationJustPerformed = false
    }

    // If the last key was an operator, replace it
    if (lastKeyWasOperator) {
      displayValue = displayValue.slice(0, -1) + operator
    } else {
      displayValue += operator
    }

    lastKeyWasOperator = true
  }

  // Perform the calculation
  function calculate() {
    try {
      // Avoid ending with an operator
      if (lastKeyWasOperator) {
        displayValue = displayValue.slice(0, -1)
      }

      // Use Function constructor to safely evaluate the expression
      const result = new Function("return " + displayValue)()

      // Format the result
      displayValue = Number.isInteger(result) ? result.toString() : result.toFixed(2).toString()

      calculationJustPerformed = true
      lastKeyWasOperator = false
    } catch (error) {
      displayValue = "Error"
      setTimeout(clearDisplay, 1000)
    }
  }

  // Clear the display
  function clearDisplay() {
    displayValue = "0"
    lastKeyWasOperator = false
    calculationJustPerformed = false
  }

  // Update the display element
  function updateDisplay() {
    display.textContent = displayValue
  }

  // Return public methods
  return {
    init,
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const calculator = Calculator()
  calculator.init()
})