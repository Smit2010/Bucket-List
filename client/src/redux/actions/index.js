export const submitWishes = (data) => {
	return {
		type: "SUBMIT_WISHES",
		payload: data,
	};
};

export const editWish = (data) => {
    return {
        type: "EDIT_WISH",
		payload: data,
    }
}
