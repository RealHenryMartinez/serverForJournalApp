// import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import your Journal
const Journal = require('./Models/Journal');

// Models / Schemas
const port = process.env.PORT;
const MongoClient = require('mongodb').MongoClient;
// Getting mongo URI
const uri = process.env.MONGO_URI;
const server = express();
const app = new express();

//Middle / can add data to our app
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// adding id 


// Connection with MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
// instance
db.on('error', console.error.bind(console, 'Failed to Connect to MongoDB'));
db.once('open', () => {
	console.log('Connection to MongoDB established');
});

// Sending requests to the server and responses from server/ Routes 
// Post request -> sending data to server
server.post('/add-journal', (req, res) => {
	// incoming data / data sent to server
	
	// .body -> house the json data coming from post man or react.js app
	const incomingData = req.body;
	// making a new journal from Journal Model (schema)
	const newJournal = new Journal(incomingData);
	// const id = new mongoose.Types.ObjectId();
	// const newId = ObjectId(id)
// save your data from mongoose 
	newJournal.save((err, result) => {
// handling error
		if (err) {
			res.status(500).send({
				msg: 'Error in the server'
			})
		}
// else here
		res.status(200).send({
			msg: 'journal was created',
			
			document: result,
			// id: id,
		});
	})
});

server.get('/get-all-journals', (req, res) => {
	// main journal database / find any journal available
	Journal.find({  }, (err, result) => {
		if(err) {
			res.status(500).send({
				msg: 'No Journals Found'
			});
		}
		
		res.status(200).send({
			msg: 'Journals Found',
			document: result
			
		})
	})
});
// deleting journals
server.delete('/delete-journal/:id', (req, res) =>{
	const id = req.params.id

	console.log(id);

	Journal.deleteOne({_id: id}, (err, result) => {
		if (err) throw err;

		console.log("journal deleted");

		res.json(result);
	})
});
   
// 	const incomingData = req.body;
// 	// making a new journal from Journal Model (schema)
// 	const newJournal = new Journal(incomingData);
// // save your data from mongoose 
// 	newJournal.save((err, result) => {
// // handling error
// 		if (err) {
// 			res.status(500).send({
// 				msg: 'Error in the server'
// 			})
// 		}
// // else here
// 		res.status(200).send({
// 			msg: 'journal was deleted',
// 			document: result
// 		});
// 	})
	// Previous code / Sketch
	// Gets the data from method post, data sent from Postman
//     const id = "62c12b3cfd0fb2a58bf1a3eb"
// 	;
//     // Adds journal to the mongodb
//     db.collection
    
// });


// Index route
server.get('/', (req,res) => {
	res.status(200).send({
		msg: 'Server is running'
	})

});

server.listen(port, () => {
	console.log('Listening on port', port);
});