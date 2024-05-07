const express = require('express');
const routes = require('./routes')
const app = express();
const PORT = 3005;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log("Server Already!")
})