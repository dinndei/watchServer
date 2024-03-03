import mongoose from 'mongoose';
export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION_ONLINE
     
    mongoose.connect(mongoURI)
        .then(suc => {
            console.log("connected ",suc.connection.host)
        })
        .catch(err => {
            console.log("error -> ", err)
        })
}

