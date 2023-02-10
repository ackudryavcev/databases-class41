const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});


const dataAccounts = [
    ['A0101', 1000.00],
    ['A0102', 2000.00],
    ['A0103', 3000.00],
    ['A0104', 4000.00],
    ['A0105', 5000.00],
    ['A0106', 6000.00],
    ['A0107', 7000.00],
    ['A0108', 8000.00],
    ['A0109', 9000.00],
    ['A0110', 10000.00],
    ['A0111', 100000.00],
    ['A0112', 22000.00],
    ['A0113', 12000.00],
    ['A0114', 13000.00],
    ['A0115', 15000.00],
    ['A0116', 10500.00],
    ['A0117', 1000.70],
    ['A0118', 1004.00],
    ['A0119', 10440.00],
    ['A0120', 1003330.00],
    ['A0121', 10050.00],
    ['A0122', 10030.30],
    ['A0123', 10.00],
    ['A0124', 100.50],
    ['A0125', 747937.20]
];

connection.query("INSERT INTO accounts (account_number, balance) VALUES ?", [dataAccounts], (error, result) => {
    if (error) throw error
    else {
        console.log(`Accounts added to the table`);
    }
});

const dataAccountsChanges = [
    ['A0101', 100.00, 'Deposit'],
    ['A0102', -400.00, 'Withdrawal'],
    ['A0103', 800.00, 'Transfer'],
    ['A0103', 10000.00, 'Transfer'],
    ['A0104', 5300.00, 'Transfer'],
    ['A0107', 300.00, 'Deposit'],
    ['A0110', 4300.00, 'Transfer'],
    ['A0109', 300.00, 'Transfer'],
    ['A0101', 8300.00, 'Transfer'],
    ['A0112', 1300.00, 'Transfer'],
    ['A0115', -1500.00, 'Withdrawal']
];

connection.query("INSERT INTO account_changes (account_number, amount, remark) VALUES ?", [dataAccountsChanges], (error, result) => {
    if (error) throw error
    else {
        console.log(`Account changes added to the table`);
    }
});


connection.end();