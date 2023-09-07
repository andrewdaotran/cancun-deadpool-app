import { View, Text, TouchableOpacity, Image } from 'react-native'

import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileCard = ({ user }) => {
	const navigation = useNavigation()
	return (
		<View className='border-b border align-center mb-4 rounded-md p-4 '>
			<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
				<Text className='text-center text-lg'>{user.name}</Text>
				<Image className='w-60 h-60  mx-auto' source={user.image} />
			</TouchableOpacity>
		</View>
	)
}

export default ProfileCard
