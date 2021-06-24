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

		case "OVERWRITE_WISHES":
			return {
				...state,
				userBucketList: state.userBucketList.map((item) =>
					item.name === action.payload.name
						? { name: item.name, wishes: action.payload.wishes }
						: item
				),
			};

		case "APPEND_WISHES":
			return {
				...state,
				userBucketList: state.userBucketList.map((item) =>
					item.name === action.payload.name
						? {
								name: item.name,
								wishes: [
									...item.wishes,
									...action.payload.wishes,
								],
						  }
						: item
				),
			};

		default:
			return state;
	}
}
