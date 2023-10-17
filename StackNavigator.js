import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useState } from 'react'
import UserContext from './context/UserContext'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
	const { userData } = useContext(UserContext)

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#0f172a',
				},
				headerTitleStyle: {
					color: 'white',
				},
				headerTintColor: 'white',
				headerBackTitle: 'Back',
			}}
		>
			<Stack.Screen
				name='Choose Your Character'
				component={HomeScreen}
				options={{
					title: userData.name ? userData.name : 'Choose Your Character',
				}}
			/>
			<Stack.Screen
				name='Profile'
				component={ProfileScreen}
				options={{ title: 'Cancun Deadpool' }}
			/>
		</Stack.Navigator>
	)
}

export default StackNavigator
