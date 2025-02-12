// Change here housemates and tasks
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
    return housemates[currentWeek % housemates.length]; // Cycles fairly through all housemates
}

// Assign tasks fairly (rotates each week, ensuring fair shifts)
function getAssignments() {
    const offDutyPerson = getOffDutyPerson();
    const availableHousemates = [...housemates.filter(person => person !== offDutyPerson)];

    // Rotate housemates based on the current week
    const shift = currentWeek % availableHousemates.length;
    const rotatedHousemates = [...availableHousemates.slice(shift), ...availableHousemates.slice(0, shift)];

    return tasks.map((task, i) => ({
        task,
        assignedTo: rotatedHousemates[i],
    }));
}

// Render the task table
function renderTable() {
    const tbody = document.querySelector("#taskTable tbody");
    tbody.innerHTML = ""; // Clear table before adding new rows

    const offDutyPerson = getOffDutyPerson();
    const assignments = getAssignments();

    // Add a row for the off-duty person. Delete if no person is off-duty
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
