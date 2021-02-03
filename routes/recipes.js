const express = require("express");
const router = express.Router();
const connection = require("../config");

//GET list of all recipes
router.get("/", (req, res) => {
	connection.query(
		"SELECT recipe.id AS id_recipe, recipe.title, recipe.quantity, recipe.picture, recipe.duration, level.name AS level, taste.name AS taste, user.id AS id_user, user.name, DATE_FORMAT(user_recipe.date, '%d/%m/%Y') AS date FROM recipe JOIN level ON level.id=recipe.level_id JOIN taste ON taste.id=recipe.taste_id JOIN user_recipe ON user_recipe.recipe_id=recipe.id JOIN user ON user.id=user_recipe.user_id ORDER BY recipe.title",
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

//GET list of lastest recipes
router.get("/latest", (req, res) => {
	connection.query(
		"SELECT recipe.id AS id_recipe, recipe.title, recipe.quantity, recipe.picture, recipe.duration, level.name AS level, taste.name AS taste, user.id AS id_user, user.name, DATE_FORMAT(user_recipe.date, '%d/%m/%Y') AS date FROM recipe JOIN level ON level.id=recipe.level_id JOIN taste ON taste.id=recipe.taste_id JOIN user_recipe ON user_recipe.recipe_id=recipe.id JOIN user ON user.id=user_recipe.user_id ORDER BY YEAR(user_recipe.date) DESC, MONTH(user_recipe.date) DESC, DAY(user_recipe.date) DESC LIMIT 3",
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

//GET one recipe details
router.get("/:id", (req, res) => {
	connection.query(
		"SELECT recipe.id AS id_recipe, recipe.title, recipe.quantity, recipe.picture, recipe.duration, level.name AS level, taste.name AS taste, user.id AS id_user, user.name, DATE_FORMAT(user_recipe.date, '%d/%m/%Y') AS date, recipe.ingredient_1, recipe.ingredient_2, recipe.ingredient_3, recipe.ingredient_4, recipe.ingredient_5, recipe.ingredient_6, recipe.ingredient_7, recipe.ingredient_8, recipe.ingredient_9, recipe.ingredient_10, recipe.step_1, recipe.step_2, recipe.step_3, recipe.step_4, recipe.step_5, recipe.step_6, recipe.step_7, recipe.step_8, recipe.step_9, recipe.step_10 FROM recipe JOIN level ON level.id=recipe.level_id JOIN taste ON taste.id=recipe.taste_id JOIN user_recipe ON user_recipe.recipe_id=recipe.id JOIN user ON user.id=user_recipe.user_id WHERE recipe.id=?",
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

// POST one recipe
router.post("/", (req, res) => {
	const {
		title,
		picture,
		duration,
		level_id,
		taste_id,
		ingredient_1,
		ingredient_2,
		ingredient_3,
		ingredient_4,
		ingredient_5,
		ingredient_6,
		ingredient_7,
		ingredient_8,
		ingredient_9,
		ingredient_10,
		step_1,
		step_2,
		step_3,
		step_4,
		step_5,
		stept_6,
		step_7,
		step_8,
		step_9,
		step_10,
	} = req.body;
	connection.query(
		"INSERT INTO recipe(title, picture, duration, level_id, taste_id, ingredient_1, ingredient_2, ingredient_3, ingredient_4, ingredient_5, ingredient_6, ingredient_7, ingredient_8, ingredient_9, ingredient_10, step_1, step_2, step_3, step_4, step_5, step_6, step_7, step_8, step_9, step_10) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			title,
			picture,
			duration,
			level_id,
			taste_id,
			ingredient_1,
			ingredient_2,
			ingredient_3,
			ingredient_4,
			ingredient_5,
			ingredient_6,
			ingredient_7,
			ingredient_8,
			ingredient_9,
			ingredient_10,
			step_1,
			step_2,
			step_3,
			step_4,
			step_5,
			stept_6,
			step_7,
			step_8,
			step_9,
			step_10,
		],
		(err, results) => {
			if (err) {
				res.sendStatus(err);
			} else {
				return connection.query(
					"SELECT * FROM recipe WHERE id = ?",
					results.insertId,
					(err2, records) => {
						if (err2) {
							return res.status(500).json({
								error: err2.message,
								sql: err2.sql,
							});
						}
						const insertedrecipe = records[0];
						const { ...recipe } = insertedrecipe;
						const host = req.get("host");
						const location = `http://${host}${req.url}/${recipe.id}`;
						return res.status(201).set("Location", location).json(recipe);
					}
				);
			}
		}
	);
});

// PUT one recipe
router.put("/:id", (req, res) => {
	const id_recipe = req.params.id;
	const new_recipe = req.body;
	connection.query(
		"UPDATE recipe SET ? WHERE id = ?",
		[new_recipe, id_recipe],
		(err, _) => {
			if (err) {
				res.sendStatus(err);
			} else {
				return connection.query(
					"SELECT * FROM recipe WHERE id = ?",
					results.insertId,
					(err2, records) => {
						if (err2) {
							return res.status(500).json({
								error: err2.message,
								sql: err2.sql,
							});
						}
						const insertedrecipe = records[0];
						const { ...recipe } = insertedrecipe;
						const host = req.get("host");
						const location = `http://${host}${req.url}/${recipe.id}`;
						return res.status(201).set("Location", location).json(recipe);
					}
				);
			}
		}
	);
});

// DELETE one recipe
router.delete("/:id", (req, res) => {
	connection.query(
		"DELETE FROM recipe WHERE id=?",
		[req.params.id],
		(err, _) => {
			if (err) {
				res.sendStatus(err);
			} else {
				res.status(200).send("Data well deleted");
			}
		}
	);
});

module.exports = router;
