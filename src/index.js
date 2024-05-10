const express = require('express');
const routes = require('./controller/routes');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log("Server Already")
})
