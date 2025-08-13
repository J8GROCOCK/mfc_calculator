const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('#buttons .button');

let operand1 = '';
let operand2 = '';
let operator = '';
let result = null;

function updateScreen(value) {
    screen.value = value;
}

function appendNumber(num) {
    if (operator === '') {
        operand1 += num;
        updateScreen(operand1);
    } else {
        operand2 += num;
        updateScreen(operand2);
    }
}

function setOperator(op) {
    if (operand1 === '') return;
    if (operand2 !== '') {
        calculate();
    }
    operator = op;
}

function calculate() {
    if (operand1 === '' || operand2 === '' || operator === '') return;

    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    if (operator === '/' && num2 === 0) {
        updateScreen("No Zero Div!");
        operand1 = '';
        operand2 = '';
        operator = '';
        result = null;
        return;
    }

    switch (operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
    }

    result = parseFloat(result.toFixed(4));
    updateScreen(result);

    operand1 = result.toString();
    operand2 = '';
    operator = '';
}

function clearAll() {
    operand1 = '';
    operand2 = '';
    operator = '';
    result = null;
    updateScreen('');
}

function clearLast() {
    if (operator === '') {
        operand1 = operand1.slice(0, -1);
        updateScreen(operand1);
    } else {
        operand2 = operand2.slice(0, -1);
        updateScreen(operand2);
    }
}

// Click Logic for Gui Buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value) {
            if (!isNaN(value) || value === '.') {
                appendNumber(value);
            } else {
                setOperator(value);
            }
        } else if (action) {
            switch (action) {
                case 'all-clear':
                    clearAll();
                    break;
                case 'clear':
                    clearLast();
                    break;
                case 'equals':
                    calculate();
                    break;
            }
        }
    });
});

// Keyboard Logic 
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    }

    if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key);
    }

    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }

    if (key === 'Backspace') {
        clearLast();
    }

    if (key === 'Escape') {
        clearAll();
    }
});
