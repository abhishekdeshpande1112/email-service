const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const emailRouter = require('./routes/emailRouter');
const app = express();

app.listen(process.env.port || 3000);
console.log('Server listening at : 3000');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(cors());
app.use('/v1', emailRouter);
