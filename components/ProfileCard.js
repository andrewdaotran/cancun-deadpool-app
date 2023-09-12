import { View, Text, TouchableOpacity, Image } from 'react-native'

import React from 'react'
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileCard = ({ user }) => {
	const navigation = useNavigation()

	const storeUser = async (value) => {
		try {
			// const jsonValue = JSON.stringify(value)
			// await AsyncStorage.setItem( '@user', jsonValue )
			await AsyncStorage.setItem('@user', value)
		} catch (e) {
			// saving error
		}
	}

	const clickProfileCard = () => {
		// Add if clicked Andrew and storage is empty, must type in password to access admin features
		// logic here
		storeUser(user.name)
		// user.profileChosen = true through database
		navigation.navigate('Profile')
	}

	return (
		<View className='bg-gray-300 align-center mb-4 rounded-md p-4 '>
			<TouchableOpacity onPress={clickProfileCard}>
				<Text className='text-center text-lg'>{user.name}</Text>
				<Image className='w-60 h-60  mx-auto' source={user.image} />
			</TouchableOpacity>
		</View>
	)
}

export default ProfileCard
