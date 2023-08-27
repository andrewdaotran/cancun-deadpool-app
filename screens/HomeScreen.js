import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTailwind } from 'tailwind-rn'

const HomeScreen = () => {
	const navigation = useNavigation()
	const tailwind = useTailwind()
	return (
		<View>
			<Text>I am the home Screen</Text>
			<TouchableOpacity
				style={tailwind('bg-white')}
				onPress={() => navigation.navigate('Profile')}
			>
				<Text style={{}}>Hello</Text>
			</TouchableOpacity>
		</View>
	)
}

export default HomeScreen
