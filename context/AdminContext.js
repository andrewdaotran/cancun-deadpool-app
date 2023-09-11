import { createContext, useState } from 'react'
import { users } from '../staticAppData'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
	const [showResults, setShowResults] = useState(false)
	const [allowClearStorage, setAllowClearStorage] = useState(false)
	const [disableAnswers, setDisableAnswers] = useState(false)

	const toggleShowResults = () => {
		setShowResults(!showResults)
	}

	const toggleAllowClearStorage = () => {
		setAllowClearStorage(!allowClearStorage)
		// Must be done through database
		// user.profileChosen = false through database
	}

	const toggleDisableAnswers = () => {
		setDisableAnswers(!disableAnswers)
		// Must be done through database
	}

	return (
		<AdminContext.Provider
			value={{
				toggleShowResults,
				showResults,
				allowClearStorage,
				toggleAllowClearStorage,
				disableAnswers,
				toggleDisableAnswers,
			}}
		>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminContext
