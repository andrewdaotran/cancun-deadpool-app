import { createContext, useEffect, useState } from 'react'
import { users } from '../staticAppData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const userDataRef = collection(db, 'users')
	const [userData, setUserData] = useState({})
	const [allUsers, setAllUsers] = useState([])

	const addUserToContext = async (name) => {
		const subscriber = onSnapshot(userDataRef, (doc) => {
			doc.forEach((user) => {
				if (user.data().name === name) {
					setUserData(user.data())
				}
			})
		})
		return () => subscriber()
	}

	const getUserFromStorage = async () => {
		try {
			const value = await AsyncStorage.getItem('@user')
			if (value !== null) {
				addUserToContext(value)
			}
		} catch (e) {
			// error reading value
		}
	}

	const getAllUsers = async () => {
		// const users = await getDocs(collection(db, 'users')).forEach((user) =>
		// 	user.data()
		// )

		// const user = (await getDocs(doc(db, 'users'))).forEach((user) => {
		// 	return user.data()
		// })

		const subscriber = onSnapshot(userDataRef, (doc) => {
			let userList = []

			doc.forEach((user) => {
				// console.log('user', user.data())
				return userList.push(user.data())
			})

			console.log('usersList', userList.length)
			setAllUsers(userList)

			// 	setAllUsers(usersList)
			// setAllUsers(doc.data())
			// 	doc.forEach((user) => {
			// 		if (user.data().name === name) {
			// 			setUserData(user.data())
			// 		}
			// 	})
			// })
			// console.log(user)
			return () => subscriber()
			// setAllUsers(users)
		})
	}

	const filteredUsers = users.filter((user) => user.name !== userData.name)

	useEffect(() => {
		if (!userData) toggleAllowClearStorage({ bool: true })
		getAllUsers()
		getUserFromStorage()
	}, [userData])

	return (
		<UserContext.Provider
			value={{ userData, filteredUsers, allUsers, addUserToContext }}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
