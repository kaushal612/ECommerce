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
    //   useFindAndModify: true

       

  
}).then(() => {
    console.log("connected to database");
})

}

module.exports = connectDatabase;

