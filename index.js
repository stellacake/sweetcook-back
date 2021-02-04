const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const cors = require("cors");
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("http://localhost:3000/"));

app.use("/api", routes);

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`It's working ! Now running on port ${port}`);
});
