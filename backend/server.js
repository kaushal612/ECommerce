const { Z_ASCII } = require("zlib");
const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: ", err.name, err.message);
    process.exit(1);
});



//config
dotenv.config({path:"backend/config/config.env"});


connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});



//unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down server");
    
    server.close(() => {
        process.exit(1);
    }
    );
});
