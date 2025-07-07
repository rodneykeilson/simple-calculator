// Use mathjs for more accurate calculations
const config = {
  number: 'BigNumber',
  precision: 64
};
math.config(config);

class Calculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.resetScreen = false;
        this.history = [];
        
        this.display = document.getElementById('display');
        this.historyDisplay = document.getElementById('history');
        this.buttons = document.querySelectorAll('.btn');
        
        this.initialize();
    }
    
    initialize() {
        // Add event listeners to all buttons
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button));
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
        
        this.updateDisplay();
    }
    
    handleButtonClick(button) {
        const value = button.getAttribute('data-value');
        
        if (button.classList.contains('number')) {
            this.appendNumber(value);
        } else if (button.classList.contains('operator')) {
            this.chooseOperation(value);
        } else if (button.classList.contains('clear')) {
            this.clear();
        } else if (button.classList.contains('backspace')) {
            this.backspace();
        }
        
        this.updateDisplay();
    }
    
    handleKeyboardInput(e) {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            this.appendNumber(e.key);
        } else if (['+', '-', '*', '/', '%', '^'].includes(e.key)) {
            this.chooseOperation(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            this.compute();
        } else if (e.key === 'Backspace') {
            this.backspace();
        } else if (e.key === 'Escape') {
            this.clear();
        } else if (e.key === '(' || e.key === ')') {
            this.appendNumber(e.key);
        }
        
        this.updateDisplay();
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentInput.includes('.')) return;
        
        if (this.currentInput === '0' || this.resetScreen) {
            this.currentInput = number === '.' ? '0.' : number;
            this.resetScreen = false;
        } else {
            this.currentInput += number;
        }
    }
    
    chooseOperation(operation) {
        if (this.currentInput === '') return;
        
        if (this.previousInput !== '') {
            this.compute();
        }
        
        switch(operation) {
            case '=':
                this.compute();
                return;
            case 'AC':
                this.clear();
                return;
            case 'del':
                this.backspace();
                return;
            case '√':
                this.currentInput = Math.sqrt(parseFloat(this.currentInput)).toString();
                this.addToHistory(`√(${this.currentInput})`);
                this.resetScreen = true;
                return;
            case '^':
                this.operation = '^';
                this.previousInput = this.currentInput;
                this.currentInput = '';
                return;
            case 'sin':
                this.currentInput = Math.sin(parseFloat(this.currentInput) * Math.PI / 180).toFixed(8).replace(/\.?0+$/, '');
                this.addToHistory(`sin(${this.currentInput}°)`);
                this.resetScreen = true;
                return;
            case 'cos':
                this.currentInput = Math.cos(parseFloat(this.currentInput) * Math.PI / 180).toFixed(8).replace(/\.?0+$/, '');
                this.addToHistory(`cos(${this.currentInput}°)`);
                this.resetScreen = true;
                return;
            case 'tan':
                this.currentInput = Math.tan(parseFloat(this.currentInput) * Math.PI / 180).toFixed(8).replace(/\.?0+$/, '');
                this.addToHistory(`tan(${this.currentInput}°)`);
                this.resetScreen = true;
                return;
            case 'log':
                this.currentInput = Math.log10(parseFloat(this.currentInput)).toFixed(8).replace(/\.?0+$/, '');
                this.addToHistory(`log(${this.currentInput})`);
                this.resetScreen = true;
                return;
            case 'ln':
                this.currentInput = Math.log(parseFloat(this.currentInput)).toFixed(8).replace(/\.?0+$/, '');
                this.addToHistory(`ln(${this.currentInput})`);
                this.resetScreen = true;
                return;
            case 'π':
                this.currentInput = Math.PI.toString();
                return;
            case 'e':
                this.currentInput = Math.E.toString();
                return;
            default:
                this.operation = operation;
                this.previousInput = this.currentInput;
                this.currentInput = '';
        }
    }
    
    compute() {
        try {
            let expression = '';
            
            // Handle special cases for scientific operations
            if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(this.operation)) {
                expression = `${this.operation}(${this.currentInput})`;
            } else if (this.operation) {
                expression = `${this.previousInput} ${this.operation} ${this.currentInput}`;
            } else {
                return;
            }
            
            // Use mathjs to evaluate the expression
            const result = math.evaluate(expression);
            this.addToHistory(expression);
            this.currentInput = result.toString();
            this.operation = null;
            this.previousInput = '';
            this.resetScreen = true;
        } catch (error) {
            console.error('Calculation error:', error);
            this.currentInput = 'Error';
            this.resetScreen = true;
        }
    }
    
    addToHistory(operation) {
        this.history.unshift(operation);
        if (this.history.length > 3) {
            this.history.pop();
        }
        this.updateHistoryDisplay();
    }
    
    updateHistoryDisplay() {
        this.historyDisplay.innerHTML = this.history.join('<br>');
    }
    
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
    }
    
    backspace() {
        if (this.currentInput.length === 1) {
            this.currentInput = '0';
        } else {
            this.currentInput = this.currentInput.slice(0, -1);
        }
    }
    
    updateDisplay() {
        this.display.textContent = this.currentInput;
    }
}

// Initialize the calculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
