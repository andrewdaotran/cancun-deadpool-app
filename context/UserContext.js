import { createContext, useState } from 'react'
import { users } from '../staticAppData'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({})

	const addUserToContext = (name) => {
		setUserData(users.filter((user) => user.name === name)[0])
	}

	const filteredUsers = users.filter((user) => user.name !== userData.name)

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

	return (
		<UserContext.Provider
			value={{ userData, filteredUsers, getUserFromStorage }}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
