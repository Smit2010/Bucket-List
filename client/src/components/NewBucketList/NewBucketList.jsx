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
				<Grid>
					<UserWishesInput
						handleMessageVisibility={handleMessageVisibility}
						type={type}
					/>
				</Grid>
				{messageVisibility.visible &&
					(messageVisibility.type === "success" ? (
						type === "edit" ? (
							<Message
								success
								compact
								header="Bucket List Updated!"
								className="message-div"
							/>
						) : (
							<Message
								success
								compact
								header="New Bucket List Created!"
								className="message-div"
							/>
						)
					) : messageVisibility.type === "invalid" ? (
						<Message
							error
							compact
							header="Enter Valid Details!"
							className="message-div"
						/>
					) : (
						<Message
							error
							compact
							header="Unable to create New Bucket List!"
							className="message-div"
						/>
					))}
			</div>
		</div>
	);
};

export default NewBucketList;
