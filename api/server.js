const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const trailRoutes = require('./routes/trailRouter');
const tripsRoutes = require('./routes/tripsRouter');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userRoutes);
app.use('/trail', trailRoutes);
app.use('/trips', tripsRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
