import express from 'express';

const app = express();

// we are creating middleware here
app.use('/', (req, res, next) => {
  res.send('Hello Saanand');
});

app.listen(5000);
