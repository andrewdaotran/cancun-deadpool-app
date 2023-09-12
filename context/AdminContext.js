import { createContext, useEffect, useState } from 'react'
import {
	updateDoc,
	doc,
	onSnapshot,
	addDoc,
	collection,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
	const [showResults, setShowResults] = useState(false)
	const [allowClearStorage, setAllowClearStorage] = useState(false)
	const [disableAnswers, setDisableAnswers] = useState(false)
	const [inputResults, setInputResults] = useState(false)

	const adminRef = doc(db, 'adminPowers', 'tVubad3DaeM2NI8EGZd7')

	// useEffect(() => {
	// 	const subscriber = onSnapshot(adminRef, (doc) => {
	// 		setShowResults(doc.data().showResults)
	// 		setAllowClearStorage(doc.data().allowClearStorage)
	// 		setDisableAnswers(doc.data().disableAnswers)
	// 		setInputResults(doc.data().inputResults)
	// 	})
	// 	return () => subscriber()
	// }, [])

	const toggleShowResults = async () => {
		try {
			await updateDoc(adminRef, {
				showResults: !showResults,
			})
		} catch (error) {
			console.log(error)
		}
		setShowResults(!showResults)
	}

	const toggleAllowClearStorage = async () => {
		try {
			await updateDoc(adminRef, {
				allowClearStorage: !allowClearStorage,
			})
		} catch (error) {
			console.log(error)
		}
		setAllowClearStorage(!allowClearStorage)
	}

	const toggleDisableAnswers = async () => {
		try {
			await updateDoc(adminRef, {
				disableAnswers: !disableAnswers,
			})
		} catch (error) {
			console.log(error)
		}
		setDisableAnswers(!disableAnswers)
	}

	const toggleInputResults = () => {
		setInputResults(!inputResults)
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
				inputResults,
				toggleInputResults,
			}}
		>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminContext
