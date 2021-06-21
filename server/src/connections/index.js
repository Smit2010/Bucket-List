//const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const mongodb_url = process.env.MONGODB_URL

// mongoose.connect(mongodb_url, {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// });

const connectToDB = async () => {
	const client = new MongoClient(mongodb_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		if (client.isConnected()) {
			return client.db("test");
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectToDB;
