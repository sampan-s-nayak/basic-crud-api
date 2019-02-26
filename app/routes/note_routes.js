/*
 * all routes of a CRUD app have been implemented
 * C -> Create -> post
 * R -> Read   -> get
 * U -> update -> put
 * D -> Delete -> delete
 */

const ObjectId = require("mongodb").ObjectID;

function routes(app,db){
	//get an entry
	app.get('/notes/:id',(req,res)=>{
		let key = { '_id':new ObjectId(req.params.id)}; 
		db.collection('notes').findOne(key,(err,data)=>{
			if(err) {
				res.send({'error':'an error has occured'});
			}
			else{
			res.send(data);
		}});
	});

	//delete an entry
	app.delete('/notes/:id',(req,res)=>{
		const id = req.params.id;
		const key = { '_id':new ObjectId(id)}; 
		db.collection('notes').remove(key,(err,data)=>{
			if(err) {
				res.send({'error':'an error has occured'});
			}
			else{
			res.send(`entry with ${id} deleted`);
		}});
	});

	//creates an entry
	app.post('/notes',(req,res)=>{
		let note = req.body;
		db.collection('notes').insert(note,(err,result)=>{
			if (err){
				res.send({ 'error':'an error has occured'})
			} 
			else{
				res.send(result.ops[0]);
			} 
		});
	});

	//updating an entry
	app.put('/notes/:id',(req,res)=>{
		let note = req.body;
		let key = { '_id':new ObjectId(req.params.id)}; 
		db.collection('notes').update(key,note,(err,data)=>{
			if(err) {
				res.send({'error':'an error has occured'});
			}
			else{
			res.send(data);
		}});
	});
}

module.exports = routes;