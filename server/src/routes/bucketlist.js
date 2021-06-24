/**
 * Commented Code below corresponds to the usage of Mongoose
 */

const express = require("express");
const { ObjectID } = require("mongodb");
const {
	checkAndInsertConflictingBucketLists,
	updateUserBucketList,
} = require("../utils/utils");
//const UserBucketList = require("../models/bucketlist");

const router = new express.Router();

router.get("/get-bucket-list", async (req, res) => {
	try {
		// const userBucketList = await UserBucketList.find({});
		// res.send({ userBucketList });
		const dbCollection = req.app.db.collection("userbucketlists");
		let temp = [];
		let cursor = await dbCollection.find({});
		await cursor.forEach((item) => {
			temp.push(item);
		});
		res.status(200).send({ userBucketList: temp });
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/save-bucket-lists", async (req, res) => {
	try {
		let newUserBucketLists = req.body.userBucketLists;
		// const newUserBucketListObj = new UserBucketList(newUserBucketList);
		// await newUserBucketListObj.save();
		const dbCollection = req.app.db.collection("userbucketlists");
		checkAndInsertConflictingBucketLists(
			dbCollection,
			newUserBucketLists
		).then(async (conflictedBucketList) => {
			if (conflictedBucketList.length < 1) {
				//await dbCollection.insertMany(newUserBucketLists);
				res.status(200).send({
					message: "BucketList created successfully!",
					status: 200,
				});
			} else {
				res.status(200).send({
					conflictedBucketList: conflictedBucketList,
					status: 409,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

router.post("/edit-bucket-list", async (req, res) => {
	try {
		let newUserBucketList = req.body.userBucketList;
		let updateType = req.body.updateType;
		// const newUserBucketListObj = new UserBucketList(newUserBucketList);
		// await newUserBucketListObj.save();

		const dbCollection = req.app.db.collection("userbucketlists");
		updateUserBucketList(dbCollection, newUserBucketList, updateType)
			.then((data) => {
				let message = `${data} Bucket Lists updated successfully!`;
				res.status(200).send(message);
			})
			.catch((err) => {
				res.status(500).send(error);
			});
		//await dbCollection.updateOne(filter, updatedUserBucketList);
		//res.status(200).send("BucketList updated successfully!");
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/delete-bucket-list", async (req, res) => {
	try {
		//await UserBucketList.findByIdAndDelete(req.body.itemId);
		const dbCollection = req.app.db.collection("userbucketlists");
		const deleteRes = await dbCollection.deleteOne({
			_id: ObjectID(req.body.itemId),
		});
		if (deleteRes.deletedCount > 0) {
			res.status(200).send("BucketList deleted successfully!");
		} else {
			res.status(404).send("Bucket list does not exists!");
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
