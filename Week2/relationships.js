const mysql = require('mysql');
const DB_NAME = 'userdb'
const { authors, researchPapers, AuthorsOfPapers } = require("./data")

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});

const createResearchPapers = `
USE ${DB_NAME};
CREATE TABLE IF NOT EXISTS research_Papers(
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255) NOT NULL, 
    conference VARCHAR(255),
    publish_date DATE
)
`;

connection.query(createResearchPapers, (error, result) => {
    if (error) throw error
    else {
        console.log(`Table research_Papers is ready`);
    }
});


connection.query(`USE ${DB_NAME}; INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?`, [authors], (error, result) => {
    if (error) throw error
    else {
        console.log(`Authors added to the table`);
    }
});


connection.query(`USE ${DB_NAME}; INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ?`, [researchPapers], (error, result) => {
    if (error) throw error
    else {
        console.log(`Research papers added to the table`);
    }
});

// Table for connection between research and authors

const createAuthorsOfPapers = `
USE ${DB_NAME};
CREATE TABLE research_author (
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  );`

connection.query(createAuthorsOfPapers, (error, result) => {
    if (error) throw error
    else {
        console.log(`Table research_author is ready`);
    }
});


connection.query(`USE ${DB_NAME}; INSERT INTO research_author (paper_id, author_id) VALUES ?`, [AuthorsOfPapers], (error, result) => {
    if (error) throw error
    else {
        console.log(`Authors of papers added to the table`);
    }
});

connection.end();