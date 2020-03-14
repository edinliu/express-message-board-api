/**
/:param is in params
?var=value is in query
 */
app.get('/:year/:month', (req, res) => {
  res.send(JSON.stringify(req.params) + '\n' + JSON.stringify(req.query))
})