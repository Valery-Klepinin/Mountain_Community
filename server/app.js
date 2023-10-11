const path = require('path');
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT ?? 4000;

const serverConfig = require('./config/configServer');

const authRouter = require('./router/api/auth.routes');
const postRouter = require('./router/api/posts.routes');
const tracksRouter = require('./router/api/tracks.routes');
const commentsRouter = require('./router/api/comments.routes');
const favoritesRouter = require('./router/api/favorites.routes');
const ratingsRouter = require('./router/api/ratings.routes');

serverConfig(app);

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/tracks', commentsRouter);
app.use('/api/tracks/favorites', favoritesRouter);
app.use('/api/tracks/ratings', ratingsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

try {
  app.listen(PORT, () => {
    console.log(`*** Server started at ${PORT} port ***`);
  });
} catch (error) {
  console.log(error.message);
}
