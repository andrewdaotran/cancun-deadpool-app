// // hooks/useAuth.js
// import { createContext, useContext, useEffect } from 'react'

// import * as Google from 'expo-google-app-auth'
// import {
// 	GoogleAuthProvider,
// 	onAuthStateChanged,
// 	signInWithCredential,
// 	signOut,
// } from 'firebase/auth' // notes
// import { auth } from '../firebase' // notes

// const AuthContext = createContext({})

// const config = {
// 	iosClientId: '', // go into your GoogleServices-Info.plist and copy the string value for CLIENT_ID
// 	androidClientId: '', // go into your google-services.json and copy the string value for client_id
// 	scopes: ['profile', 'email'],
// 	permissions: ['public_profile', 'email'], // add more permissions as you need
// }

// export const AuthProvider = ({ children }) => {
// 	const [error, setError] = useState(null) // notes
// 	const [user, setUser] = useState(null) // notes
// 	const [loadingInitial, setLoadingInitial] = useState(true) // notes
// 	const [loading, setLoading] = useState(false) // notes

// 	useEffect(() => {
// 		const unsub = onAuthStateChanged(auth, () => {
// 			if (user) {
// 				// user is logged in
// 				setUser(user)
// 			} else {
// 				// user is not logged out
// 				setUser(null)
// 			}

// 			setLoadingInitial(false)
// 		})

// 		return unsub()
// 	}, [])

// 	const signInWithGoogle = async () => {
// 		setLoading(true)

// 		// .then and .catch version
// 		await Google.logInAsync
// 			.then(async (logInResult) => {
// 				if (loginResult.type === 'success') {
// 					const { idToken, accessToken } = loginResult
// 					const credential = GoogleAuthProvider.credential(idToken, accessToken)
// 					await signInWithCredential(auth, credential)
// 				}
// 			})
// 			.catch((error) => {
// 				setError(error)
// 			})
// 			.finally(() => {
// 				setLoading(false)
// 			})

// 		// async and await version
// 		const loginResult = await Google.logInAsync(config)
// 		try {
// 			if (loginResult.type === 'success') {
// 				const { idToken, accessToken } = loginResult
// 				const credential = GoogleAuthProvider.credential(idToken, accessToken)
// 				await signInWithCredential(auth, credential)
// 			}
// 			return Promise.reject()
// 		} catch (error) {
// 			setError(error)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const logout = async () => {
// 		setLoading(true)

// 		// .then and .catch version
// 		signOut(auth)
// 			.catch((error) => setError(error))
// 			.finally(() => setLoading(false))

// 		// async and await version
// 		try {
// 			await signOut(auth)
// 		} catch (error) {
// 			setError(error)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const memoedValue = useMemo(() => {
// 		return {
// 			user,
// 			loading,
// 			error,
// 			signInWithGoogle,
// 			logout,
// 		}
// 	}, [user, loading, error])

// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				memoedValue,
// 			}}
// 		>
// 			{!loadingInitial && children}
// 		</AuthContext.Provider>
// 	)
// }

// export default function useAuth() {
// 	return useContext(AuthContext)
// }
