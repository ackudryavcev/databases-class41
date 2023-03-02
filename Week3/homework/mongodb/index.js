require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
    const hasCollection = await client
        .db("databaseWeek3")
        .listCollections({ name: "bob_ross_episodes" })
        .hasNext();

    if (hasCollection) {
        const document = {
                episode: "S09E13",
                title: "MOUNTAIN HIDE-AWAY",
                elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
            }
            // Add our document
        const response = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").insertOne(document);
        console.log(`Created season 9 episode 13 and the document got the id ${response.insertedId}`);
    } else {
        throw Error("The collection `bob_ross_episodes` does not exist!");
    }
    /**
     * We forgot to add the last episode of season 9. It has this information:
     *
     * episode: S09E13
     * title: MOUNTAIN HIDE-AWAY
     * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
     */

    // Write code that will add this to the collection!
}

async function findEpisodesExercises(client) {

    const hasCollection = await client
        .db("databaseWeek3")
        .listCollections({ name: "bob_ross_episodes" })
        .hasNext();

    if (hasCollection) {
        // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
        const findEpisodeWinter = { episode: "S02E02" }
        const responseWinter = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").findOne(findEpisodeWinter);
        const answerWinter = JSON.stringify(responseWinter.title);
        console.log(`The title of episode 2 in season 2 is ${answerWinter}`);

        // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
        const findEpisodeBlack = { title: "BLACK RIVER" };
        const responseBlack = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").findOne(findEpisodeBlack);
        const answerBlack = JSON.stringify(responseBlack.episode);
        console.log(`The season and episode number of the "BLACK RIVER" episode is ${answerBlack}`);

        // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
        const findCliff = { elements: "CLIFF" };
        const responseCliff = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").find(findCliff).toArray();
        const cliffEpisodes = responseCliff.map(episode => episode.title);
        console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes}`);

        // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
        const findCliffAndLighthouse = { elements: { $all: ["CLIFF", "LIGHTHOUSE"] } };
        const responseCliffAndLighthouse = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").find(findCliffAndLighthouse).toArray();
        const cliffAndLighthouseEpisodes = responseCliffAndLighthouse.map(episode => episode.title);
        console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodes}`);

    } else {
        throw Error("The collection `bob_ross_episodes` does not exist!");
    }

}

async function updateEpisodeExercises(client) {

    const hasCollection = await client
        .db("databaseWeek3")
        .listCollections({ name: "bob_ross_episodes" })
        .hasNext();

    if (hasCollection) {

        // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that

        const filter = { episode: "S30E13" };
        const update = { $set: { title: "BLUE RIDGE FALLERS" } };
        const result = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").updateOne(filter, update);
        console.log(`Ran a command to update episode 13 in season 30 and it updated ${JSON.stringify(result.matchedCount)} episodes`);

        // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
        // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
        // It should update 120 episodes!

        const filterForBushes = { elements: "BUSHES" };
        const updateForBushes = { $set: { "elements.$": "BUSH" } };
        const resultForBushes = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").updateMany(filterForBushes, updateForBushes);
        console.log(`Ran a command to update all the BUSHES to BUSH and it updated ${JSON.stringify(resultForBushes.modifiedCount)} episodes`)

    } else {
        throw Error("The collection `bob_ross_episodes` does not exist!");
    }
}

async function deleteEpisodeExercise(client) {

    const hasCollection = await client
        .db("databaseWeek3")
        .listCollections({ name: "bob_ross_episodes" })
        .hasNext();

    if (hasCollection) {
        const filter = { episode: "S31E14" }
        const result = await client
            .db("databaseWeek3")
            .collection("bob_ross_episodes").deleteOne(filter);
        console.log(`Ran a command to delete episode and it deleted ${JSON.stringify(result.deletedCount)} episodes`);

    } else {
        throw Error("The collection `bob_ross_episodes` does not exist!");
    }
    /**
     * It seems an errand episode has gotten into our data.
     * This is episode 14 in season 31. Please remove it and verify that it has been removed!
     */
}

async function main() {
    if (process.env.MONGODB_URL == null) {
        throw Error(
            `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
        );
    }
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    try {
        await client.connect();

        // Seed our database
        await seedDatabase(client);

        // CREATE
        await createEpisodeExercise(client);

        // READ
        await findEpisodesExercises(client);

        // UPDATE
        await updateEpisodeExercises(client);

        // DELETE
        await deleteEpisodeExercise(client);
    } catch (err) {
        console.error(err);
    } finally {
        // Always close the connection at the end
        client.close();
    }
}

main();


/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/