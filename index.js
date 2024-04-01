"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var BankAccount = /** @class */ (function () {
    function BankAccount() {
        this.balance = 0;
        this.pin = '';
        this.isOpen = false;
    }
    BankAccount.prototype.openAccount = function () {
        if (this.isOpen) {
            console.log("Account is already open.");
            return;
        }
        console.log("Welcome to our bank!");
        var initialDeposit = parseFloat(readlineSync.question("Enter initial deposit amount: "));
        if (initialDeposit <= 0 || isNaN(initialDeposit)) {
            console.log("Invalid amount. Please try again.");
            return;
        }
        this.balance = initialDeposit;
        var pin = readlineSync.question("Set your 4-digit PIN: ");
        if (!/^\d{4}$/.test(pin)) {
            console.log("Invalid PIN format. Please enter a 4-digit PIN.");
            return;
        }
        this.pin = pin;
        this.isOpen = true;
        console.log("Account opened successfully.");
    };
    BankAccount.prototype.verifyPin = function () {
        if (!this.isOpen) {
            console.log("Account is not open.");
            return false;
        }
        var enteredPin = readlineSync.question("Enter your PIN: ");
        return enteredPin === this.pin;
    };
    BankAccount.prototype.withdraw = function () {
        if (!this.verifyPin())
            return;
        var amount = parseFloat(readlineSync.question("Enter amount to withdraw: "));
        if (isNaN(amount) || amount <= 0) {
            console.log("Invalid amount. Please try again.");
            return;
        }
        if (amount > this.balance) {
            console.log("Insufficient balance.");
            return;
        }
        this.balance -= amount;
        console.log("Withdrawal successful. Remaining balance: ".concat(this.balance));
    };
    BankAccount.prototype.deposit = function () {
        if (!this.verifyPin())
            return;
        var amount = parseFloat(readlineSync.question("Enter amount to deposit: "));
        if (isNaN(amount) || amount <= 0) {
            console.log("Invalid amount. Please try again.");
            return;
        }
        this.balance += amount;
        console.log("Deposit successful. Current balance: ".concat(this.balance));
    };
    BankAccount.prototype.checkBalance = function () {
        if (!this.verifyPin())
            return;
        console.log("Current balance: ".concat(this.balance));
    };
    BankAccount.prototype.changePin = function () {
        if (!this.verifyPin())
            return;
        var newPin = readlineSync.question("Enter new 4-digit PIN: ");
        if (!/^\d{4}$/.test(newPin)) {
            console.log("Invalid PIN format. Please enter a 4-digit PIN.");
            return;
        }
        this.pin = newPin;
        console.log("PIN changed successfully.");
    };
    return BankAccount;
}());
var atm = new BankAccount();
function showMenu() {
    console.log("\n1. Open Account");
    console.log("2. Withdraw");
    console.log("3. Deposit");
    console.log("4. Check Balance");
    console.log("5. Change PIN");
    console.log("6. Exit");
}
function getUserInput() {
    return parseInt(readlineSync.question("Enter your choice: "));
}
while (true) {
    showMenu();
    var choice = getUserInput();
    switch (choice) {
        case 1:
            atm.openAccount();
            break;
        case 2:
            atm.withdraw();
            break;
        case 3:
            atm.deposit();
            break;
        case 4:
            atm.checkBalance();
            break;
        case 5:
            atm.changePin();
            break;
        case 6:
            console.log("Exiting...");
            process.exit(0);
        default:
            console.log("Invalid choice. Please enter a number between 1 and 6.");
    }
}
