import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard'
import { names, users } from '../staticAppData'
import UserContext from '../context/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
	const navigation = useNavigation()

	const [isLoading, setIsLoading] = useState(false)

	const { userData, getUserFromStorage } = useContext(UserContext)

	useEffect(() => {
		if (!userData.name) {
			setIsLoading(true)
			getUserFromStorage()
		}
		setIsLoading(false)
	}, [])

	return isLoading ? (
		<Text className='text-center text-2xl'> Loading...</Text>
	) : (
		<View className='mx-10 mt-4  align-center justify-center flex-grow'>
			{/* Temp Button */}
			<Button
				title='Clear Storage'
				onPress={async () => {
					try {
						await AsyncStorage.removeItem('@user')
					} catch (e) {
						// error reading value
					}
				}}
			>
				{' '}
				Clear Storage
			</Button>
			{/* Temp Button */}
			<ScrollView>
				{userData.name ? (
					<>
						<ProfileCard user={userData} key={userData.id} />
						<Text>Results pending... Come back later</Text>
					</>
				) : (
					users.map((user) => {
						return (
							<>
								<ProfileCard user={user} key={user.id} />
							</>
						)
					})
				)}
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
