import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard'
import { names, users } from '../staticAppData'
import UserContext from '../context/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ResultsCard from '../components/ResultsCard'

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
		<ScrollView className='mx-10 mt-4  flex-grow'>
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
			<ScrollView className=' '>
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
			{users.map((user) => {
				return (
					<>
						<ResultsCard user={user} key={user.id} />
					</>
				)
			})}
		</ScrollView>
	)
}

export default HomeScreen
