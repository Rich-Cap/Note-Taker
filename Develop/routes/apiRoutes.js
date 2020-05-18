const db = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
	app.get("/api/notes", function (req, res) {
		// console.log(db);
		res.json(db);
	});
	app.post("/api/notes", (req, res) => {
		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) throw err;

			const db = JSON.parse(data);
			const newDB = [];
			db.push(req.body);
			for (let i = 0; i < db.length; i++) {
				const newNote = {
					id: i,
					title: db[i].title,
					text: db[i].text
				};
				newDB.push(newNote);
			}
			fs.writeFile("./db/db.json", JSON.stringify(newDB, null, 2), (err) => {
				if (err) throw err;

				res.json(newDB);
				console.log("Created New Note!")
			});
		});
	});
	app.delete("/api/notes/:id", (req, res) => {
		let noteId = req.params.id;

		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) throw err;

			const notes = JSON.parse(data);
			const newNotes = notes.filter(note => note.id != noteId);
			fs.writeFile("./db/db.json", JSON.stringify(newNotes, null, 2), err => {
				if (err) throw err;
				res.send(db);
				console.log("Note Deleted!")
			});
		});
	});
};