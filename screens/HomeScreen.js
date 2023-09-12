import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard'
import { names, users } from '../staticAppData'
import UserContext from '../context/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ResultsCard from '../components/ResultsCard'
import AdminContext from '../context/AdminContext'

const HomeScreen = () => {
	const navigation = useNavigation()

	const [isLoading, setIsLoading] = useState(false)

	const { userData, getUserFromStorage } = useContext(UserContext)

	const { showResults, allowClearStorage } = useContext(AdminContext)

	useEffect(() => {
		if (!userData.name) {
			setIsLoading(true)
			// getUserFromStorage()
		}
		setIsLoading(false)
	}, [])

	return isLoading ? (
		<Text className='text-center text-2xl'> Loading...</Text>
	) : (
		<ScrollView className='mx-10 mt-4  flex-grow'>
			{/* Clear Storage Button */}
			{allowClearStorage && (
				<View className='flex flex-row w-full justify-evenly items-center flex-wrap mb-4'>
					<TouchableOpacity
						className=' p-4 rounded-md bg-gray-300'
						onPress={async () => {
							try {
								await AsyncStorage.removeItem('@user')
							} catch (e) {
								// error reading value
							}
							console.log(userData)
						}}
					>
						<Text className='text-center '>Choose another profile</Text>
					</TouchableOpacity>
				</View>
			)}

			{/* Clear Storage Button End*/}
			<ScrollView className=' '>
				<ProfileCard user={userData} key={userData.id} />
				{userData.name && !showResults && (
					<>
						<Text className='text-center mb-2'>Results pending...</Text>
						<Text className='text-center'>
							Keep drinking and come back later
						</Text>
					</>
				)}
				{!userData &&
					users.map((user) => {
						return (
							<>
								{!user.profileChosen && (
									<ProfileCard user={user} key={user.id} />
								)}
							</>
						)
					})}
			</ScrollView>
			{/* Results  */}
			{showResults && (
				<View className='mb-6'>
					{/* Acutual Results */}
					{/* Need to fix so we pull the data from database and show results */}
					{/* <ResultsCard user={user} key={user.id} /> */}

					{users.map((user) => {
						return (
							<>
								<ResultsCard user={user} key={user.id} />
							</>
						)
					})}
				</View>
			)}

			{/* Results End */}
		</ScrollView>
	)
}

export default HomeScreen
