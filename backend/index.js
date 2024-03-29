const connectToMongoose = require('./connection');
const express = require('express');
const cors = require('cors')
connectToMongoose();
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json());

app.use('/auth/user', require('./routes/auth/User'));
app.use('/data/loan', require('./routes/data/Loan'));
app.use('/data/applicant', require('./routes/data/Applicant'));
app.use('/data/bank', require('./routes/data/Financial'));
app.use('/data/asset', require('./routes/data/Asset'));
app.listen(port, () => {
  console.log('port: '+port)
})