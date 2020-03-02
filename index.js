const express = require('express');
var bodyParser = require('body-parser')
var app = express();
const Joi = require('joi');  //return a class
//先在最上方把joi引進，會回傳一個class，所以這邊大寫


//加上一個middle ware，讓app使用
// app.use(express.json());
// app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())



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
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
    return;
  }
  res.send(course);
});






const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.post('/', function (req, res) {
  console.log(req.body)
  res.send(req.body.name)
})
app.post('/api/courses', (req, res) => {
  // a schema defines the shape of our objects, 例如有沒有email, 有沒有字數限制？這裡用schema來定義新course這個object的規範
  let schema = {
    name: Joi.string().min(3).required()
  };
  let result = Joi.validate(req.body, schema);
  /* return an object that has two properties: error and value.
  Only one of them can exist.*/
  console.log(result);
  //這裡輸出result，就會知道當error時該輸出哪些錯誤訊息給用戶端↓
  //這也是Joi.js的強大與方便
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    //把error物件中適當的property輸出，提供了反映用戶API錯誤的訊息
    // status code 400 Means bad request
    return;
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});

function validateCourse(course) {
  let schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}


app.put('/api/courses/:id', (req, res) => {
  let course = courses.find(courses => courses.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
    return;
  }
  let result = validateCourse(req.body); //參數傳入req.body，一行解決

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  course.name = result.value.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  let course = courses.find(courses => courses.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
    return;
  }
  let index = courses.indexOf(course);
  /* The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.*/
  // what return is number 

  courses.splice(index, 1);
  // This method changes the contents of an array by removing existing elements and/or adding new elements.
  res.send(course); //傳給client端
});

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});