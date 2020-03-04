// app.get('/api/courses/:id', (req, res) => {
//   let course = courses.find(i => i.id === parseInt(req.params.id))
//   course ? res.send(course) : res.status(404).send('The course with the given ID was not found')
// })
// app.get('/api/courses/:id', (req, res) => {
//   let id = req.params.id
//   res.send(courses[id]);
// });

app.post('/api/courses', (req, res) => {
  let schema = {
    name: Joi.string().min(3).required()
  };
  let result = Joi.validate(req.body, schema)
  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return
  }
  let course = {
    name: req.body.name
  }
  datas.push(req.body);
  res.send(datas);
})