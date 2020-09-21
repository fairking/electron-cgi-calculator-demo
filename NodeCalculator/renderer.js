// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let _num1 = 0;
let _num2 = null;
let _selectedOperation = null;

const { ConnectionBuilder } = require('electron-cgi');
const { remote } = require('electron');
const path = require('path')

let _connection = null;

function setupConnectionToRestartOnConnectionLost() {
    debugger;
    let e_path = remote.app.getAppPath();
    e_path = e_path.replace("/resources/app.asar", "");
    let a_path = path.join(e_path, '/DotNetCalculator/DotNetCalculator.exe')
    _connection = new ConnectionBuilder().connectTo(a_path).build();
    _connection.onDisconnect = (err) => {
        setTimeout(function () {
            alert('Connection lost, restarting...');
            setupConnectionToRestartOnConnectionLost();
        }, 3000);
    };
};

setupConnectionToRestartOnConnectionLost();

function reset() {
    _num1 = 0;
    _num2 = null;
    _selectedOperation = null;
    updateDisplay();
};

function setDisplayOperation(operation) {
    document.getElementById('operation').innerText = operation || '';
};

function setDisplay(number) {
    document.getElementById('result').innerText = number;
};

function updateDisplay() {
    setDisplayOperation(_selectedOperation);
    if (_num2 === null) {
        setDisplay(_num1);
    } else {
        setDisplay(_num2);
    }
};

document.getElementById('calculator').addEventListener('click', function (e) {
    const elementClicked = e.target;
    const op = elementClicked.getAttribute('data-operation');
    const selectedNumberAsString = elementClicked.getAttribute('data-value')
    if (op != null) {
        if (op === 'clear') {
            reset();
        } else if (op === '=') {
            if (!_selectedOperation) {
                return;
            }
            if (_selectedOperation === '+') {
                performSum();
            } else if (_selectedOperation === '-') {
                performSubtraction();
            } else if (_selectedOperation === '*') {
                performMultiplication();
            } else {
                performDivision();
            }
        } else {
            _selectedOperation = op;
            _num2 = 0;
            updateDisplay();
        }
    } else if (selectedNumberAsString !== null) {
        const selectedNumber = Number(selectedNumberAsString);
        if (_num2 === null) {
            _num1 = _num1 * 10 + selectedNumber;
        } else {
            _num2 = _num2 * 10 + selectedNumber;
        }
        updateDisplay();
    }
});



function performSum() {
    _connection.send('sum', { num1: _num1, num2: _num2 }, (error, result) => {
        reset();
        _num1 = result;
        updateDisplay();
    });
};

function performSubtraction() {
    _connection.send('subtraction', { num1: _num1, num2: _num2 }, (error, result) => {
        reset();
        _num1 = result;
        updateDisplay();
    });
};

function performMultiplication() {
    _connection.send('multiplication', { num1: _num1, num2: _num2 }, (error, result) => {
        reset();
        _num1 = result;
        updateDisplay();
    });
};


function performDivision() {
    _connection.send('division', { num1: _num1, num2: _num2 }, (error, result) => {
        reset();
        _num1 = result;
        updateDisplay();
    });
};
