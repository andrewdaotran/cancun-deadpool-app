import { createContext, useEffect, useState } from 'react'
import { users } from '../staticAppData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	updateDoc,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const userDataRef = collection(db, 'users')
	const [userData, setUserData] = useState({})
	const [allUsers, setAllUsers] = useState([])

	const addUserToContext = async (name) => {
		await AsyncStorage.setItem('@user', name)

		const subscriber = onSnapshot(userDataRef, (doc) => {
			doc.forEach((user) => {
				if (user.data().name === name) {
					setUserData({
						docId: user.id,
						// answerTwo: Number(user.answerTwo),
						...user.data(),
					})
				}
			})
		})
		return () => subscriber()
	}

	const getUserFromStorage = async () => {
		try {
			const value = await AsyncStorage.getItem('@user')
			if (value !== null) {
				// console.log('USER CONTEXT', value)
				addUserToContext(value)
			}
		} catch (e) {
			// error reading value
		}
	}

	const resetStorage = async () => {
		try {
			// const stuff = await AsyncStorage.getItem('@user')
			// console.log(stuff)
			await AsyncStorage.removeItem('@user')
			await updateDoc(doc(db, 'users', userData.docId), {
				profileChosen: false,
			})

			setUserData({})
		} catch (e) {
			// error reading value
		}
	}

	const getAllUsers = async () => {
		const subscriber = onSnapshot(userDataRef, (doc) => {
			let userList = []

			doc.forEach((user) => {
				return userList.push({
					docId: user.id,
					answerTwo: Number(user.answerTwo),
					...user.data(),
				})
			})

			setAllUsers(userList)

			return () => subscriber()
		})
	}

	const selectAnswer = async (question, answer) => {
		try {
			if (question === 'questionOne')
				await updateDoc(doc(db, 'users', userData.docId), {
					answerOne: answer,
				})
			if (question === 'questionTwo')
				await updateDoc(doc(db, 'users', userData.docId), {
					answerTwo: answer,
				})
		} catch (error) {
			console.log(error)
		}
	}

	const selectOverUnderAnswer = async (name, answer) => {
		// try {
		// 	// overUnderAnswers: [...userData.overUnderAnswers],
		// 	await updateDoc(doc(db, 'users', userData.docId), {
		// 		overUnderAnswers: userData.overUnderAnswers.map((user) => {
		// 			if (user.name === name) {
		// 				return {
		// 					...user,
		// 					answer,
		// 				}
		// 			}
		// 			return user
		// 		}),
		// 		// overUnderAnswers: [...userData.overUnderAnswers],
		// 	})
		// 	console.log()
		// } catch (error) {
		// 	console.log(error)
		// }
	}

	useEffect(() => {
		getAllUsers()
		getUserFromStorage()
	}, [])
	// }, [userData])

	return (
		<UserContext.Provider
			value={{
				userData,
				allUsers,
				addUserToContext,
				resetStorage,
				selectAnswer,
				selectOverUnderAnswer,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
