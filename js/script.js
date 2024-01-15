let originalOrder = []; // Array to store the original order of buttons
let currentOrder = [];  // Array to store the user's current order

function createButtons() {
    // Remove existing buttons and reset memory
    document.getElementById("buttons-container").innerHTML = "";
    originalOrder = [];
    currentOrder = [];

    let numberOfButtons = parseInt(document.getElementById("numberOfButtons").value);

    // Validate input
    if (numberOfButtons >= 3 && numberOfButtons <= 7) {
        // Create buttons with random colors and numbers
        for (let i = 0; i < numberOfButtons; i++) {
            let button = document.createElement("button");
            button.style.backgroundColor = getRandomColor();
            button.innerText = "Button " + (i + 1);
            originalOrder.push(i + 1); // Store original order
            document.getElementById("buttons-container").appendChild(button);
        }

        // Pause for n seconds
        setTimeout(() => {
            // Scramble buttons every 2 seconds, n times
            for (let i = 0; i < numberOfButtons; i++) {
                setTimeout(() => {
                    scrambleButtons();
                }, i * 2000);
            }

            // Hide numbers and make buttons clickable
            setTimeout(() => {
                hideNumbersAndMakeClickable();
            }, numberOfButtons * 2000);
        }, numberOfButtons * 1000);
    } else {
        alert("Please enter a number between 3 and 7.");
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function scrambleButtons() {
    let container = document.getElementById("buttons-container");
    let buttons = Array.from(container.children);

    buttons.forEach(button => {
        let x = Math.random() * (window.innerWidth - button.offsetWidth);
        let y = Math.random() * (window.innerHeight - button.offsetHeight);

        button.style.position = 'absolute';
        button.style.left = x + 'px';
        button.style.top = y + 'px';
    });
}

function hideNumbersAndMakeClickable() {
    let buttons = document.getElementById("buttons-container").children;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = ""; // Hide numbers
        buttons[i].onclick = () => handleButtonClick(i + 1); // Pass the button number
    }
}

function handleButtonClick(buttonNumber) {
    currentOrder.push(buttonNumber);

    // Confirm the order by revealing the number on the button
    document.getElementById("buttons-container").children[buttonNumber - 1].innerText = buttonNumber;

    // Check if the user clicked all buttons in the correct order
    if (arraysEqual(originalOrder, currentOrder)) {
        alert("Excellent memory!");
        resetGame();
    } else if (currentOrder.length === originalOrder.length && !arraysEqual(originalOrder, currentOrder)) {
        alert("Wrong order!");
        revealCorrectOrder();
        resetGame();
    }
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function revealCorrectOrder() {
    let buttons = document.getElementById("buttons-container").children;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = originalOrder[i];
    }
}

function resetGame() {
    originalOrder = [];
    currentOrder = [];
}