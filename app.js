require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddleware = require('./middleware/authentication')

// router 
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs');
const connectDB = require('./db/connect');

app.use(express.json());
// extra packages

// routes

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authMiddleware, jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
