const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});


const createAccount = `
CREATE TABLE IF NOT EXISTS accounts (
    account_number VARCHAR(20) NOT NULL PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL,
    CHECK (balance >= 0)
  );  
`
connection.query(createAccount, (error, result) => {
    if (error) throw error
    else {
        console.log(`Table accounts is created`);
    }
});

const createAccountChanges = `
CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    changed_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES accounts(account_number)
  );
  `

connection.query(createAccountChanges, (error, result) => {
    if (error) throw error
    else {
        console.log(`Table accounts_changes is created`);
    }
});



connection.end();