const { ObjectID } = require("mongodb");

const checkAndInsertConflictingBucketLists = async (
	collection,
	newUserBucketLists
) => {
	let conflictedBucketList = [];
	for (let i = 0; i < newUserBucketLists.length; i++) {
		const data = await collection.find(
			{ name: newUserBucketLists[i].name },
			{ name: 1, wishes: 1 }
		);
		if ((await data.count()) > 0) {
			await data.forEach((item) => {
				conflictedBucketList.push(item);
			});
		} else {
			await collection.insertOne(newUserBucketLists[i]);
		}
	}
	return conflictedBucketList;
};

const updateUserBucketList = async (
	collection,
	newUserBucketList,
	updateType
) => {
	let modifiedDocs = 0;
	for (let i = 0; i < newUserBucketList.length; i++) {
		const filter = { _id: ObjectID(newUserBucketList[i].itemId) };
		let updatedUserBucketList;
		if (updateType === "overwrite") {
			updatedUserBucketList = {
				$set: {
					name: newUserBucketList[i].name,
					wishes: newUserBucketList[i].wishes,
				},
			};
		} else {
			updatedUserBucketList = {
				$set: {
					name: newUserBucketList[i].name,
				},
				$push: {
					wishes: {
						$each: newUserBucketList[i].wishes,
					},
				},
			};
		}
		let res = await collection.updateOne(filter, updatedUserBucketList);
		modifiedDocs += res.modifiedCount;
	}
	return modifiedDocs;
};

exports.checkAndInsertConflictingBucketLists =
	checkAndInsertConflictingBucketLists;

exports.updateUserBucketList = updateUserBucketList;
