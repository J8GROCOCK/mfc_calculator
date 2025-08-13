const screen = document.getElementById('screen');
let currentInput = [];

const buttons = document.querySelectorAll('#buttons .button');

function updateScreen() {
    screen.value = currentInput.join('');
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        currentInput.push(key);
        updateScreen();
    }

    if (['+', '-', '*', '/'].includes(key)) {
        currentInput.push(key);
        updateScreen();
    }

    if (key === 'Enter' || key === '=') {
        calculation();
    }

    if (key === 'Backspace') {
        currentInput.pop();
        updateScreen();
    }

    if (key === 'Escape') {
        currentInput = [];
        updateScreen();
    }
});


function calculation() {
    const expression = currentInput.join('');
    try {
        const result = eval(expression);
        const formattedResult = parseFloat(result.toFixed(4));
        currentInput = [formattedResult.toString()];
    } catch (e) {
        screen.value = "Invalid!";
        currentInput = [];
        return;
    }
    updateScreen();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value) {
            currentInput.push(value);
            updateScreen();
        } else if (action) {
            switch(action) {
                case 'all-clear':
                    currentInput = [];
                    updateScreen();
                    break;
                case 'clear':
                    currentInput.pop();
                    updateScreen();
                    break;
                case 'equals':
                    calculation();
                    break;
            }
        }
    });
});
