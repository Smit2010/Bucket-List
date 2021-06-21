const mongoose = require("mongoose");
const validator = require("validator");

const userBucketList = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	wishes: [
		{
			type: String,
			required: true,
		},
	],
});

const UserBucketList = mongoose.model("UserBucketList", userBucketList);
module.exports = UserBucketList;
