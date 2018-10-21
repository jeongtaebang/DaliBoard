/**
 * Component to fetch json object from a pre-set path
 * Props: navigation
 */

import React, {Component} from 'react';
import {AppRegistry, Text, TextInput, View, TouchableHighlight, Switch, StyleSheet} from 'react-native';
import Callout from 'react-native-maps';


import DaliMap from './DaliMap'

const fetchPath = 'http://mappy.dali.dartmouth.edu/members.json';

export default class Members extends Component<Props> {
	static navigationOptions = {
		header: null
  	}

	constructor(props) {
		super(props);
		this.state = {
			memberDataSource: [],
			currentData: null,
			switchFlag: false
		};

		/* bound functions */
		this.onMarkerPress = this.onMarkerPress.bind(this);
	}

	componentDidMount() {
		this.fetchJson();
	}

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
				  	memberDataSource: membersArray
				});
		 	})
		 	.catch(err => console.log(err));
	}

	onMarkerPress(member) {
		console.log(member);
		this.props.navigation.navigate('MemberDetail', {
			subject: member, 
			switchFlag: this.state.switchFlag
		});
	}

	renderRow(rowData, sectionID, rowID, highlightRow) {
		return(
			<TouchableHighlight>
				<View style={styles.row}>
					<Text style={styles.rowText}>{rowData.name}</Text>
					<Text style={styles.rowText}>{rowData.message}</Text>
					<Text style={styles.rowText}>{rowData.lat_long[0]}</Text>
					<Text style={styles.rowText}>{rowData.project[0]}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<DaliMap 
					members={this.state.memberDataSource}
					onMarkerPress={this.onMarkerPress}
				/>
					<View style={styles.calloutView} >
					    <TextInput style={styles.calloutSearch}
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
