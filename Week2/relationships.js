const mysql = require('mysql');

// Make a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
    multipleStatements: true // This is needed to execute multiple queries in one statement
});

const createResearchPapers = `
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


//Insert data into authors
const authors = [
    ['Stephen Hawking', 'University of Cambridge', '1942-01-08', 61, 'Male', null],
    ['Richard Feynman', 'California Institute of Technology', '1918-05-11', 29, 'Male', 1],
    ['Jane Doe', 'University of California, Berkeley', '1980-01-01', 10, 'Female', 2],
    ['Marie Curie', 'Sorbonne University', '1867-11-07', 95, 'Female', 1],
    ['Isaac Newton', 'University of Cambridge', '1642-12-25', 72, 'Male', 3],
    ['Johannes Kepler', 'University of Tübingen', '1571-12-27', 23, 'Male', 4],
    ['Galileo Galilei', 'University of Pisa', '1564-02-15', 42, 'Male', 5],
    ['René Descartes', 'University of Poitiers', '1596-03-31', 35, 'Male', 2],
    ['Mary Smith', 'Stanford University', '1985-03-20', 15, 'Female', 4],
    ['Niels Bohr', 'University of Copenhagen', '1885-10-07', 45, 'Male', 5],
    ['James Clerk Maxwell', 'University of Edinburgh', '1831-06-13', 39, 'Male', 3],
    ['Max Planck', 'University of Berlin', '1858-04-23', 59, 'Male', null],
    ['Werner Heisenberg', 'University of Munich', '1901-12-05', 33, 'Male', 10],
    ['Lisa Johnson', 'Princeton University', '1990-05-01', 20, 'Female', 9],
    ['Linus Pauling', 'Oregon State University', '1901-02-28', 54, 'Male', 5]
];

connection.query("INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?", [authors], (error, result) => {
    if (error) throw error
    else {
        console.log(`Authors added to the table`);
    }
});

const researchPapers = [
    ['A Study on Deep Learning Algorithms for Image Classification', 'International Conference on Computer Vision', '2022-01-01'],
    ['Exploring the Impact of Big Data on Business Intelligence', 'International Conference on Business Intelligence', '2022-02-01'],
    ['An Analysis of Machine Learning Techniques for Fraud Detection', 'International Conference on Fraud Detection', '2022-03-01'],
    ['Investigating the Effectiveness of Natural Language Processing for Sentiment Analysis', 'International Conference on Natural Language Processing', '2022-04-01'],
    ['A Comparative Study of Deep Reinforcement Learning Algorithms for Game Playing', 'International Conference on Games and Artificial Intelligence', '2022-05-01'],
    ['An Overview of Graph Neural Networks for Link Prediction', 'International Conference on Graph Neural Networks', '2022-06-01'],
    ['A Survey of Transfer Learning Approaches for Computer Vision Tasks', 'International Conference on Computer Vision', '2022-07-01'],
    ['An Investigation of Generative Adversarial Networks for Text Generation', 'International Conference on Natural Language Processing', '2022-08-01'],
    ['A Study of Convolutional Neural Networks for Speech Recognition', 'International Conference on Speech Recognition', '2022-09-01'],
    ['An Exploration of Reinforcement Learning for Robotics', 'International Conference on Robotics', '2022-10-01'],
    ['An Analysis of Graph Convolutional Networks for Graph Classification', 'International Conference on Graph Neural Networks', '2022-11-01'],
    ['A Survey of Attention Mechanisms in Neural Machine Translation', 'International Conference on Natural Language Processing', '2022-12-01'],
    ['A Study of Deep Learning for Recommender Systems', 'International Conference on Recommender Systems', '2022-01-02'],
    ['An Investigation of Deep Learning for Predictive Maintenance', 'International Conference on Predictive Maintenance', '2022-02-02'],
    ['A Comparative Study of Deep Reinforcement Learning Algorithms for Autonomous Driving', 'International Conference on Autonomous Driving', '2022-03-02'],
    ['An Overview of Deep Learning for Object Detection', 'International Conference on Computer Vision', '2022-04-02'],
    ['A Survey of Deep Learning for Medical Imaging', 'International Conference on Medical Imaging', '2022-05-02'],
    ['An Investigation of Deep Learning for Cybersecurity', 'International Conference on Cybersecurity', '2022-06-02'],
    ['A Study of Deep Learning for Natural Language Understanding', 'International Conference on Natural Language Processing', '2022-07-02'],
    ['An Exploration of Deep Learning for Time Series Analysis', 'International Conference on Time Series Analysis', '2022-08-02'],
    ['A Comparative Study of Deep Learning for Financial Prediction', 'International Conference on Financial Prediction', '2022-09-02'],
    ['An Analysis of Deep Learning for Sentiment Analysis in Social Media', 'International Conference on Social Media Analysis', '2022-10-02'],
    ['A Survey of Deep Learning for Predictive Modeling in Manufacturing', 'International Conference on Predictive Modeling in Manufacturing', '2022-11-02'],
    ['An Investigation of Deep Learning for Video Analytics', 'International Conference on Video Analytics', '2022-12-02'],
    ['A Study of Deep Learning for Music Generation', 'International Conference on Music Generation', '2022-01-03'],
    ['An Overview of Deep Learning for Recommendation in E-commerce', 'International Conference on E-commerce Recommendation', '2022-02-03'],
    ['A Comparative Study of Deep Learning for Image Segmentation', 'International Conference on Image Segmentation', '2022-03-03'],
    ['An Analysis of Deep Learning for Fraud Detection in Banking', 'International Conference on Banking Fraud Detection', '2022-04-03'],
    ['A Survey of Deep Learning for Predictive Maintenance in Aerospace', 'International Conference on Predictive Maintenance in Aerospace', '2022-05-03'],
    ['An Investigation of Deep Learning for Speech Synthesis', 'International Conference on Speech Synthesis', '2022-06-03']
];

connection.query("INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ?", [researchPapers], (error, result) => {
    if (error) throw error
    else {
        console.log(`Research papers added to the table`);
    }
});

// Table for connection between research and authors

const createAuthorsOfPapers = `
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

const AuthorsOfPapers = [
    [1, 4],
    [1, 5],
    [1, 6],
    [2, 1],
    [3, 11],
    [4, 15],
    [5, 3],
    [6, 8],
    [6, 9],
    [7, 2],
    [8, 7],
    [9, 10],
    [10, 11],
    [11, 14],
    [12, 4],
    [13, 6],
    [14, 2],
    [15, 14],
    [16, 3],
    [17, 15],
    [18, 7],
    [19, 8],
    [20, 4],
    [21, 14],
    [22, 12],
    [23, 1],
    [24, 1],
    [25, 6],
    [27, 7],
    [28, 1],
    [29, 8],
    [30, 10],
    [30, 4],
    [30, 2]
];

connection.query("INSERT INTO research_author (paper_id, author_id) VALUES ?", [AuthorsOfPapers], (error, result) => {
    if (error) throw error
    else {
        console.log(`Authors of papers added to the table`);
    }
});

connection.end();