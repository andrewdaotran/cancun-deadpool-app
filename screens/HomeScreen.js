import { View, Text, Button, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard'

const HomeScreen = () => {
	const navigation = useNavigation()
	return (
		<View className=''>
			<ProfileCard />
			<TouchableOpacity
				onPress={() => navigation.navigate('Profile')}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				<Text>Go to Profile</Text>
			</TouchableOpacity>
		</View>
	)
}

export default HomeScreen
