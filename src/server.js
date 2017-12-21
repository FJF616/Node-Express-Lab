const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const STATUS_USER_ERROR = 422;

const posts = [
  {
    id: Number,
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
server.post('/posts', (req, res) => {
  posts.create({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content
  },
        (err, post) => {
          if (err) return res.status(500).send('There was a problem adding the information to the database.');
          res.status(200).send(post);
        });
});
server.get('/posts', (req, res) => {
  posts.find({}, (err, post) => {
    if (err) return res.status(422).send('error');
    res.status(201).send(posts);
  });
});
server.get('/posts/:id', (req, res) => {
  posts.find(req.params.id, (err, post) => {
    if (err) return res.status(500).send('There was a problem finding the post.');
    if (!post) return res.status(404).send('No post found.');
    res.status(200).send(post);
  });
});
server.delete('/posts/:id', (req, res) => {
  posts.find(req.params.id, (err, user) => {
    if (err) return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send(`post ${posts.id} was deleted.`);
  });
});
server.put('/posts/:id', (req, res) => {
  posts.find(req.params.id, req.body, { new: true }, (err, post) => {
    if (err) return res.status(500).send('There was a problem updating the post.');
    res.status(200).send(post);
  });
});


module.exports = { server };
