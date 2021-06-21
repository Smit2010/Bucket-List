import axios from "axios";
const serverUrl = "http://127.0.0.1:5000";

export const saveUserBucketList = async (data) => {
	return axios
		.post(`${serverUrl}/save-bucket-lists/`, {
			userBucketList: data,
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
		});
};

export const getUserBucketList = async () => {
	return axios
		.get(`${serverUrl}/get-bucket-list`)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
		});
};

export const editUserBucketList = async (data) => {
	return axios
		.post(`${serverUrl}/edit-bucket-list/`, { userBucketList: data })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
		});
};

export const deleteUserBucketList = async (data) => {
	return axios
		.post(`${serverUrl}/delete-bucket-list/`, { itemId: data })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
		});
};
