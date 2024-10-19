let todos = [];

function addTodo() {
    const inputValue = document.querySelector("input").value;
    if (inputValue !== "") {
        todos.push({ title: inputValue });
        document.querySelector("input").value = ""; // Clear the input field
        render();
    }
}

function deleteLast(){
    todos.pop(); // Removes the last element from the array
    render();
}

function deleteFirst() {
    todos.splice(0, 1); // Removes the first element from the array
    render();
}
function delete_every() {
    todos = []; // Empties the entire array
    render(); // Re-renders the empty list
}

function createTodoComponent(todo) {
    const div = document.createElement("div");
    const h1El = document.createElement("h1");
    const buttonEl = document.createElement("button");
    const editButtonEl = document.createElement("button");
    const setDateButtonEl = document.createElement("button");
    const setTimerButtonEl = document.createElement("button");

    buttonEl.innerHTML = "Delete";
    h1El.innerHTML = todo.title;

    buttonEl.onclick = () => {
        const index = todos.indexOf(todo);
        todos.splice(index, 1);
        render();
    };

    editButtonEl.innerHTML = "Edit";
    editButtonEl.classList.add("edit-btn");
    editButtonEl.onclick = () => {
        const newTitle = prompt("Edit todo:", todo.title);
        if (newTitle) {
            todo.title = newTitle;
            render();
        }
    };

    setDateButtonEl.innerHTML = "Set Date";
    setDateButtonEl.classList.add("set-date-btn");
    setDateButtonEl.onclick = () => {
        const newDate = prompt("Set due date (YYYY-MM-DD):");
        if (newDate) {
            todo.dueDate = newDate;
            render();
        }
    };

    setTimerButtonEl.innerHTML = "Set Timer";
    setTimerButtonEl.classList.add("set-timer-btn");
    setTimerButtonEl.onclick = () => {
        const timerMinutes = prompt("Set timer in minutes:");
        if (timerMinutes) {
            todo.timer = timerMinutes;

            // Call the timer function with the entered minutes
            startTimer(todo, timerMinutes);
        }
    };

    div.append(h1El);
    div.append(buttonEl);
    div.append(editButtonEl);
    div.append(setDateButtonEl);
    div.append(setTimerButtonEl);
    return div;
}

function startTimer(todo, minutes) {
    // Schedule the alert and sound to play after the specified time
    const timerDuration = minutes * 60000; // Convert minutes to milliseconds
    todo.timerId = setTimeout(() => {
        playSound(); // Play sound when the timer ends
        alert(`Time's up for "${todo.title}"!`); // Show alert
    }, timerDuration);
}

function render() {
    const todoContainer = document.querySelector("#todos");
    todoContainer.innerHTML = "";
    
    for (let i = 0; i < todos.length; i++) {
        const element = createTodoComponent(todos[i]);
        todoContainer.appendChild(element);
    }
}

// Function to play sound
function playSound() {
    const audio = new Audio('760439__brunoauzet__ter-bretagne-train.wav'); // Load the sound file
    audio.play(); // Play the sound

    // Stop the sound after a certain duration (e.g., 5 seconds)
    setTimeout(() => {
        audio.pause(); // Pause the audio
        audio.currentTime = 0; // Reset audio to the beginning
    }, 5000); // Duration to play sound (5000ms = 5 seconds)
}


