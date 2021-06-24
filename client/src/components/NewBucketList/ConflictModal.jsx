import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Modal, Header } from "semantic-ui-react";
import { editUserBucketList } from "../../apis/apis";
import { appendWish, overwriteWish } from "../../redux/actions";
import BucketListItem from "../RecentlyAdded/BucketListItem";
import "./styles.css";

const { Row, Column } = Grid;

const ConflictModal = ({
	conflictPopUp,
	handleModalClose,
	userData,
	resetUserData,
	handleMessageVisibility,
}) => {
	const dispatch = useDispatch();
	const userBucketLists = useSelector(
		(state) => state.userData.userBucketList
	);
	const [completingAction, setCompletingAction] = useState(false);
	const [action, setAction] = useState("");

	useEffect(() => {
		if (completingAction) {
			let data = [];
			for (let i = 0; i < conflictPopUp.content.length; i++) {
				let item = conflictPopUp.content[i];
				for (let j = 0; j < userBucketLists.length; j++) {
					if (item.name === userBucketLists[j].name) {
						data.push({
							itemId: item._id,
							name: userBucketLists[j].name,
							wishes: userBucketLists[j].wishes,
						});
					}
				}
			}
			editUserBucketList(data, action)
				.then(({ status }) => {
					if (status === 200) {
						handleMessageVisibility({
							type: "success",
							visible: true,
							message: "Bucket List Updated!",
						});
					}
					setCompletingAction(false);
					handleModalClose();
				})
				.catch((err) => {
					handleMessageVisibility({
						type: "error",
						visible: true,
						message: "Unable to create New Bucket List!",
					});
					console.error(err);
					setCompletingAction(false);
					handleModalClose();
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [completingAction]);

	const handleModalActionClick = (type, action) => {
		setAction(action);
		if (type === "redux") {
			let userObj = {
				name: userData.userName,
				wishes: userData.userWishes,
			};
			dispatch(
				action === "overwrite"
					? overwriteWish(userObj)
					: appendWish(userObj)
			);
			handleModalClose();
			handleMessageVisibility({
				type: "success",
				visible: true,
				message: "Bucket List Updated!",
			});
			resetUserData();
		} else {
			setCompletingAction(true);
		}
	};

	return (
		<Modal
			size="small"
			open={conflictPopUp.visible}
			header={conflictPopUp.header}
			//onClose={handleModalClose}
			content={
				<div className="modal-div">
                    <Header as="h4" content="Conflicted Lists" className="modal-header"/>
					<Grid className="modal-grid">
						<Row columns={2} className="modal-row">
							{conflictPopUp.content.map((item, itemIdx) => (
								<Column key={itemIdx} className="modal-column">
									<BucketListItem
										name={item.name}
										items={item.wishes}
									/>
								</Column>
							))}
						</Row>
					</Grid>
				</div>
			}
			actions={[
				<Button
					content="Cancel"
					key="cancel"
					negative
					onClick={handleModalClose}
				/>,
				<Button
					content="Overwrite"
					key="overwrite"
					onClick={() =>
						handleModalActionClick(conflictPopUp.type, "overwrite")
					}
					loading={action === "overwrite" && completingAction}
				/>,
				<Button
					content="Append"
					key="append"
					onClick={() =>
						handleModalActionClick(conflictPopUp.type, "append")
					}
					loading={action === "append" && completingAction}
				/>,
			]}
		/>
	);
};

export default ConflictModal;
