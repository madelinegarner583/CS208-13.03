var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('index', { title: 'My Simple TODO', todos: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* Create a new task. */
router.post('/create', function (req, res, next) {
    const { task } = req.body;
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Todo added successfully:', results);
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Error adding todo');
    }
});

/* Delete a task. */
router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo deleted successfully:', results);
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo:');
    }
});

/* Edit a task. */
router.post('/edit', function (req, res, next) {
    const { id, task } = req.body;
    try {
      req.db.query('UPDATE todos SET task = ? WHERE id = ?;', [task, id], (err, results) => {
        if (err) {
          console.error('Error updating todo:', err);
          return res.status(500).send('Error updating todo');
        }
        console.log('Todo updated successfully:', results);
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).send('Error updating todo:');
    }
});

/* Mark a task as completed. */
router.post('/complete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('UPDATE todos SET completed = 1 WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error completing todo:', err);
          return res.status(500).send('Error completing todo');
        }
        console.log('Todo completed successfully:', results);
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error completing todo:', error);
        res.status(500).send('Error completing todo:');
    }
});

module.exports = router;