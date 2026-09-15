let allTasks = [];


async function loadTasks() {

    try {

        const response = await fetch("/tasks");

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        allTasks = await response.json();

        displayTasks();
        updateDashboard();

    } catch (error) {

        console.error(error);

        document.getElementById("taskList").innerHTML =
            `<p class="empty">Unable to load tasks.</p>`;
    }
}


function displayTasks() {

    const search =
        document.getElementById("search").value
            .toLowerCase();

    const status =
        document.getElementById("filterStatus").value;

    const priority =
        document.getElementById("filterPriority").value;


    const filteredTasks = allTasks.filter(task => {

        const matchesSearch =
            task.title.toLowerCase().includes(search) ||
            (task.description || "")
                .toLowerCase()
                .includes(search);

        const matchesStatus =
            status === "All" ||
            task.status === status;

        const matchesPriority =
            priority === "All" ||
            task.priority === priority;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });


    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";


    document.getElementById("taskCount").innerText =
        `${filteredTasks.length} task(s)`;


    if (filteredTasks.length === 0) {

        taskList.innerHTML =
            `<p class="empty">No tasks found.</p>`;

        return;
    }


    filteredTasks.forEach(task => {

        const div = document.createElement("div");

        div.className = "task";

        div.innerHTML = `

            <h3>${escapeHTML(task.title)}</h3>

            <p class="task-description">
                ${escapeHTML(
                    task.description || "No description"
                )}
            </p>

            <div class="task-info">

                <span class="priority">
                    Priority: ${task.priority}
                </span>

                <select
                    onchange="updateTask(${task.id}, this.value)"
                >

                    <option value="Todo"
                        ${task.status === "Todo" ? "selected" : ""}>
                        Todo
                    </option>

                    <option value="In Progress"
                        ${task.status === "In Progress" ? "selected" : ""}>
                        In Progress
                    </option>

                    <option value="Completed"
                        ${task.status === "Completed" ? "selected" : ""}>
                        Completed
                    </option>

                </select>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(div);
    });
}


async function addTask() {

    const title =
        document.getElementById("title").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const priority =
        document.getElementById("priority").value;

    const error =
        document.getElementById("error");


    error.innerText = "";


    if (!title) {

        error.innerText =
            "Task title cannot be empty.";

        return;
    }


    if (title.length < 3) {

        error.innerText =
            "Task title must contain at least 3 characters.";

        return;
    }


    try {

        const response = await fetch("/tasks", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                description,
                priority
            })

        });


        if (!response.ok) {

            const data = await response.json();

            throw new Error(
                data.error || "Failed to create task"
            );
        }


        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        await loadTasks();

    } catch (error) {

        error.innerText = error.message;
    }
}


async function updateTask(id, status) {

    try {

        const response = await fetch(
            `/tasks/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status
                })
            }
        );


        if (!response.ok) {
            throw new Error("Failed to update task");
        }


        await loadTasks();

    } catch (error) {

        alert(error.message);
    }
}


async function deleteTask(id) {

    const confirmed =
        confirm("Delete this task?");

    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `/tasks/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to delete task");
        }


        await loadTasks();

    } catch (error) {

        alert(error.message);
    }
}


function updateDashboard() {

    let todo = 0;
    let progress = 0;
    let completed = 0;


    allTasks.forEach(task => {

        if (task.status === "Todo") {
            todo++;
        }

        else if (task.status === "In Progress") {
            progress++;
        }

        else if (task.status === "Completed") {
            completed++;
        }

    });


    document.getElementById("total").innerText =
        allTasks.length;

    document.getElementById("todo").innerText =
        todo;

    document.getElementById("progress").innerText =
        progress;

    document.getElementById("completed").innerText =
        completed;
}


/*
Prevent HTML injection when displaying user input.
*/
function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


loadTasks();