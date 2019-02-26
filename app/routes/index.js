const noteRoutes = require('./note_routes');

function routes(app,db){
	noteRoutes(app,db);
}

module.exports = routes;