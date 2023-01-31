const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});

// function for execution sql query
function mySqlQuery(query, message) {
    connection.query(query, (error, result) => {
        if (error) throw error;
        console.log(message);
    });
}

//function for putting data in tables
function putDataToTable(query, array, message) {
    connection.query(query, [array], function(error, results, fields) {
        if (error) throw error;
        console.log(message);
    })

}

// Check existing the meetup database
mySqlQuery('DROP DATABASE IF EXISTS meetup', 'Successfully deleted the meetup database');


// Create the meetup database
mySqlQuery('CREATE DATABASE meetup', 'Successfully created the meetup database');

// Connect to the meetup database
mySqlQuery('USE meetup', 'Success. Use meetup');


// Create the Invitee table
mySqlQuery(`
CREATE TABLE IF NOT EXISTS Invitee (
  invitee_no INT AUTO_INCREMENT PRIMARY KEY,
  invitee_name VARCHAR(255) NOT NULL,
  invited_by VARCHAR(255) NOT NULL
)`, 'Successfully created the Invitee table');


// Create the Room table
mySqlQuery(`
CREATE TABLE IF NOT EXISTS Room (
  room_no INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(255) NOT NULL,
  floor_number INT NOT NULL
)`, 'Successfully created the Room table');


// Create the Meeting table
mySqlQuery(`
CREATE TABLE IF NOT EXISTS Meeting (
  meeting_no INT AUTO_INCREMENT PRIMARY KEY,
  meeting_title VARCHAR(255) NOT NULL,
  starting_time TIMESTAMP NOT NULL,
  ending_time TIMESTAMP NOT NULL,
  room_no INT NOT NULL,
  FOREIGN KEY (room_no) REFERENCES Room(room_no)
)`, 'Successfully created the Meeting table');


//Insert data into Invitee table
const invitees = [
    [1, 'John Doe', 'Jane Doe'],
    [2, 'Jane Smith', 'John Smith'],
    [3, 'Michael Johnson', 'Sarah Johnson'],
    [4, 'Emily Brown', 'David Brown'],
    [5, 'William Davis', 'Emily Davis']
];

putDataToTable("INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES ?", invitees, "Data inserted into Invitee table");


//Insert data into Room table
const rooms = [
    [1, 'Conference Room 1', 10],
    [2, 'Conference Room 2', 20],
    [3, 'Conference Room 3', 30],
    [4, 'Conference Room 4', 40],
    [5, 'Conference Room 5', 50]
];

putDataToTable("INSERT INTO Room (room_no, room_name, floor_number) VALUES ?", rooms, "Data inserted into Room table");


//Insert data into Meeting table
const meetings = [
    [1, 'Team Meeting', '2023-01-29 10:00:00', '2023-01-29 12:00:00', 1],
    [2, 'Project Discussion', '2023-01-30 09:00:00', '2023-01-30 11:00:00', 2],
    [3, 'Client Meeting', '2023-02-01 14:00:00', '2023-02-01 16:00:00', 3],
    [4, 'Performance Review', '2023-02-02 10:00:00', '2023-02-02 12:00:00', 4],
    [5, 'Annual General Meeting', '2023-02-03 09:00:00', '2023-02-03 11:00:00', 5]
];

putDataToTable("INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ?", meetings, "Data inserted into Meeting table");

connection.end();