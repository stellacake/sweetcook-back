const express = require("express");
const router = express.Router();
const connection = require("../config");

// GET list of all users
router.get("/", (req, res) => {
	connection.query("SELECT id, name, email FROM user", (err, results) => {
		if (err) {
			res.sendStatus(500);
			console.log(err);
			step;
		} else {
			res.status(200).json(results);
		}
	});
});

// GET list of all recipes of one user
router.get("/:id/recipes", (req, res) => {
	connection.query(
		"SELECT recipe.id AS id_recipe, recipe.title, recipe.quantity, recipe.picture, recipe.duration, level.name AS level, taste.name AS taste, user.id AS id_user, user.name, DATE_FORMAT(user_recipe.date, '%d/%m/%Y') AS date FROM recipe JOIN level ON level.id=recipe.level_id JOIN taste ON taste.id=recipe.taste_id JOIN user_recipe ON user_recipe.recipe_id=recipe.id JOIN user ON user.id=user_recipe.user_id WHERE user.id=?",
		[req.params.id],
		(err, results) => {
			if (err) {
				res.sendStatus(500);
				console.log(err);
				step;
			} else {
				res.status(200).json(results);
			}
		}
	);
});

// POST one recipe as a user
router.post("/recipes", (req, res) => {
	const { user_id, recipe_id, date } = req.body;
	connection.query(
		"INSERT INTO user_recipe(user_id, recipe_id, date) VALUES(?, ?, ?)",
		[user_id, recipe_id, date],
		(err, results) => {
			if (err) {
				res.sendStatus(err);
			} else {
				return connection.query(
					"SELECT * FROM user_recipe WHERE id = ?",
					results.insertId,
					(err2, records) => {
						if (err2) {
							return res.status(500).json({
								error: err2.message,
								sql: err2.sql,
							});
						}
						const insertedUserrecipe = records[0];
						const { ...user_recipe } = insertedUserrecipe;
						const host = req.get("host");
						const location = `http://${host}${req.url}/${user_recipe.id}`;
						return res.status(201).set("Location", location).json(user_recipe);
					}
				);
			}
		}
	);
});

module.exports = router;
