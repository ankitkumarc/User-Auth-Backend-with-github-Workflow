// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const MONGODB_URI = `mongodb+srv://${process.env.HOST_NAME}:${process.env.PASSWORD}@cluster0.d33qt96.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, options).then(function () {
    console.log("SuccessFully Connected to Database");
}).catch(function (err) {
    console.log("Error:", err.message);
});

// Use routes
app.use('/users', userRoutes);

// Use error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
