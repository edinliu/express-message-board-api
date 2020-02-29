const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});
app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3, 4]);
});

app.get(' :year/:month', (req, res) => {
  // res.send(req.params);
  res.send(req.query);
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];
// app.get('/api/courses/:id', (req, res) => {
//   let a = parseInt(req.params.id) * 2
//   res.send(a.toString());
// });

// app.get('/api/courses/:id', (req, res) => {
//   let id = req.params.id
//   res.send(courses[id]);
// });
app.get('/api/courses/:id', (req, res) => {
  let course = courses.find(
    courses => courses.id === parseInt(req.params.id)
  );
  res.send(course);
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});