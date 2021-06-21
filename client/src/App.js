import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
//import Dashboard from "./components/Dashboard";
import "semantic-ui-css/semantic.min.css";
import NewBucketList from "./components/NewBucketList/NewBucketList";
import RecentlyAdded from "./components/RecentlyAdded/RecentlyAdded";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Redirect to="/new-bucket-list" />
				</Route>
				<Route exact path="/new-bucket-list">
					<NewBucketList />
				</Route>
				<Route exact path="/edit-bucket-list">
					<NewBucketList type="edit" />
				</Route>
				<Route exact path="/recently-added">
					<RecentlyAdded type="recently-added" />
				</Route>
				<Route exact path="/show-all">
					<RecentlyAdded type="show-all" />
				</Route>
				<Route path="*">
					<Redirect to="/new-bucket-list" />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
