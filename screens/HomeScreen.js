import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard'
import { names, users } from '../staticAppData'
import UserContext from '../context/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ResultsCard from '../components/ResultsCard'
import AdminContext from '../context/AdminContext'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { sortArrAlphabetically } from '../utils'

const HomeScreen = () => {
	const navigation = useNavigation()

	const { userData, getUserFromStorage, allUsers, resetStorage, isLoading } =
		useContext(UserContext)

	const { showResults, allowClearStorage } = useContext(AdminContext)

	return (
		// isLoading ? (
		// 	<Text className='text-center text-2xl'> Loading...</Text>
		// ) : (
		<ScrollView className='mx-10 mt-4  flex-grow'>
			{/* Clear Storage Button */}
			{allowClearStorage && (
				<View className='flex flex-row w-full justify-evenly items-center flex-wrap mb-4'>
					<TouchableOpacity
						className=' p-4 rounded-md bg-gray-300'
						onPress={resetStorage}
					>
						<Text className='text-center '>Choose another profile</Text>
					</TouchableOpacity>
				</View>
			)}

			{/* Clear Storage Button End*/}
			{userData.name && <ProfileCard user={userData} key={userData.id} />}
			<ScrollView className=' '>
				{!userData.name &&
					sortArrAlphabetically(allUsers).map((user) => {
						return (
							!user.profileChosen && <ProfileCard user={user} key={user.id} />
						)
					})}

				{userData.name && !showResults && (
					<>
						<Text className='text-center text-white mb-2 text-2xl'>
							Results pending...
						</Text>
						<Text className='text-center text-white text-xl'>
							Keep drinking and come back later
						</Text>
					</>
				)}
			</ScrollView>

			{showResults && (
				<View className='mb-6'>
					<ResultsCard isSoloResult={true} />

					{sortArrAlphabetically(allUsers).map((user) => {
						return (
							<ResultsCard user={user} key={user.id} isSoloResult={false} />
						)
					})}
				</View>
			)}

			{/* Results End */}
		</ScrollView>
	)
}

export default HomeScreen
