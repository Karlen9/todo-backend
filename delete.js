


app.delete('/:id', (req, res) => {
    tasks = tasks.filter(e => e.id !== req.params.id);
  
    res.send(tasks);
  })