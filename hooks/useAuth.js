// hooks/useAuth.js
import { View, Text } from 'react-native'
import { createContext, useContext } from 'react'

// import * as Google from 'expo-google-app-auth'

const AuthContext = createContext({})

const config = {
	iosClientId: '', // go into your GoogleServices-Info.plist and copy the string value for CLIENT_ID
	androidClientId: '', // go into your google-services.json and copy the string value for client_id
	scopes: ['profile', 'email'],
	permissions: ['public_profile', 'email'], // add more permissions as you need
}

export const AuthProvider = ({ children }) => {
	const signInWithGoogle = async () => {
		const loginResult = await Google.logInAsync(config)
		if (loginResult.type === 'success') {
			return loginResult.accessToken
			// login..
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user: 'Andrew', // temporary data
				signInWithGoogle,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	return useContext(AuthContext)
}
