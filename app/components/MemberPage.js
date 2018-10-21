/**
 * Component to render details about a member
 * Props: navigation, subject, switchFlag
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, Image, StyleSheet} from 'react-native';

export default class MemberPage extends Component<Props> {
	constructor(props) {
		super(props);
		const {params} = this.props.navigation.state;
		const member = params ? params.subject : null;
		const switchFlag = params ? params.switchFlag : null;
		this.state = {
			switchFlag: switchFlag,
			name: member.name,
			iconUrl: member.iconUrl,
			url: member.url,
			message: member.message,
			coordinate: member.coordinate,
			terms_on: member.terms_on,
			project: member.project
		}
    }

    renderDetails() {
    	const sFlag = this.state.switchFlag;
    	var baseUrl = "http://mappy.dali.dartmouth.edu/";
    	const details = [
    		<Image
    			key={"details1"}
    			style={styles.imageView} 
    			source={{uri: baseUrl + this.state.iconUrl}}
    		/>,
    		<Text 
    			key={"details2"}
    			style={styles.memberText}>
    			{this.state.name}: {this.state.message}
    		</Text>
    	];
    	if (sFlag === true) {
    		details.push(<Text 
    						key={"details3"}
    						style={styles.memberText}>
    						Lat: {this.state.coordinate[0]} {"\n"}
    						Long: {this.state.coordinate[1]}
    					 </Text>);
    		details.push(<Text 
    						key={"details4"}
    						style={styles.memberText}>
    						Terms on: {this.state.terms_on.join(" ")}
    					 </Text>);
    		if (this.state.project && this.state.project.length > 0) {
    			details.push(<Text 
    							key={"details5"}
    							style={styles.memberText}>
    							Projects: {this.state.project.join(" ")}
    						 </Text>);
    		}
    	} else {
    		details.push(<Text
    					   key={"details3"}
    					   style={styles.memberText}>
    					   Turn on switch in the map to find out more about me!
    					 </Text>);
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
	imageView: {
		width: 200,
		height: 200,
		padding: 10
	},
	memberView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	memberText: {
		padding: 5,
		marginTop: 5,
		marginBottom: 5,
		fontFamily: 'Cochin',
		fontSize: 18,
		fontWeight: 'bold'
	}
});
