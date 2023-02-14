import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
app.use(express.json())

app.use('/user', userRoutes)

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology : true,
    useNewUrlParser : false
}).then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on PORT ${process.env.PORT} and Connected to database`)
    })
}).catch((error) => {
    console.log(error)
})




