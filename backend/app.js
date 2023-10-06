import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';

const app = express();
app.use('/api/user', router);

mongoose
  .connect(
    'mongodb+srv://admin:admin@blogcluster.idx3mwu.mongodb.net/Blog?retryWrites=true&w=majority'
  )
  .then(() => app.listen(5000))
  .then(() => console.log('Connected to DB and Listening port : 5000'))
  .catch((err) => console.log(err));
