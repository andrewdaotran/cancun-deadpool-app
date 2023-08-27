//StackNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
// import useAuth from './hooks/useAuth'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
	// const { user } = useAuth()
	{
		/* {user ? ( */
	}
	return (
		<Stack.Navigator>
			{true ? (
				<>
					<Stack.Screen name='Home' component={HomeScreen} />
					<Stack.Screen name='Profile' component={ProfileScreen} />
				</>
			) : (
				<Stack.Screen name='Login' component={LoginScreen} />
			)}
		</Stack.Navigator>
	)
}

export default StackNavigator
