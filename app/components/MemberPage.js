/**
 * Component to render details about a member
 * Props: navigation
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet} from 'react-native';

export default class MemberPage extends Component<Props> {
	constructor(props) {
		super(props);
		const {params} = this.props.navigation.state;
		const user = params ? params.user : null;
		this.state = {
			name: user.name,
			iconUrl: user.iconUrl,
			message: user.message,
			lat: user.lat_long[0],
			long: user.lat_long[1],
			project: user.project
		}
    }

  render() {

	return (
		<View>
			<Text>{this.state.name}</Text>
			<Text>{this.state.lat}</Text>
			<Text>{this.state.long}</Text>
			<Button title="Go Back to Map"
					onPress={() => this.props.navigation.goBack()}
			/>
		</View>
	);
  }

}
