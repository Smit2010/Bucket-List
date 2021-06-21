import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header, Grid } from "semantic-ui-react";
import { editWish } from "../../redux/actions";
import { deleteUserBucketList, getUserBucketList } from "../../apis";
import BucketListItem from "./BucketListItem";
import "./styles.css";

const { Row, Column } = Grid;

const RecentlyAdded = ({ type }) => {
	const userData = useSelector((state) => state.userData.userBucketList);
	const dispatch = useDispatch();
	const history = useHistory();
	const [userBucketList, setUserBucketList] = useState(
		type === "show-all" ? [] : userData
	);

	const hanldeItemEdit = (data) => {
		dispatch(editWish(data));
		history.push("/edit-bucket-list");
	};

	const handleItemDelete = (itemId) => {
		deleteUserBucketList(itemId)
			.then(({ status, data }) => {
				if (status === 200) {
					let temp = userBucketList;
					temp = temp.filter((item) => item._id !== itemId);
					setUserBucketList(temp);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		if (type === "show-all") {
			getUserBucketList().then(({ status, data }) => {
				if (status === 200) {
					setUserBucketList(data.userBucketList);
				}
			});
		} else {
			setUserBucketList(userData);
		}
	}, [type, userData]);

	return (
		<div>
			<div className="recently-added">
				<Header inverted as="h1">
					{type === "recently-added"
						? "Recently Added"
						: "All Bucket Lists"}
				</Header>
				{userBucketList?.length > 0 ? (
					<Grid>
						<Row columns={6}>
							{userBucketList.map((item, itemIdx) => {
								console.log(item);
								return (
									<Column
										key={itemIdx}
										className="bucket-list-column"
									>
										<BucketListItem
											name={item.name}
											items={item.wishes}
											itemId={item._id ? item._id : null}
											handleItemDelete={handleItemDelete}
											hanldeItemEdit={hanldeItemEdit}
										/>
									</Column>
								);
							})}
						</Row>
					</Grid>
				) : (
					<Header inverted as="h4" disabled>
						No Bucket Lists
					</Header>
				)}
			</div>
		</div>
	);
};

export default RecentlyAdded;
