// App.js
import { StyleSheet } from 'react-native'
import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'
// import { AuthProvider } from './hooks/useAuth'

export default function App() {
	return (
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				{/* <AuthProvider> */}
				<StackNavigator />
				{/* </AuthProvider> */}
			</NavigationContainer>
		</TailwindProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
