const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});


const createAuthors = `
CREATE TABLE IF NOT EXISTS authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('Male', 'Female', 'Other')
  );`

connection.query(createAuthors, (error, result) => {
    if (error) throw error
    else {
        console.log(`Table authors is ready`);
    }
});

const addMentor = `
ALTER TABLE authors
ADD COLUMN mentor INT,
ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
`
connection.query(addMentor, (error, result) => {
    if (error) throw error
    else {
        console.log(`Mentor was added`);
    }
});

connection.end();