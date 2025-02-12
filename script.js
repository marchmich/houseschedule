// Housemates and tasks
const housemates = ["Nathan", "Miguel", "Michelle", "Diana", "Martin"];
const tasks = ["Kitchen and Trash", "Living Room and Sun Room", "Dining Room and Hallway", "Second Floor and Stairs"];

// Get current week number
Date.prototype.getWeekNumber = function () {
    const oneJan = new Date(this.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((this - oneJan) / millisecsInDay + oneJan.getDay() + 1) / 7);
};

const currentWeek = new Date().getWeekNumber();

// Function to get the off-duty person for the week
function getOffDutyPerson() {
    const offDutyIndex = (currentWeek - 1) % housemates.length; // Subtract 1 to make week 1 start with index 0
    return housemates[offDutyIndex];
}

// Assign tasks fairly (rotates each week, excluding the off-duty person)
function getAssignments() {
    const offDutyPerson = getOffDutyPerson();
    const availableHousemates = housemates.filter(person => person !== offDutyPerson);

    return tasks.map((task, i) => {
        const assignedIndex = (currentWeek + i) % availableHousemates.length;
        return { task, assignedTo: availableHousemates[assignedIndex] };
    });
}

// Render the task table
function renderTable() {
    const tbody = document.querySelector("#taskTable tbody");
    tbody.innerHTML = ""; // Clear table before adding new rows

    const offDutyPerson = getOffDutyPerson();
    const assignments = getAssignments();

    // Add a row for the off-duty person
    const offDutyRow = document.createElement("tr");
    offDutyRow.innerHTML = `
        <td><strong>Off Duty</strong></td>
        <td><strong>${offDutyPerson}</strong></td>
        <td></td>
    `;
    tbody.appendChild(offDutyRow);

    // Add rows for the tasks
    assignments.forEach((assignment, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${assignment.task}</td>
            <td>${assignment.assignedTo}</td>
            <td><input type="checkbox" id="task-${index}"></td>
        `;
        tbody.appendChild(row);
    });

    // Restore checkmarks from localStorage
    assignments.forEach((_, index) => {
        const checkbox = document.getElementById(`task-${index}`);
        checkbox.checked = localStorage.getItem(`task-${index}`) === "true";

        // Save checkmarks when clicked
        checkbox.addEventListener("change", () => {
            localStorage.setItem(`task-${index}`, checkbox.checked);
        });
    });
}

// Load the table on page load
document.addEventListener("DOMContentLoaded", renderTable);