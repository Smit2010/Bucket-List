import React, { useEffect, useState } from "react";
import { Input, Grid, Button, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { submitWishes } from "../../redux/actions";
import { editUserBucketList, saveUserBucketList } from "../../apis";
import { useHistory } from "react-router-dom";

const { Column, Row } = Grid;

const actionButtons = [
	{
		label: "Add More",
		name: "add-more",
	},
	{
		label: "Submit",
		name: "submit",
	},
];

const UserWishesInput = ({ handleMessageVisibility, type }) => {
	const [userName, setUserName] = useState("");
	const [userWishes, setUserWishes] = useState([""]);
	const [nameError, setNameError] = useState({
		visited: false,
		error: false,
	});
	const [wishError, setWishError] = useState([
		{ visited: false, error: false },
	]);
	const [submittingWishes, setSubmittingWishes] = useState(false);
	const editWishItem = useSelector((state) => state.userData.editWishItem);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (type === "edit") {
			setUserName(editWishItem.name);
			setUserWishes(editWishItem.wishes);
			setWishError([
				...editWishItem.wishes.map((item) => {
					return { visited: false, error: false };
				}),
			]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	useEffect(() => {
		if (submittingWishes) {
			if (type !== "edit") {
				saveUserBucketList({ name: userName, wishes: userWishes })
					.then(({ status, data }) => {
						if (status === 200) {
							dispatch(
								submitWishes({
									name: userName,
									wishes: userWishes,
								})
							);
							handleMessageVisibility({
								type: "success",
								visible: true,
							});
							setUserName("");
							setUserWishes([""]);
						} else {
							handleMessageVisibility({
								type: "failure",
								visible: true,
							});
						}
						setSubmittingWishes(false);
					})
					.catch((err) => {
						handleMessageVisibility({
							type: "failure",
							visible: true,
						});
						console.error(err);
						setSubmittingWishes(false);
					});
			} else {
				editUserBucketList({
					itemId: editWishItem.itemId,
					name: userName,
					wishes: userWishes,
				})
					.then(({ status, data }) => {
						if (status === 200) {
							handleMessageVisibility(
								{
									type: "success",
									visible: true,
								},
								() => history.push("/new-bucket-list")
							);
							setUserName("");
							setUserWishes([""]);
						} else {
							handleMessageVisibility({
								type: "failure",
								visible: true,
							});
						}
						setSubmittingWishes(false);
					})
					.catch((err) => {
						console.error(err);
						setSubmittingWishes(false);
					});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submittingWishes]);

	const handleOnClick = (type) => {
		if (type === "add-more") {
			setUserWishes([...userWishes, ""]);
			setWishError([...wishError, { visited: false, error: false }]);
		} else if (type === "submit") {
			if (userName !== "" && !userWishes.includes("")) {
				setSubmittingWishes(true);
			} else {
				handleMessageVisibility({
					type: "invalid",
					visible: true,
				});
			}
		}
	};

	const handleUserWishChange = (val, idx) => {
		let temp = [...userWishes];
		temp[idx] = val;
		setUserWishes(temp);
	};

	const handleRemoveWish = (idx) => {
		let temp = [];
		for (let i = 0; i < userWishes.length; i++) {
			if (i !== idx) {
				temp.push(userWishes[i]);
			}
		}
		setUserWishes(temp);
	};

	const handleFocusChange = (idx) => {
		let temp = [...wishError];
		temp[idx] = { visited: true, error: false };
		setWishError(temp);
	};

	const handleBlurChange = (idx) => {
		let temp = [...wishError];
		temp[idx] = {
			visited: true,
			error: temp[idx].visited && userWishes[idx].length < 1,
		};
		setWishError(temp);
	};

	return (
		<>
			<Row>
				<Column className="input-column">
					<Input
						inverted
						value={userName}
						placeholder="Enter Your Name"
						error={nameError.error}
						onChange={(e, data) => setUserName(data.value)}
						onFocus={(e) =>
							setNameError({ visited: true, error: false })
						}
						onBlur={(e) =>
							setNameError({
								visited: true,
								error: nameError.visited && userName.length < 1,
							})
						}
					/>
					{nameError.error && (
						<label className="input-label">Invalid Name</label>
					)}
				</Column>
			</Row>
			{userWishes.map((item, itemIdx) => (
				<Row key={itemIdx}>
					<Column className="input-column">
						<div>
							<Input
								placeholder="Enter Your Wish"
								value={item}
								inverted
								error={wishError[itemIdx].error}
								onChange={(e, data) =>
									handleUserWishChange(data.value, itemIdx)
								}
								onFocus={(e) => handleFocusChange(itemIdx)}
								onBlur={(e) => handleBlurChange(itemIdx)}
							/>
							{itemIdx > 0 && (
								<Icon
									className="remove-icon"
									inverted
									size="large"
									name="remove circle"
									onClick={() => handleRemoveWish(itemIdx)}
								/>
							)}
						</div>
						{wishError[itemIdx].error && (
							<label className="input-label">Invalid Wish</label>
						)}
					</Column>
				</Row>
			))}
			<Row>
				{actionButtons.map((item, itemIdx) => (
					<Column className="action-button" key={itemIdx}>
						<Button
							basic
							inverted
							loading={item.name === "submit" && submittingWishes}
							onClick={() => handleOnClick(item.name)}
						>
							{item.label}
						</Button>
					</Column>
				))}
			</Row>
		</>
	);
};

export default UserWishesInput;
