const mysql = require('mysql');
const DB_NAME = 'userdb';

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});


const createAuthors = `
USE ${DB_NAME};
CREATE TABLE IF NOT EXISTS authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('Male', 'Female', 'Other')
  );`

executeQuery(createAuthors, `Table authors is ready`);

const addMentor = `
USE ${DB_NAME};
ALTER TABLE authors
ADD COLUMN mentor INT,
ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
`
executeQuery(addMentor, `Mentor was added`);

function executeQuery(query, message) {
    connection.query(query, (error, result) => {
        if (error) throw error
        else {
            console.log(message);
        }
    })
}

connection.end();