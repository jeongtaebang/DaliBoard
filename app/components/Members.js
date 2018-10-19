/**
 * Component to fetch json object from a pre-set path
 * Props: navigation
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, TouchableHighlight, StyleSheet} from 'react-native';

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
			currentData: null
		};
	}

	componentDidMount() {
		this.fetchJson();
	}

	onPress(user) {
		this.props.navigation.navigate('MemberDetail', {user});
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
			<ListView 
			style = {styles.list}
			dataSource={this.state.memberDataSource}
			renderRow={this.renderRow.bind(this)}
			/>
		);
	}
}

const styles = StyleSheet.create ({
	list: {
		marginTop: 50
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#f4f4f4',
		marginBottom: 3
	},
		rowText: {
		flex: 1
		}
});
