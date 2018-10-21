/**
 * Component to render a mpa
 * Props: members, 
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
				latitudeDelta: 10,
				longitudeDelta: 11,
			}
		};
	}

	render() {
		const memberMarkers = Array(50).map(x => 
			<MapView.Marker 
				coordinate={{
					latitude: 30.78825,
					longitude: -100.4324
				}} 
				key={x}
			/>
		);
		return(
			<MapView
				provider={"google"}
			    style={styles.map}
			    /*customMapStyle={NightViewMapStyle}*/
				initialRegion={this.state.region}
				onRegionChange={(region) => this.setState({region})}
				onRegionChangeComplete={(region) => this.setState({region})} >
				<MapView.Marker 
				coordinate={{
					latitude: 30.78825,
					longitude: -100.4324
				}} 
			/>
			</MapView>
			);
	}
}

const styles = StyleSheet.create ({
	map: {
		height: '100%',
		width: '100%'
	},
});