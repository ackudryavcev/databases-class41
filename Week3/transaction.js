const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});


const transactionQuery = `
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100.00
WHERE account_number = 101;

UPDATE accounts
SET balance = balance + 100.00
WHERE account_number = 102;

INSERT INTO account_changes (account_number, amount, remark)
VALUES
  (101, -100.00, 'Withdrawal'),
  (102, 100.00, 'Deposit');
SELECT @@autocommit;
COMMIT;
ROLLBACK;
`

connection.query(transactionQuery, (error, result) => {
    if (error) {
        console.log('Transaction was not successful')
        throw error
    } else {
        console.log(`Transaction was successful`);
    }
});


connection.end();