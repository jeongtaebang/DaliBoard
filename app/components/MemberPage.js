/**
 * Component to render details about a member
 * Props: navigation, subject, switchFlag
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet} from 'react-native';

export default class MemberPage extends Component<Props> {
	constructor(props) {
		super(props);
		const {params} = this.props.navigation.state;
		const user = params ? params.subject : null;
		const switchFlag = params ? params.switchFlag : null;
		this.state = {
			switchFlag: switchFlag,
			name: user.name,
			iconUrl: user.iconUrl,
			message: user.message,
			lat: user.lat_long[0],
			long: user.lat_long[1],
			project: user.project
		}
    }

    renderDetails() {
    	const sFlag = this.state.switchFlag;
    	const details = [
    		<Text key={"details1"}>{this.state.name}</Text>,
			<Text key={"details2"}>{this.state.lat}</Text>,
			<Text key={"details3"}>{this.state.long}</Text>
    	];
    	if (sFlag === true) {
    		details.push(<Text key={"details4"}>{this.state.iconUrl}</Text>);
    	}

    	return (details);
    }

  	render() {

		return (
			<View style={styles.memberView}>
				{this.renderDetails()}
				<Button title="Go Back to Map"
						onPress={() => this.props.navigation.goBack()}
				/>
			</View>
		);
    }
}

const styles = StyleSheet.create ({
	memberView: {
		flex: 1
	}
});
