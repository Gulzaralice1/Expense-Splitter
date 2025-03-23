// Array for storing names
let names = [];
// Persistent object to store expenses per person
let expensesPerPerson = {};
// Function to add a new name
function addName() {
    const nameInput = document.querySelector("#nameInputs input");
    const numberOfPerson = document.getElementById('placeholder');
    const name = nameInput.value.trim();

    if (name && !names.includes(name)) {
        names.push(name);
        nameInput.value = "";
        console.log("Current names:", names);

        // Add name visually
        const nameList = document.getElementById("nameInputs");
        nameList.insertAdjacentHTML(
            "beforeend",
            `<div class="namelist_degine rounded">
                <span><img src="image/mn6dbcs15y9zru0yjw45ly54mqsf.png" width="30" height="30"> ${name}</span>
                <span"><i class="fa-solid fa-trash delete_btn"></i></span>
            </div>`
        );
        console.log(`Nnumber of person ${names.length}`);
        // let name_count = 
        numberOfPerson.placeholder = `Enter name of person ${names.length + 1}`;
        // Update dropdown with new name
        const personSelect = document.getElementById("personSelect");
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        personSelect.appendChild(option);

        // Initialize expense tracking for this person
        expensesPerPerson[name] = 0;
    } else {
        alert("Please enter a unique, valid name!");
    }
}

// Function to go to the next page
function goToNextPage() {
    if (names.length === 0) {
        alert("Please enter at least one name!");
    } else {
        document.getElementById("firstpage").style.display = "none";
        document.getElementById("orginal").style.display = "block";
    }
}

// Function to add an expense
function addExpense() {
    const expenseAmount = document.getElementById("expenseAmount").value.trim();
    const expenseslist = document.getElementById("expenses-list");
    const personSelect = document.getElementById("personSelect");
    const selectedPerson = personSelect.value;

    if (!expenseAmount || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    if (!selectedPerson) {
        alert("Please select a person!");
        return;
    }

    // Convert amount to a number
    const amount = parseFloat(expenseAmount);

    // Update the person's expense
    expensesPerPerson[selectedPerson] += amount;

    // Create a new paragraph to display the expense
    const expensesItem = document.createElement("p");
    expensesItem.textContent = `${selectedPerson} spent $${amount.toFixed(2)}`;

    // Add the expense to the list
    expenseslist.appendChild(expensesItem );

    // Clear the input field after adding expense
    document.getElementById("expenseAmount").value = "";

    // Update the total calculation display
    calculateExpenses();
}

// Function to calculate total expenses
function calculateExpenses() {
    const resultDiv = document.getElementById("result");
    let totalAmount = 0;

    // Sum up all the expenses
    for (let person in expensesPerPerson) {
        totalAmount += expensesPerPerson[person];
    }

    // Display total amount
    resultDiv.textContent = `Total Expense: $${totalAmount.toFixed(2)}`;
}

// Back button function
function back() {
    document.getElementById("firstpage").style.display = "block";
    document.getElementById("orginal").style.display = "none";
}

// Hide second page initially
document.getElementById("orginal").style.display = "none";

// Button click event for adding names
document.querySelector(".btn-primary").addEventListener("click", addName);
document.getElementById("back").addEventListener("click", back);