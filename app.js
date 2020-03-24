const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());


app.listen(process.env.DEV_PORT, () => {
  console.log('Listening for Requests');
});
