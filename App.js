import { StyleSheet, Text, View } from 'react-native'
import StackNavigator from './StackNavigator'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { UserProvider } from './context/UserContext'
import { AdminProvider } from './context/AdminContext'

export default function App() {
	const navTheme = DefaultTheme
	navTheme.colors.background = '#111827'

	return (
		<UserProvider>
			<AdminProvider>
				<NavigationContainer theme={navTheme}>
					<StackNavigator />
				</NavigationContainer>
			</AdminProvider>
		</UserProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react'

// import {
// 	SafeAreaView,
// 	ScrollView,
// 	StatusBar,
// 	Text,
// 	useColorScheme,
// 	View,
// } from 'react-native'

// import {
// 	DebugInstructions,
// 	Header,
// 	LearnMoreLinks,
// 	ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen'

// const Section = ({ children, title }) => {
// 	const isDarkMode = useColorScheme() === 'dark'
// 	return (
// 		<View className='mt-8 px-2'>
// 			<Text className='text-2xl text-black dark:text-white'>{title}</Text>

// 			<Text className='mt-2 text-lg text-black dark:text-white'>
// 				{children}
// 			</Text>
// 		</View>
// 	)
// }

// const App = () => {
// 	const isDarkMode = useColorScheme() === 'dark'

// 	const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900'

// 	return (
// 		<SafeAreaView className={backgroundStyle}>
// 			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
// 			<ScrollView
// 				contentInsetAdjustmentBehavior='automatic'
// 				className={backgroundStyle}
// 			>
// 				<Header />

// 				<View className='bg-white dark:bg-black'>
// 					<Section title='Step One'>
// 						Edit <Text className='font-bold'>App.js</Text> to change this screen
// 						and then come back to see your edits.
// 					</Section>
// 					<Section title='See Your Changes'>
// 						<ReloadInstructions />
// 					</Section>
// 					<Section title='Debug'>
// 						<DebugInstructions />
// 					</Section>
// 					<Section title='Learn More'>
// 						Read the docs to discover what to do next:
// 					</Section>
// 					<LearnMoreLinks />
// 				</View>
// 			</ScrollView>
// 		</SafeAreaView>
// 	)
// }

// export default App
