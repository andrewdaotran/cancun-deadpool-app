import { createContext, useState } from 'react'
import { users } from '../staticAppData'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
	const [showResults, setShowResults] = useState(false)

	const toggleShowResults = () => {
		setShowResults(!showResults)
	}

	return (
		<AdminContext.Provider value={{ toggleShowResults, showResults }}>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminContext
