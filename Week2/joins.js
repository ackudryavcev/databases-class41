const mysql = require('mysql');
const DB_NAME = 'userdb';

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});

// Write a query that prints names of all authors and their corresponding mentors.

const namesAuthors = `
USE ${DB_NAME};
SELECT a1.author_name AS author, a2.author_name AS mentor
FROM authors a1
LEFT JOIN authors a2
ON a1.mentor = a2.author_id;
`;

connection.query(namesAuthors, (error, result) => {
    if (error) throw error
    else {
        console.log(`Authors and their corresponding mentors:`);
        console.log(result);
    }
});

// Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.

const authorsAndPapers = `
USE ${DB_NAME};
SELECT authors.*, research_papers.paper_title
FROM authors
LEFT JOIN research_author ON authors.author_id = research_author.author_id
LEFT JOIN research_papers ON research_author.paper_id = research_papers.paper_id;
`;

connection.query(authorsAndPapers, (error, result) => {
    if (error) throw error
    else {
        console.log(`Authors and their published paper_title:`);
        console.log(result);
    }
});

connection.end();