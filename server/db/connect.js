const mongoose = require('mongoose');


const connectString = 'mongodb+srv://admin:admin123@cluster0.r4kpsbp.mongodb.net/crud-app?retryWrites=true&w=majority'

const connectDB = async  () => {
    try {
        
        const con = await mongoose.connect(connectString)
        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err) {
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDB