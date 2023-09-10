import { createContext, useState } from 'react'
import { users } from '../staticAppData'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ShowResultsContext = createContext()

export const ShowResultsProvider = ({ children }) => {
	const [showResults, setShowResults] = useState(false)

	const toggleShowResults = () => {
		setShowResults(!showResults)
	}

	return (
		<ShowResultsContext.Provider value={{ toggleShowResults, showResults }}>
			{children}
		</ShowResultsContext.Provider>
	)
}

export default ShowResultsContext
