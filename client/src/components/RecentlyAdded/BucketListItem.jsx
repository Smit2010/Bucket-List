import React from "react";
import { Card, Button } from "semantic-ui-react";
import "./styles.css";

const { Content, Header, Description } = Card;

const BucketListItem = ({
	name,
	items,
	itemId,
	handleItemDelete,
	hanldeItemEdit,
}) => {
	return (
		<Card>
			<Content>
				<Header className="bucket-list-card-header">
					{name}
					{itemId && (
						<div>
							<Button
								circular
								icon="edit"
								size="mini"
								onClick={() =>
									hanldeItemEdit({
										itemId: itemId,
										name: name,
										wishes: items,
									})
								}
							/>
							<Button
								circular
								icon="remove"
								size="mini"
								onClick={() => handleItemDelete(itemId)}
							/>
						</div>
					)}
				</Header>
				<Description>
					{items?.length > 0 &&
						items.map((userWish, userWishIdx) => (
							<ul className="wishes-ul">
								<li key={userWishIdx}>{userWish}</li>
							</ul>
						))}
				</Description>
			</Content>
		</Card>
	);
};

export default BucketListItem;
