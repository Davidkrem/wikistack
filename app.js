const express = require('express');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wikiRouter);

//TO BE FIXED
app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 3000;
const init = async () => {
  // await db.sync({ force: true });
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Server is listening on port localhost:${PORT}`);
  });
};

init();
