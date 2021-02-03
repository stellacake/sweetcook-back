const express = require("express");
const router = express.Router();
const connection = require("../config");

// GET list of all tastes
router.get("/", (req, res) => {
	connection.query("SELECT * FROM taste", (err, results) => {
		if (err) {
			res.sendStatus(500);
			console.log(err);
			step;
		} else {
			res.status(200).json(results);
		}
	});
});

module.exports = router;
