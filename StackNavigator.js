import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Choose Your Character' component={HomeScreen} />
			<Stack.Screen name='Profile' component={ProfileScreen} />
		</Stack.Navigator>
	)
}

export default StackNavigator
