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
    [101, 1000.00],
    [102, 2000.00],
    [103, 3000.00],
    [104, 4000.00],
    [105, 5000.00],
    [106, 6000.00],
    [107, 7000.00],
    [108, 8000.00],
    [109, 9000.00],
    [110, 10000.00],
    [111, 100000.00],
    [112, 22000.00],
    [113, 12000.00],
    [114, 13000.00],
    [115, 15000.00],
    [116, 10500.00],
    [117, 1000.70],
    [118, 1004.00],
    [119, 10440.00],
    [120, 1003330.00],
    [121, 10050.00],
    [122, 10030.30],
    [123, 10.00],
    [124, 100.50],
    [125, 747937.20]
];

connection.query("INSERT INTO accounts (account_number, balance) VALUES ?", [dataAccounts], (error, result) => {
    if (error) throw error
    else {
        console.log(`Accounts added to the table`);
    }
});

const dataAccountsChanges = [
    [101, 100.00, 'Deposit'],
    [102, -400.00, 'Withdrawal'],
    [103, 800.00, 'Transfer'],
    [103, 10000.00, 'Transfer'],
    [104, 5300.00, 'Transfer'],
    [107, 300.00, 'Deposit'],
    [110, 4300.00, 'Transfer'],
    [109, 300.00, 'Transfer'],
    [101, 8300.00, 'Transfer'],
    [112, 1300.00, 'Transfer'],
    [115, -1500.00, 'Withdrawal']
];

connection.query("INSERT INTO account_changes (account_number, amount, remark) VALUES ?", [dataAccountsChanges], (error, result) => {
    if (error) throw error
    else {
        console.log(`Account changes added to the table`);
    }
});


connection.end();