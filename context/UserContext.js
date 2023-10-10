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
	const resultsRef = collection(db, 'results')
	const [userData, setUserData] = useState({})
	const [allUsers, setAllUsers] = useState([])
	const [results, setResults] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const toggleIsLoading = (loadingBool) => {
		setIsLoading(loadingBool ? loadingBool : !isLoading)
	}

	const updateUserDatabase = async () => {
		if (userData.name) {
			try {
				if (userData.docId) {
					await updateDoc(doc(db, 'users', userData.docId), {
						...userData,
					})
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	const updateResultsDatabase = async () => {
		try {
			await updateDoc(doc(db, 'results', 'zPvDSkgdPoR9CGXG0YsO'), {
				...results,
			})
		} catch (error) {
			console.log(error)
		}
	}

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

		toggleIsLoading(false)

		return () => subscriber()
	}

	const addResultsToContext = async () => {
		const subscriber = onSnapshot(resultsRef, (doc) => {
			doc.forEach((item) => {
				setResults({
					// docId: doc.id,
					...item.data(),
				})
			})
		})
		// console.log('RESULTS CONTEXT', results)
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
			await updateDoc(doc(db, 'users', userData.docId), {
				profileChosen: false,
			})
			setUserData({})
			await AsyncStorage.removeItem('@user')
		} catch (error) {
			console.log(error)
			console.log('usercontext reset storage', error)
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
		setUserData({
			...userData,
			[question]: answer,
		})
	}

	const selectOverUnderAnswer = async (name, answer) => {
		setUserData({
			...userData,
			overUnderAnswers: userData.overUnderAnswers.map((user) => {
				if (user.name === name) {
					return {
						...user,
						answer,
					}
				}
				return user
			}),
		})
	}

	const andrewInputAnswers = async (question, answer) => {
		setResults({
			...results,
			[question]: answer,
		})
	}

	const andrewInputOverUnderAnswer = async (name, answer) => {
		setResults({
			...results,
			overUnderAnswers: results.overUnderAnswers.map((user) => {
				if (user.name === name) {
					return {
						...user,
						answer,
					}
				}
				return user
			}),
		})
	}

	useEffect(() => {
		getAllUsers()
		getUserFromStorage()
		addResultsToContext()
	}, [])
	// }, [userData])

	useEffect(() => {
		updateUserDatabase()
	}, [userData])

	useEffect(() => {
		updateResultsDatabase()
	}, [results])

	return (
		<UserContext.Provider
			value={{
				userData,
				allUsers,
				addUserToContext,
				resetStorage,
				selectAnswer,
				selectOverUnderAnswer,
				updateUserDatabase,
				updateResultsDatabase,
				results,
				andrewInputAnswers,
				andrewInputOverUnderAnswer,
				isLoading,
				toggleIsLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
