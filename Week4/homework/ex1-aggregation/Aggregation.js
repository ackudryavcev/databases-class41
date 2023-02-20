require('dotenv').config();
const csv = require('csvtojson');
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URL;
const collectionName = 'DatabaseWeek4.countries';
const csvFilePath = 'population_pyramid_1950-2022.csv';

// Read the CSV file and convert it to JSON format
csv()
    .fromFile(csvFilePath)
    .then(async(jsonArray) => {
        const modifyArray = jsonArray.map(item => {
            return {
                Country: item.Country,
                Year: parseInt(item.Year),
                Age: item.Age,
                M: parseInt(item.M),
                F: parseInt(item.F)
            }
        });

        //Find a way to get the data in the csv file into your MongoDB database. 

        await addData(modifyArray);

        // Write a function that will return the array of the total population (M + F over all age groups) for a given Country per year.

        findPopulation("Netherlands");

        //Write a function that will return all of the information of each continent for a given Year and Age

        findByAgeAndYear("10-14", 2010);
    });

async function addData(jsonArray) {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection(collectionName);
        await collection.deleteMany({});
        const result = await collection.insertMany(jsonArray);
        console.log("Added ", result.insertedCount);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function findPopulation(country) {

    const agg = [{
        '$match': {
            'Country': country
        }
    }, {
        '$group': {
            '_id': '$Year',
            'countPopulation': {
                '$sum': {
                    '$add': [
                        '$M', '$F'
                    ]
                }
            }
        }
    }, {
        '$sort': {
            '_id': 1
        }
    }];

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const coll = client.db('databaseWeek4').collection(collectionName);
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    console.log(`Population in ${country} is `, result);
    await client.close();
}

async function findByAgeAndYear(age, year) {
    const agg = [{
        '$match': {
            'Country': {
                '$in': [
                    'ASIA', 'AFRICA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA'
                ]
            },
            'Year': year,
            'Age': age
        }
    }, {
        '$addFields': {
            'TotalPopulation': {
                '$sum': {
                    '$add': [
                        '$M', '$F'
                    ]
                }
            }
        }
    }];

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const coll = client.db('databaseWeek4').collection(collectionName);
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    console.log(`Results with year:${year} and age: ${age} `, result)
    await client.close();
}