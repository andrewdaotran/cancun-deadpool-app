import { View, Text, TouchableOpacity, Image } from 'react-native'

import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { users } from '../staticAppData'
import UserContext from '../context/UserContext'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const ProfileCard = ({ user }) => {
	const navigation = useNavigation()

	const { userData, addUserToContext } = useContext(UserContext)

	const retrieveUserImage = () => {
		if (userData.name)
			return users.filter(
				(filteredUser) => filteredUser.name === userData.name
			)[0].image

		return users.filter((filteredUser) => filteredUser.name === user.name)[0]
			.image
	}
	// console.log('PROFILE CARD', user)

	const clickProfileCard = async () => {
		// Add if clicked Andrew and storage is empty, must type in password to access admin features
		// logic here
		// user.profileChosen = true through database
		navigation.navigate('Profile')
		if (userData.name) return

		addUserToContext(user.name)

		await updateDoc(doc(db, 'users', user.docId), { profileChosen: true })
	}

	return (
		<View className='bg-gray-300 align-center mb-4 rounded-md p-4 '>
			<TouchableOpacity onPress={clickProfileCard}>
				<Text className='text-center text-lg'>{user.name}</Text>
				<Image className='w-60 h-60  mx-auto' source={retrieveUserImage()} />
			</TouchableOpacity>
		</View>
	)
}

export default ProfileCard
