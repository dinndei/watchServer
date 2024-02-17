import mongoose from 'mongoose';
export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION_ONLINE
     || "mongodb+srv://Dinn0533:d325749398++@firstdb.9dizht5.mongodb.net/";
    mongoose.connect(mongoURI)
        .then(suc => {
            console.log("connected ",suc.connection.host)
        })
        .catch(err => {
            console.log("error -> ", err)
        })
}

