require('dotenv').config()

const express  = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routers/user')
const authRoute = require('./routers/auth')
const productRoute = require('./routers/product')
const cartRoute = require('./routers/cart')
const orderRoute = require('./routers/order')
const stripeRoute = require('./routers/stripe')
const cors = require('cors')


mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ygpcw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).
    then(() => console.log(`db connection is successfull`)).
    catch(err => console.log(err))

const port = process.env.PORT || 8080
app.use(cors(
    {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        exposedHeaders: ['authorization'],
    } 
))
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);



app.listen(port, () => {
    console.log(`api is running on port ${port}`)
})