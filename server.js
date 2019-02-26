const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');
const routes      = require('./app/routes/index');

const app = express();

// express cannot understand url parameters on its own
app.use(bodyParser.urlencoded({ extended:true }));

const port = 8000;

// mongo db link
MongoClient.connect(db.url,{ useNewUrlParser: true },(err,database)=>{
	if(err) return console.log(err);
	//required due to an update
	const db = database.db();
	routes(app,db);
	app.listen(port,()=>{
		console.log(`listening on port: ${port}`);
	})
})