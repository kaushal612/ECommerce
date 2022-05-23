const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });

const connectDatabase =() =>{ mongoose.connect(process.env.MONGO_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    //  useFindAndModify: false

  
}).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("error connecting to database", err);
});
}

module.exports = connectDatabase;

