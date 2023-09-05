import { View, Text, TouchableOpacity, Image } from 'react-native'

import React from 'react'

const ProfileCard = ({ user }) => {
	return (
		<View className='border-b border align-center mb-4 rounded-md p-4 '>
			<Text className='text-center text-lg'>{user.name}</Text>
			<Image
				className='w-60 h-60 border border-blue-600 mx-auto'
				source={user.image}
				// source={require('../assets/drunk-images/Brandon-1.png')}
			/>
		</View>
	)
}

export default ProfileCard
