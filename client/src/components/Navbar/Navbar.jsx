import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import "./styles.css";

const { Column, Row } = Grid;

const actionButtons = [
	{
		label: "New Bucket List",
		name: "new-bucket-list",
		color: "green",
	},
	{
		label: "Recently Added",
		name: "recently-added",
		color: "teal",
	},
	{
		label: "Show All",
		name: "show-all",
		color: "blue",
	},
];

const Navbar = (props) => {
	const handleOnClick = (type) => {
		props.history.push(type);
	};

	return (
		<div className="navbar">
			<Grid className="navbar-grid">
				<Row className="navbar-row">
					<div className="navbar-title">Bucket List</div>
					<div className="navbar-actions">
						{actionButtons.map((item, itemIdx) => (
							<Column
								className="action-button"
								key={itemIdx}
								floated="right"
							>
								<Button
									color={item.color}
									onClick={() => handleOnClick(item.name)}
								>
									{item.label}
								</Button>
							</Column>
						))}
					</div>
				</Row>
			</Grid>
		</div>
	);
};

export default withRouter(Navbar);
