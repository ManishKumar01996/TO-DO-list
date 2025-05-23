// Select all elements with the class "todo" (draggable items)
const todos = document.querySelectorAll(".todo");

// Select all elements with the class "status" (drop zones)
const all_status = document.querySelectorAll(".status");

// Variable to store the currently dragged todo item
let draggableTodo = null;

// Add drag event listeners to each todo item
todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart); // Triggered when dragging starts
  todo.addEventListener("dragend", dragEnd); // Triggered when dragging ends
});

// Function to handle the start of dragging
function dragStart() {
  draggableTodo = this; // Store the dragged element
  setTimeout(() => {
    this.style.display = "none"; // Hide the element temporarily
  }, 0);
  console.log("dragStart");
}

// Function to handle the end of dragging
function dragEnd() {
  draggableTodo = null; // Clear the dragged element
  setTimeout(() => {
    this.style.display = "block"; // Make the element visible again
  }, 0);
  console.log("dragEnd");
}

// Add drag event listeners to each status (drop zone)
all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver); // Triggered when an item is dragged over
  status.addEventListener("dragenter", dragEnter); // Triggered when an item enters the drop zone
  status.addEventListener("dragleave", dragLeave); // Triggered when an item leaves the drop zone
  status.addEventListener("drop", dragDrop); // Triggered when an item is dropped
});

// Prevent default behavior to allow dropping
function dragOver(e) {
  e.preventDefault();
  // console.log("dragOver");
}

// Highlight the drop zone when an item enters
function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

// Remove the highlight when an item leaves the drop zone
function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

// Handle the drop event
function dragDrop() {
  this.style.border = "none"; // Remove the highlight
  this.appendChild(draggableTodo); // Append the dragged item to the drop zone
  console.log("dropped");
}

/* Modal functionality */

// Select all buttons that open modals
const btns = document.querySelectorAll("[data-target-modal]");

// Select all buttons that close modals
const close_modals = document.querySelectorAll(".close-modal");

// Select the overlay element
const overlay = document.getElementById("overlay");

// Add click event listeners to open modal buttons
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active"); // Show the modal
    overlay.classList.add("active"); // Show the overlay
  });
});

// Add click event listeners to close modal buttons
close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal"); // Find the closest modal
    modal.classList.remove("active"); // Hide the modal
    overlay.classList.remove("active"); // Hide the overlay
  });
});

// Close modals when clicking outside of them (on the overlay)
window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active")); // Hide all modals
    overlay.classList.remove("active"); // Hide the overlay
  }
};

/* Create todo functionality */

// Select the submit button for creating todos
const todo_submit = document.getElementById("todo_submit");

// Add click event listener to the submit button
todo_submit.addEventListener("click", createTodo);

// Function to create a new todo item
function createTodo() {
  const todo_div = document.createElement("div"); // Create a new div for the todo
  const input_val = document.getElementById("todo_input").value; // Get the input value
  const txt = document.createTextNode(input_val); // Create a text node with the input value

  todo_div.appendChild(txt); // Add the text to the todo div
  todo_div.classList.add("todo"); // Add the "todo" class
  todo_div.setAttribute("draggable", "true"); // Make the todo draggable

  /* Create a close button for the todo */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7"); // Unicode for "×" (close symbol)
  span.classList.add("close"); // Add the "close" class
  span.appendChild(span_txt); // Add the close symbol to the span

  todo_div.appendChild(span); // Add the close button to the todo

  no_status.appendChild(todo_div); // Add the new todo to the "no status" section

  // Add click event listener to the close button
  span.addEventListener("click", () => {
    span.parentElement.style.display = "none"; // Hide the todo when the close button is clicked
  });

  // Add drag event listeners to the new todo
  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = ""; // Clear the input field
  todo_form.classList.remove("active"); // Hide the todo form
  overlay.classList.remove("active"); // Hide the overlay
}

// Select all existing close buttons
const close_btns = document.querySelectorAll(".close");

// Add click event listeners to existing close buttons
close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none"; // Hide the todo when the close button is clicked
  });
});