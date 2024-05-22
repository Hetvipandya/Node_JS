const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
// require('dotenv').config();

app.get('/', (req, res) => { 
	res.send('A simple Node JS is '
		+ 'running on this server') 
	res.end() 
})

app.use(express.json());

app.use('/api', userRoutes);

const DB = "mongodb://mongoadmin:mongoadmin@localhost:27017/userdb?authSource=admin";

mongoose.connect(DB).then(() => {
	console.log('DB connection successful')
});


const PORT = 5000;
app.listen(PORT,console.log(
`Server started on port ${PORT}`));
