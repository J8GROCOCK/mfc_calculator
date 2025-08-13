const screen = document.getElementById('screen');
let currentInput = [];

const buttons = document.querySelectorAll('#buttons .button');

function updateScreen() {
    screen.value = currentInput.join('');
}

function calculation() {
    const expression = currentInput.join('');
    try {
        const result = eval(expression);
        currentInput = [result.toString()];
    } catch (e) {
        alert('Invalid expression! No unary operations or division by 0!');
        currentInput = [];
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
