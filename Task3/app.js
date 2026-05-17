// ZenList - Core JavaScript Logic & State Management

// ==========================================
// 1. STATE CONFIGURATION & INITIALIZATION
// ==========================================

const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Welcome to ZenList! 🚀 Try double-clicking me to edit this task.",
    completed: false,
    category: "work",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
  },
  {
    id: "task-2",
    title: "Complete the CSS responsive layout design task",
    completed: true,
    category: "urgent",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
  },
  {
    id: "task-3",
    title: "Explore the glassmorphic light & dark theme toggles above ☀️🌙",
    completed: false,
    category: "personal",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
  }
];

let state = {
  tasks: [],
  filter: "all",
  selectedCategory: "work",
  searchQuery: "",
  theme: "dark"
};

// Safe LocalStorage Retrieval with Try-Catch Block
try {
  const savedTasks = localStorage.getItem("zenlist_tasks");
  if (savedTasks) {
    state.tasks = JSON.parse(savedTasks);
    // Ensure state.tasks is actually an array
    if (!Array.isArray(state.tasks)) {
      state.tasks = DEFAULT_TASKS;
    }
  } else {
    state.tasks = DEFAULT_TASKS;
  }
} catch (e) {
  console.warn("Corrupted tasks found in localStorage, resetting to default tasks:", e);
  state.tasks = DEFAULT_TASKS;
  try {
    localStorage.removeItem("zenlist_tasks"); // Clear corrupted state
  } catch (err) {}
}

try {
  const savedTheme = localStorage.getItem("zenlist_theme");
  state.theme = savedTheme || "dark";
} catch (e) {
  state.theme = "dark";
}

// ==========================================
// 2. DOM ELEMENT SELECTORS
// ==========================================

const greetingText = document.getElementById("greetingText");
const dateText = document.getElementById("dateText");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const progressBarFill = document.getElementById("progressBarFill");
const progressPercent = document.getElementById("progressPercent");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const categoryChips = document.getElementById("categoryChips");
const searchInput = document.getElementById("searchInput");
const filterTabs = document.querySelector(".filters-tabs");
const tasksContainer = document.getElementById("tasksContainer");
const itemsLeftCount = document.getElementById("itemsLeftCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// ==========================================
// 3. CORE UTILITIES & PERSISTENCE
// ==========================================

// Save current state changes to LocalStorage with safety checks
function saveState() {
  try {
    localStorage.setItem("zenlist_tasks", JSON.stringify(state.tasks));
    localStorage.setItem("zenlist_theme", state.theme);
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
  }
}

// Generate dynamic greeting based on active time of day
function updateGreeting() {
  const hour = new Date().getHours();
  let greet = "Hello, Productive Day!";
  
  if (hour >= 5 && hour < 12) {
    greet = "Good Morning, Akanksha! 🌅";
  } else if (hour >= 12 && hour < 17) {
    greet = "Good Afternoon! ☀️";
  } else if (hour >= 17 && hour < 22) {
    greet = "Good Evening! 🌙";
  } else {
    greet = "Burning Midnight Oil? 🚀";
  }
  
  greetingText.textContent = greet;
}

// Update clock date and day widget
function updateDateWidget() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  dateText.textContent = today.toLocaleDateString('en-US', options);
}

// Handle dual-theme switching transitions
function initTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", state.theme);
  saveState();
}

// ==========================================
// 4. STATS & PROGRESS CALCULATOR
// ==========================================

function updateStatsAndWidgets() {
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  
  // Update Items Left Counter
  itemsLeftCount.textContent = activeTasks;
  
  // Calculate completion percentage
  const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  
  // Smoothly update Progress Bar
  progressBarFill.style.width = `${percent}%`;
  progressBarFill.setAttribute("aria-valuenow", percent);
  progressPercent.textContent = `${percent}%`;
}

// ==========================================
// 5. RENDER FLOW (DOM INJECTION)
// ==========================================

function renderTasks() {
  tasksContainer.innerHTML = "";
  
  // Filter state calculation
  let filteredTasks = state.tasks.filter(task => {
    // 1. Search Query Filter
    const matchesSearch = task.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    
    // 2. Tab Filter (All, Active, Completed)
    let matchesTab = true;
    if (state.filter === "active") matchesTab = !task.completed;
    if (state.filter === "completed") matchesTab = task.completed;
    
    return matchesSearch && matchesTab;
  });

  // Sort: Uncompleted first, then by date (newest first)
  filteredTasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Render Empty State if no tasks match
  if (filteredTasks.length === 0) {
    renderEmptyState();
    updateStatsAndWidgets();
    return;
  }

  // Draw each Task Card
  filteredTasks.forEach(task => {
    const card = createTaskCardDOM(task);
    tasksContainer.appendChild(card);
  });

  updateStatsAndWidgets();
}

// Draw a beautiful custom empty state vector illustration
function renderEmptyState() {
  let messageTitle = "All clean!";
  let messageDesc = "No tasks found here. Go ahead and create one!";

  if (state.searchQuery !== "") {
    messageTitle = "No matches found";
    messageDesc = "Try searching for something else or clear your query.";
  } else if (state.filter === "completed") {
    messageTitle = "No completed tasks";
    messageDesc = "Finish tasks to see them listed here!";
  } else if (state.filter === "active") {
    messageTitle = "All caught up!";
    messageDesc = "No active tasks remaining. Add some to get started!";
  }

  tasksContainer.innerHTML = `
    <div class="empty-state">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" stroke-width="1.5"/>
      </svg>
      <h3>${messageTitle}</h3>
      <p>${messageDesc}</p>
    </div>
  `;
}

// Construct Task Card dynamic HTML nodes safely
function createTaskCardDOM(task) {
  const card = document.createElement("div");
  card.className = `task-card ${task.completed ? 'completed' : ''}`;
  card.dataset.id = task.id;

  // Formatting date string
  const taskDate = new Date(task.createdAt);
  const formattedDate = taskDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  // Category Emoji Map
  const emojiMap = {
    work: "💼",
    personal: "👤",
    urgent: "⚡",
    shopping: "🛒"
  };

  card.innerHTML = `
    <div class="task-content-wrapper">
      <!-- Custom Checkbox -->
      <label class="checkbox-container">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="checkbox-custom">
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </label>
      
      <!-- Text & Details -->
      <div class="task-details">
        <span class="task-title" tabindex="0" title="Double click to edit">${escapeHTML(task.title)}</span>
        <div class="task-meta">
          <span class="task-date">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <polyline points="12 6 12 12 16 14" stroke-width="2"/>
            </svg>
            ${formattedDate}
          </span>
          <span class="task-tag ${task.category}">
            ${emojiMap[task.category] || "✨"} ${task.category}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Action buttons -->
    <div class="task-actions">
      <button class="action-btn edit" aria-label="Edit task" title="Edit Task Title">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
      <button class="action-btn delete" aria-label="Delete task" title="Delete Task">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>
  `;

  return card;
}

// XSS Prevention Utility
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// ==========================================
// 6. CRUD STATE OPERATIONS
// ==========================================

// C - Create: Add Task
function addNewTask() {
  const title = taskInput.value.trim();
  if (title === "") {
    taskInput.classList.add("shake-error");
    setTimeout(() => taskInput.classList.remove("shake-error"), 500);
    return;
  }

  const newTask = {
    id: `task-${Date.now()}`,
    title: title,
    completed: false,
    category: state.selectedCategory,
    createdAt: new Date().toISOString()
  };

  state.tasks.unshift(newTask);
  saveState();
  
  taskInput.value = "";
  renderTasks();
}

// U - Update: Toggle checkbox completed state
function toggleTaskCompletion(id) {
  state.tasks = state.tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  saveState();
  renderTasks();
}

// U - Update: Inline task title edit
function enterEditMode(taskCard) {
  const id = taskCard.dataset.id;
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  const titleSpan = taskCard.querySelector(".task-title");
  
  // If already editing, ignore
  if (taskCard.querySelector(".edit-input")) return;

  const originalText = task.title;
  
  // Replace span with custom edit input element
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = originalText;
  
  // Style adjust for title space
  titleSpan.style.display = "none";
  titleSpan.parentNode.insertBefore(input, titleSpan);
  input.focus();
  input.select();

  // Save changes wrapper
  function saveEdit() {
    const newText = input.value.trim();
    if (newText !== "" && newText !== originalText) {
      state.tasks = state.tasks.map(t => {
        if (t.id === id) {
          return { ...t, title: newText };
        }
        return t;
      });
      saveState();
    }
    renderTasks();
  }

  // Handle keys inside input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
    if (e.key === "Escape") {
      renderTasks(); // Cancel edit, restore
    }
  });

  // Save on blur
  input.addEventListener("blur", () => {
    saveEdit();
  });
}

// D - Delete: Remove Task with Transition Animation
function removeTask(id) {
  const taskCard = tasksContainer.querySelector(`[data-id="${id}"]`);
  if (!taskCard) return;

  // Add exit animation class
  taskCard.classList.add("removing");
  
  // Wait for CSS exit animation (300ms) before updating state
  taskCard.addEventListener("animationend", () => {
    state.tasks = state.tasks.filter(task => task.id !== id);
    saveState();
    renderTasks();
  }, { once: true });
}

// D - Delete: Clear Completed Tasks
function clearCompletedTasks() {
  const completedCount = state.tasks.filter(t => t.completed).length;
  if (completedCount === 0) return;

  // Add exit animations to all completed task cards
  const cards = tasksContainer.querySelectorAll(".task-card.completed");
  cards.forEach(card => card.classList.add("removing"));

  // Wait for animation end, then clean up state
  setTimeout(() => {
    state.tasks = state.tasks.filter(task => !task.completed);
    saveState();
    renderTasks();
  }, 250);
}

// ==========================================
// 7. EVENT DELEGATORS & LISTENERS
// ==========================================

// Add task interactions
addTaskBtn.addEventListener("click", addNewTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNewTask();
});

// Category selector chips trigger
categoryChips.addEventListener("click", (e) => {
  const chip = e.target.closest(".category-chip");
  if (!chip) return;

  // Unactivate all chips
  categoryChips.querySelectorAll(".category-chip").forEach(btn => btn.classList.remove("active"));
  
  // Activate selected chip
  chip.classList.add("active");
  state.selectedCategory = chip.dataset.category;
});

// Filtering Tabs navigation click
filterTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".filter-tab");
  if (!tab) return;

  filterTabs.querySelectorAll(".filter-tab").forEach(btn => btn.classList.remove("active"));
  tab.classList.add("active");
  state.filter = tab.dataset.filter;
  renderTasks();
});

// Search input key interaction (debounce not needed for fast local DOM)
searchInput.addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  renderTasks();
});

// Clear Completed button click
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// Theme Toggle Action
themeToggleBtn.addEventListener("click", toggleTheme);

// DELEGATED EVENT LISTENERS (Optimized & Clean)
tasksContainer.addEventListener("click", (e) => {
  const target = e.target;
  const taskCard = target.closest(".task-card");
  if (!taskCard) return;
  const id = taskCard.dataset.id;

  // 1. Toggle completion click
  if (target.classList.contains("task-checkbox") || target.closest(".checkbox-container")) {
    // Note: The standard checkbox input handles checked state change natively, 
    // we capture the change and toggle state. Checkbox input has class 'task-checkbox'.
    if (target.classList.contains("task-checkbox")) {
      toggleTaskCompletion(id);
    }
    return;
  }

  // 2. Click Edit Button
  if (target.closest(".action-btn.edit")) {
    enterEditMode(taskCard);
    return;
  }

  // 3. Click Delete Button
  if (target.closest(".action-btn.delete")) {
    removeTask(id);
    return;
  }
});

// Double Click Title to Inline Edit
tasksContainer.addEventListener("dblclick", (e) => {
  const target = e.target;
  const taskCard = target.closest(".task-card");
  if (!taskCard) return;

  if (target.classList.contains("task-title")) {
    enterEditMode(taskCard);
  }
});

// ==========================================
// 8. APP BOOTSTRAP INITIALIZATION
// ==========================================

function initApp() {
  // Prevent duplicate initialization
  if (window.zenlistInitialized) return;
  window.zenlistInitialized = true;

  updateGreeting();
  updateDateWidget();
  initTheme();
  renderTasks();
  
  // Update clocks / dates occasionally
  setInterval(() => {
    updateGreeting();
    updateDateWidget();
  }, 60000);
}

// Launch ZenList safely
document.addEventListener("DOMContentLoaded", initApp);
// If page was loaded already, trigger instantly
if (document.readyState === "interactive" || document.readyState === "complete") {
  initApp();
}
