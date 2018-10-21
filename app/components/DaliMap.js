/**
 * Component to render a mpa
 * Props: 
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

import NightViewMapStyle from './MapStyles/NightViewMapStyle.json';

export default class Members extends Component<Props> {

	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: 30.78825,
				longitude: -100.4324,
				latitudeDelta: 40,
				longitudeDelta: 50,
			}
		};
	}

	render() {
		return(
			<MapView
				provider={"google"}
			    style={styles.map}
			    customMapStyle={NightViewMapStyle} 
				initialRegion={this.state.region}
				zoom
			/>
			);
	}
}

const styles = StyleSheet.create ({
	map: {
		height: '100%',
		width: '100%'
	},
});