require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); 

const dbConnect = require('./config/dbConnect');
const globalErrorHandler = require('./middlewares/globalErrorHandler');


dbConnect();


const app = express();

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'server of mytaskmanager is up and running successfully'
    })
});

app.use(express.json());

app.use(userRoutes);
app.use(taskRoutes);
app.use(cors({
    origin: '*'
}));
app.use(globalErrorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
});

