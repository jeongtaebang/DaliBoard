/**
 * Component to fetch json object from a pre-set path and store as array of markers
 * Display a map and pass markers depending on switch and search field values
 *
 * Props: navigation
 */

import React, {Component} from 'react';
import {AppRegistry, Text, TextInput, View, TouchableHighlight, Switch, StyleSheet} from 'react-native';

import DaliMap from './DaliMap'

const fetchPath = 'http://mappy.dali.dartmouth.edu/members.json';

export default class Members extends Component<Props> {
	static navigationOptions = {
		/* no navigator for this screen */
		header: null
  	}

	constructor(props) {
		super(props);
		this.state = {
			memberDataSource: [],
			currentData: [],
			searchText: "",
			switchFlag: false
		};

		/* bound functions */
		this.onMarkerPress = this.onMarkerPress.bind(this);
	}

	/* LifeCycle methods */
	componentDidMount() {
		this.fetchJson();
	}

	/* Fetch json from DALI and set as data source */
	fetchJson() {
		fetch(fetchPath)
			.then((response) => response.json())
			.then((parsedRes) => {
				const membersArray = [];
				parsedRes.map((member, index) => {
					membersArray.push({
						name: member.name,
						iconUrl: member.iconUrl,
						url: member.url,
						message: member.message,
						coordinate: member.lat_long,
						terms_on: member.terms_on,
						project: member.project,
						id: index	
					});
				})
				this.setState({
				  	memberDataSource: membersArray,
				  	currData: membersArray
				});
		 	})
		 	.catch(err => console.log(err));
	}

	/* On marker press, navigate to a page displaying details of the member */
	onMarkerPress(member) {
		this.props.navigation.navigate('MemberDetail', {
			subject: member, 
			switchFlag: this.state.switchFlag
		});
	}

	/* respond to input change and filter the current members array accordingly */
	setSearchText(event) {
		this.setState({
			searchText: event.nativeEvent.text
		});
	}

	render() {
		/* upon re-render, filter previous state to update it based on new searchText */
		let newCurrData = this.state.memberDataSource.filter( (member) => {
			return member.name.indexOf(this.state.searchText) !== -1;
		});

		return (
			<View style={styles.container}>
				<DaliMap 
					members={newCurrData}
					onMarkerPress={this.onMarkerPress}
				/>
					<View style={styles.calloutView} >
					    <TextInput 
					    	style={styles.calloutSearch}
					    	value={this.state.searchText}
					    	onChange={(this.setSearchText.bind(this))}
					    	placeholder={"Search DALI member's name"}
					    />
					</View>
				<Switch 
					style={styles.switchBtn}
					onValueChange={(value) => this.setState({
						switchFlag: value
					})}
					value={this.state.switchFlag}
					ios_backgroundColor={'#ffffcc'}
				/>
			</View>
		);
	}
}

/* Styles */
const styles = StyleSheet.create ({
	container: {
		marginTop: 35,
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	switchBtn: {
		alignSelf: 'flex-end',
		position: 'absolute'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		padding: 10,
		backgroundColor: '#f4f4f4',
		marginBottom: 3
	},
	rowText: {
		flex: 1
	},
	calloutView: {
		position: 'absolute',
		bottom: 0,
		left: 5,
		right: 5,
		backgroundColor: "rgba(0,0,0,0)",
		borderRadius: 10,
		marginBottom: 15
	},
	calloutSearch: {
		height: 36,
            padding: 10,
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 18,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#48BBEC',
            backgroundColor: 'white'
	}
});
