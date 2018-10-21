/**
 * Component to fetch json object from a pre-set path
 * Props: navigation
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, TouchableHighlight, Switch, StyleSheet} from 'react-native';

import DaliMap from './DaliMap'

const fetchPath = 'http://mappy.dali.dartmouth.edu/members.json';

export default class Members extends Component<Props> {
	static navigationOptions = {
		header: null
  	}

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			memberDataSource: ds,
			currentData: null,
			switchFlag: false
		};
	}

	componentDidMount() {
		this.fetchJson();
	}

	onPress(user) {
		this.props.navigation.navigate('MemberDetail', {
			subject: user, 
			switchFlag: this.state.switchFlag
		});
	}

	fetchJson() {
		fetch(fetchPath)
		  .then((response) => response.json())
		  .then((response) => {
			this.setState({
			  	memberDataSource: this.state.memberDataSource.cloneWithRows(response)
			})
		  });
	}

	renderRow(rowData, sectionID, rowID, highlightRow) {
		return(
			<TouchableHighlight onPress={() => {this.onPress(rowData)}}>
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
				<DaliMap />
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
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	switchBtn: {
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
	}
});
