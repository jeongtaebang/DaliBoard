/**
 * DALI DEV Challenge II : My first React-Native project
 * Jeong Tae Bang
 * 
 * Look at app/components/* for most custom components
 *
 * Screens: Map (initial), MemberDetail
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Members from './app/components/Members';
import MemberPage from './app/components/MemberPage';

const AppStackNavigator = createStackNavigator({
    Map: Members,
    MemberDetail: MemberPage
});

export default class App extends Component<Props> {  

	render() {
		return (
			<AppStackNavigator initialRouteName={'Map'}/>
		);
	}
}

