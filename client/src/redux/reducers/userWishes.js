const initialState = {
	userBucketList: [],
	editWishItem: {},
};

export default function userDataReducer(state = initialState, action) {
	switch (action.type) {
		case "SUBMIT_WISHES":
			return {
				...state,
				userBucketList: [...state.userBucketList, action.payload],
			};

		case "EDIT_WISH":
			return {
				...state,
				editWishItem: action.payload,
			};

		default:
			return state;
	}
}
