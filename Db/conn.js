const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/food';

const MongoDb = async () => {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
            console.log('Database connected');
            const fetchdata =  mongoose.connection.db.collection('food_items');
            fetchdata.find({}).toArray(
                (err, result) => {
                    const datacategory = mongoose.connection.db.collection('foodCategory');
                    datacategory.find({}).toArray((err, result1) => {
                        if(err) throw err;
                        else
                        {
                            global.food_items = result;
                            global.foodCategory = result1;
                        }
                        
                    });
                }
            );


        }).catch((err)=>{
            console.log(err);
        });
    } catch (error) {
        console.log('Error connecting to database');
        console.log(error);
    }
}


module.exports = MongoDb; 

