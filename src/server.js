const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();
const STATUS_USER_ERROR = 422;

const posts = [
  {
    title: String,
    content: String
  }
];
server.use(bodyParser.json());

server.listen(5001, () => {
  console.log('running on 5001');
});


server.use((req, res, next) => {
  console.log('hello');
  next();
});
// server.get('/posts', (req, res) => {
//   res.json({ message: 'hooray!' });
// });


let id = 0;
server.post('/posts', (req, res) => {
  if (!req.body.title && !req.body.contents) res.status(422).json({ error: 'Error message' });
  posts.push(Number(id++));
  res.status(201).json({ posts: id });
});


server.get('/posts/:term?', (req, res) => {
  const term = req.params.term;
  const hasTerm = function (item) {
    if ((posts.title === term && posts.contents === term) || (posts.title === term || posts.contents === term)) return true;
  };
  const newArr = posts.filter(hasTerm(term));
  res.status(200).json({ newArr });
});

server.get('*', (req, res) => {
  res.status(201).json({ posts });
});
// delete
server.delete('/posts/:id?', (req, res) => {
  posts.find(req.params.id, (err, user) => {
    if (err) return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send(`post ${posts.id} was deleted.`);
  });
});
// update
server.put('/posts/:id?/:title?/:content?', (req, res) => {
  const modPost = req.body;

  if (!(id in posts)) res.status(422).json({ error: 'Error message' });
  posts.push(modPost);
  fs.appendFile('posts.json', JSON.stringify(modPost));
  res.status(201).json({ posts });
});
module.exports = { server };
