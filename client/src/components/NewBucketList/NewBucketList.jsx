import React, { useState } from "react";
import { Grid, Header, Message } from "semantic-ui-react";
import "./styles.css";
import UserWishesInput from "./UserWishesInput";

const NewBucketList = ({ type }) => {
	const [messageVisibility, setMessageVisibility] = useState({
		type: "",
		visible: false,
	});

	const handleMessageVisibility = (data, callback = null) => {
		if (data.visible) {
			setTimeout(() => {
				setMessageVisibility({ type: "", visible: false });
				if (callback) {
					callback();
				}
			}, 2000);
		}
		setMessageVisibility(data);
	};

	return (
		<div className="parent-div">
			<div className="new-wish">
				<Header as="h1" inverted>
					Create New Bucket List
				</Header>
				<Grid className="new-wish-grid">
					<UserWishesInput
						handleMessageVisibility={handleMessageVisibility}
						type={type}
					/>
				</Grid>
				{messageVisibility.visible && (
					<Message
						success={messageVisibility.type === "success"}
						error={messageVisibility.type === "error"}
						compact
						header={messageVisibility.message}
						className="message-div"
					/>
				)}
			</div>
		</div>
	);
};

export default NewBucketList;
