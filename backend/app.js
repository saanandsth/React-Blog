import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRouter from './routes/blog-router';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', router);
app.use('/api/blog', blogRouter);

mongoose
  .connect(
    'mongodb+srv://admin:admin@blogcluster.idx3mwu.mongodb.net/Blog?retryWrites=true&w=majority'
  )
  .then(() => app.listen(5000))
  .then(() => console.log('Connected to DB and Listening port : 5000'))
  .catch((err) => console.log(err));
