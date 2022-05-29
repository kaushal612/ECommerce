const { Z_ASCII } = require("zlib");
const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
//Handling Uncaught Exception

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: ", err.name, err.message);
    process.exit(1);
});



//config
dotenv.config({path:"backend/config/config.env"});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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
