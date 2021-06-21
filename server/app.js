const express = require("express");
//require("./src/db/mongoose");
const connectToDB = require("./src/connections");
const bucketListRouter = require("./src/routes/bucketlist");

const cors = require("cors");

const app = express();
const port = process.env.PORT;

connectToDB().then((db = null) => {
	if (db) {
		app.db = db;
	} else {
		console.error("Unable to connect to DB!");
	}
});

app.use(cors());
app.use(express.json());
app.use(bucketListRouter);
app.use((req, res) => {
	return res.status(404).json({ message: "Page Not Found!" });
});

app.listen(port, () => console.log("Server running on port", port, "..."));
