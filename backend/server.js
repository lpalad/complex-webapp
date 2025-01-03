const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'mysql-sydney-primary.cn0gigquicc1.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'formdata'
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO submissions (name, email) VALUES (?, ?)';
  
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error saving data' });
    } else {
      res.json({ message: 'Data saved successfully' });
    }
  });
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Server running on port 3001');
});
