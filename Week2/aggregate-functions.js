const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});



// All research papers and the number of authors that wrote that paper.

const numOfPapers = `
SELECT a1.paper_title AS Paper_name, COUNT(a2.author_id) AS Quantity
FROM research_Papers a1
LEFT JOIN research_author a2 ON a1.paper_id = a2.paper_id
GROUP BY paper_title
`;

connection.query(numOfPapers, (error, result) => {
    if (error) throw error
    else {
        console.log(`All research papers and the number of authors:`);
        console.log(result);
    }
});


//Sum of the research papers published by all female authors.

const sumFemalePapers = `
SELECT COUNT(a1.paper_title) AS Number_of_papers
FROM research_Papers a1
LEFT JOIN research_author a2  ON a1.paper_id = a2.paper_id
LEFT JOIN authors a3 ON a2.author_id = a3.author_id
WHERE a3.gender = "Female"
`;

connection.query(sumFemalePapers, (error, result) => {
    if (error) throw error
    else {
        console.log(`Sum of the research papers published by all female authors:`);
        console.log(result);
    }
});

// Average of the h-index of all authors per university.

const averageIndex = `
SELECT university, AVG(h_index)
FROM authors
GROUP BY university
`;

connection.query(averageIndex, (error, result) => {
    if (error) throw error
    else {
        console.log(`Average of the h-index of all authors per university:`);
        console.log(result);
    }
});

//Sum of the research papers of the authors per university.

const SumOfPapers = `
SELECT a1.university, COUNT(a2.paper_id) AS total_papers
FROM authors a1
LEFT JOIN research_author a2 ON a2.author_id = a1.author_id
GROUP BY a1.university;
`
connection.query(SumOfPapers, (error, result) => {
    if (error) throw error
    else {
        console.log(`Sum of the research papers of the authors per university:`);
        console.log(result);
    }
});

//Minimum and maximum of the h-index of all authors per university.

const minAndMax = `
SELECT university, MIN(h_index), MAX(h_index)
FROM authors
GROUP BY university
`

connection.query(minAndMax, (error, result) => {
    if (error) throw error
    else {
        console.log(`Minimum and maximum of the h-index of all authors per university:`);
        console.log(result);
    }
});


connection.end();