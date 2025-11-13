// Function to set the theme
function setTheme(themeName) {
    // Set the data-theme attribute on the document element
    document.documentElement.setAttribute("data-theme", themeName)
  
    // Save the theme preference to localStorage
    localStorage.setItem("theme", themeName)
  
    // Update the toggle button icon and text
    const toggleBtn = document.getElementById("theme-toggle-btn")
    if (toggleBtn) {
      const icon = toggleBtn.querySelector("i")
      const text = toggleBtn.querySelector("span")
  
      if (themeName === "dark") {
        icon.className = "fas fa-sun"
        text.textContent = "Light Mode"
      } else {
        icon.className = "fas fa-moon"
        text.textContent = "Dark Mode"
      }
    }
  }
  
  // Function to toggle between light and dark themes
  function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light"
    if (currentTheme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
  
  // Initialize theme based on user's preference or system preference
  function initTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme")
  
    if (savedTheme) {
      // Use saved preference
      setTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDarkMode ? "dark" : "light")
    }
  }
  
  // Add event listener to the theme toggle button
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle-btn")
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme)
    }
  
    // Initialize theme
    initTheme()
  })
  
  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    // Only change theme if user hasn't set a preference
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light")
    }
  })
  // JavaScript for the projects section in the portfolio
document.addEventListener("DOMContentLoaded", () => {
  // Get all project cards
  const projectCards = document.querySelectorAll(".project-card")

  // Add click event listeners to each project card
  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Prevent default behavior if clicking on links
      if (e.target.tagName === "A") return

      // Get the project title
      const projectTitle = this.querySelector("h3").textContent

      // Open the corresponding project based on its title
      switch (projectTitle) {
        case "Simple Calculator":
          window.open("calculator.html", "_blank")
          break
        case "Snake Game":
          window.open("snake-game.html", "_blank")
          break
        case "To-Do List Application":
          window.open("todo-app.html", "_blank")
          break
        case "Basic Blog":
          // You can add a link to the blog project when it's ready
          alert("Blog project coming soon!")
          break
      }
    })

    // Add hover effect to indicate clickability
    card.style.cursor = "pointer"
  })
})