// Array for storing names
let names = [];
let deletednames = [];
let expensesPerPerson = {};

// Function to add a new name
function addName() {
    const nameInput = document.querySelector("#nameInputs input");
    const numberOfPerson = document.getElementById('placeholder');
    const name = nameInput.value.trim();

    if (name && !names.includes(name)) {
        names.push(name);
        nameInput.value = "";

        // Visually add name
        const nameList = document.getElementById("nameInputs");
        nameList.insertAdjacentHTML(
            "beforeend",
            `<div class="namelist_degine rounded d-flex justify-content-between align-items-center mt-2 p-2 bg-light">
                <span><img src="image/mn6dbcs15y9zru0yjw45ly54mqsf.png" width="30" height="30"> ${name}</span>
                <span><i class="fa-solid fa-trash delete_btn text-danger" onclick="deleteItem(event, '${name}')"></i></span>
            </div>`
        );

        numberOfPerson.placeholder = `Enter name of person ${names.length + 1}`;

        // Update dropdown
        const personSelect = document.getElementById("personSelect");
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        personSelect.appendChild(option);

        // Initialize their expense
        expensesPerPerson[name] = 0;
    } else {
        alert("Please enter a unique, valid name!");
    }
}

// Delete button logic
function deleteItem(event, nameToDelete) {
    const item = event.target.closest('.namelist_degine');
    item.style.background = '#DC9DA3';

    setTimeout(() => {
        item.remove();

        // Remove name from arrays and dropdown
        names = names.filter(name => name !== nameToDelete);
        deletednames.push(nameToDelete);
        delete expensesPerPerson[nameToDelete];

        const select = document.getElementById('personSelect');
        Array.from(select.options).forEach(opt => {
            if (opt.value === nameToDelete) opt.remove();
        });

        document.getElementById('placeholder').placeholder = `Enter name of person ${names.length + 1}`;
    }, 500);
}

// Go to next page
function goToNextPage() {
    if (names.length === 0) {
        alert("Please enter at least one name!");
    } else {
        document.getElementById("firstpage").style.display = "none";
        document.getElementById("secondpage").style.display = "block";
        document.getElementById("thiredpage").style.display = "none";
    }
}

function thiredpage(){
    document.getElementById("firstpage").style.display = "none";
    document.getElementById("secondpage").style.display = "none"; 
    document.getElementById("thiredpage").style.display = "block";
    balance_sheet(); // Show the result when page loads
}

// Add an expense
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

    const amount = parseFloat(expenseAmount);
    expensesPerPerson[selectedPerson] += amount;

    // Create expense wrapper
    const expenseWrapper = document.createElement("div");
    expenseWrapper.className = "d-flex justify-content-between align-items-center bg-light p-2 mt-2 rounded";

    // Create expense text
    const expenseText = document.createElement("span");
    expenseText.textContent = `${selectedPerson} spent $${amount.toFixed(2)}`;

    // Create delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash delete_btn text-danger";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.onclick = function () {
        expenseslist.removeChild(expenseWrapper);
        expensesPerPerson[selectedPerson] -= amount;
        calculateExpenses();
    };

    // Append text and icon to wrapper
    expenseWrapper.appendChild(expenseText);
    expenseWrapper.appendChild(deleteIcon);

    // Append wrapper to the list
    expenseslist.appendChild(expenseWrapper);

    // Clear input
    document.getElementById("expenseAmount").value = "";

    // Optional: update total
    calculateExpenses();
}


// Calculate total expenses
function calculateExpenses() {
    const resultDiv = document.getElementById("result");
    const personWiseDiv = document.getElementById("person-wise-expenses");
    let totalAmount = 0;
    let personCount = 0;
    // Clear old data
    personWiseDiv.innerHTML = "";

    for (let person in expensesPerPerson) {
        totalAmount += expensesPerPerson[person];
        amount = expensesPerPerson[person];
        personCount++;
    }
    const average = totalAmount / personCount;
    resultDiv.innerHTML = `Total Expense: $${totalAmount.toFixed(2)}<br>Average per person: $${average.toFixed(2)}`;
}

function balance_sheet() {
    const balancesheet = document.getElementById("balance_sheet");
    balancesheet.innerHTML = ""; // Clear previous entries

    let totalAmount = 0;
    let personCount = 0;

    for (let person in expensesPerPerson) {
        totalAmount += expensesPerPerson[person];
        personCount++;
    }

    const average = totalAmount / personCount;

    for (let person in expensesPerPerson) {
        const spent = expensesPerPerson[person];
        const diff = spent - average;

        const personDiv = document.createElement("div");
        personDiv.classList.add("d-flex", "justify-content-between", "align-items-center", "p-2", "mb-2", "rounded", "shadow-sm");

        if (diff > 0) {
            personDiv.classList.add("bg-success", "text-white");
            personDiv.innerHTML = `<span><i class="fa-solid fa-arrow-up me-2"></i> ${person}</span><span>+ $${diff.toFixed(2)}</span>`;
        } else if (diff < 0) {
            personDiv.classList.add("bg-danger", "text-white");
            personDiv.innerHTML = `<span><i class="fa-solid fa-arrow-down me-2"></i> ${person}</span><span>- $${Math.abs(diff).toFixed(2)}</span>`;
        } else {
            personDiv.classList.add("bg-secondary", "text-white");
            personDiv.innerHTML = `<span><i class="fa-solid fa-handshake me-2"></i> ${person}</span><span>Settled up</span>`;
        }

        balancesheet.appendChild(personDiv);
    }
    
}




// Back to name entry page
function back() {
    document.getElementById("firstpage").style.display = "block";
    document.getElementById("secondpage").style.display = "none";
}

function backthird() {
    document.getElementById("firstpage").style.display = "none";
    document.getElementById("secondpage").style.display = "block";
    document.getElementById("thiredpage").style.display = "none";

}


// Initial state
document.getElementById("secondpage").style.display = "none";
document.getElementById("thiredpage").style.display = "none";

// Event listeners
document.querySelector(".btn-primary").addEventListener("click", addName);
document.getElementById("back").addEventListener("click", back);


