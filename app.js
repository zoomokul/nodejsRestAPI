// app.js or index.js

const express = require('express');
const app = express();
const port = 3000; // You can use any port number you prefer

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your GET API!!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
