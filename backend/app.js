const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users-routes');
const profileRoutes = require('./routes/profile-routes');
const postsRoutes = require('./routes/posts-routes');

const port = 5000;
const app = express();


app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

mongoose
  .connect(
    'mongodb+srv://marko:123@cluster0-msllf.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log('Server listen on port:', port);
    })
  })
  .catch(err => {
    console.log(err);
  })