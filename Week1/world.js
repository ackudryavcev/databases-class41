const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
    multipleStatements: true
});

connection.connect();

// output results to the console
function writeResult(answer, array, secondParameter) {
    console.log(answer, ':');
    array.forEach(element => {
        if (element.Name) { console.log(element.Name) }
        if (secondParameter) { console.log(element[secondParameter]) }
    });
    console.log(`
    _________________________
    _________________________`)
}

// What are the names of countries with population greater than 8 million?
connection.query('SELECT Name, Population FROM country WHERE Population > 8000000', (error, result) => {
    if (error) throw error
    else {
        writeResult('Countries with population greater than 8 million ', result, 'Population');
    }
});

// What are the names of countries that have “land” in their names?
connection.query(`SELECT Name FROM country WHERE Name LIKE '%land%'`, (error, result) => {
    if (error) throw error
    else {
        writeResult('Countries that have “land” in their names', result);
    }
});

// What are the names of the cities with population in between 500,000 and 1 million?
connection.query(`SELECT Name, Population FROM city WHERE Population BETWEEN 500000 AND 1000000`, (error, result) => {
    if (error) throw error
    else {
        writeResult('The cities with population in between 500,000 and 1 million', result, 'Population');
    }
});

// What's the name of all the countries on the continent ‘Europe’?
connection.query(`SELECT Name FROM country WHERE Continent = 'Europe'`, (error, result) => {
    if (error) throw error
    else {
        writeResult('The countries on the continent Europe', result);
    }
});

// List all the countries in the descending order of their surface areas
connection.query(`SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC`, (error, result) => {
    if (error) throw error
    else {
        writeResult('List all the countries in the descending order of their surface areas', result, 'SurfaceArea');
    }
});

// What are the names of all the cities in the Netherlands?
connection.query(`SELECT Name FROM city WHERE CountryCode = 'NLD'`, (error, result) => {
    if (error) throw error
    else {
        writeResult('The cities in the Netherlands', result);
    }
});

// What is the population of Rotterdam?
connection.query(`SELECT Name, Population FROM city WHERE Name = 'Rotterdam'`, (error, result) => {
    if (error) throw error
    else {
        writeResult('What is the population of Rotterdam', result, 'Population');
    }
});

// What's the top 10 countries by Surface Area?
connection.query(`SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10`, (error, result) => {
    if (error) throw error
    else {
        writeResult('The top 10 countries by Surface Area', result, 'SurfaceArea');
    }
});

// What's the top 10 most populated cities?
connection.query(`SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10`, (error, result) => {
    if (error) throw error
    else {
        writeResult('The top 10 most populated cities', result, 'Population');
    }
});

// What is the population number of the world?
connection.query(`SELECT SUM(Population) AS total FROM country`, (error, result) => {
    if (error) throw error
    else {
        writeResult('The population number of the world', result, 'total');
    }
});

connection.end();