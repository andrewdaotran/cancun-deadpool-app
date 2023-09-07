import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard'
import { names, users } from '../staticAppData'

const HomeScreen = () => {
	const navigation = useNavigation()

	return (
		<View className='mx-10 mt-4  align-center justify-center flex-grow'>
			<ScrollView>
				{users.map((user) => {
					return (
						<>
							<ProfileCard user={user} key={user.id} />
						</>
					)
				})}
			</ScrollView>
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
