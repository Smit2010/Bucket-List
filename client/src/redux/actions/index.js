export const submitWishes = (data) => {
	return {
		type: "SUBMIT_WISHES",
		payload: data,
	};
};

export const overwriteWish = (data) => {
	return {
		type: "OVERWRITE_WISHES",
		payload: data,
	};
};

export const appendWish = (data) => {
	return {
		type: "APPEND_WISHES",
		payload: data,
	};
};

export const editWish = (data) => {
	return {
		type: "EDIT_WISH",
		payload: data,
	};
};
