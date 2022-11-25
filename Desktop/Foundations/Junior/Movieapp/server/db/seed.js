const dbConnection = require("./index").dbConnection;


const runSeed = async () => {
    await dbConnection.sync({ force: true });
    console.log("Seed os complete!");
    process.kill(0);
};

runSeed();


