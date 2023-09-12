import { createContext, useEffect, useState } from 'react'
import { users } from '../staticAppData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const userDataRef = collection(db, 'users')
	const [userData, setUserData] = useState({})

	const addUserToContext = async (name) => {
		// setUserData( users.filter( ( user ) => user.name === name )[ 0 ] )
		// const subscriber = onSnapshot(userDataRef, (doc) => {
		// 	// doc.data().users.forEach((user) => {
		// 	// 	if (user.name === data.name) {
		// 	// 		setUserData(user)
		// 	// 	}
		// 	// })
		// })
		// return () => subscriber()
		const userArray = await getDocs(userDataRef)
		const user = userArray.docs
			.filter((user) => user.data().name === name)
			.data()
		setUserData(user)
		// const user = userArray.docs
		// 	.filter((user) => user.data().name === name)
		// 	.data()
		// setUserData(user)
	}

	const filteredUsers = users.filter((user) => user.name !== userData.name)

	// useEffect(async () => {
	// 	try {
	// 		const user = await AsyncStorage.getItem('@user')
	// 		if (user) {
	// 			// addUserToContext(user)
	// 		}
	// 	} catch (e) {
	// 		// error reading value
	// 	}
	// }, [])

	// const getUserFromStorage = async () => {
	// 	try {
	// 		const value = await AsyncStorage.getItem('@user')
	// 		if (value !== null) {
	// 			addUserToContext(value)
	// 		}
	// 	} catch (e) {
	// 		// error reading value
	// 	}
	// }

	return (
		<UserContext.Provider value={{ userData, filteredUsers }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
