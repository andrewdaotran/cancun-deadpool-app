import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native'
import React, { Fragment, useEffect, useRef, useState, useContext } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { users } from '../staticAppData'

import { names, filterUsers } from '../utils'

import UserContext from '../context/UserContext'
import AdminContext from '../context/AdminContext'

const ProfileScreen = () => {
	const { getUserFromStorage, userData, filteredUsers } =
		useContext(UserContext)

	const [dieFirst, setDieFirst] = useState(userData.answerOne)
	const [dieFirstShots, setDieFirstShots] = useState(userData.answerTwo)

	// const [userName, setUserName] = useState('')

	const {
		showResults,
		toggleShowResults,
		allowClearStorage,
		toggleAllowClearStorage,
		disableAnswers,
		toggleDisableAnswers,
	} = useContext(AdminContext)

	useEffect(() => {
		getUserFromStorage()
	}, [])

	return (
		<ScrollView className='mt-4'>
			{/* Andrew Admin Buttons */}
			{userData.name === 'Andrew' && (
				<View className='flex flex-row w-full justify-evenly items-center flex-wrap'>
					{/* Show Results */}
					<TouchableOpacity
						className=' p-4 rounded-md bg-gray-300'
						onPress={toggleShowResults}
					>
						<Text className='text-center '>
							{showResults ? 'Hide Results' : 'Show Results'}
						</Text>
					</TouchableOpacity>

					{/* Show Results End */}
					{/* Allow clear storage */}
					<TouchableOpacity
						className=' p-4 rounded-md bg-gray-300'
						onPress={toggleAllowClearStorage}
					>
						<Text className='text-center '>
							{allowClearStorage
								? 'Turn Off Clear Storage'
								: 'Turn On Clear Storage'}
						</Text>
					</TouchableOpacity>
					{/* Allow clear storage end */}
					{/* Disable Answers */}
					<TouchableOpacity
						className=' p-4 rounded-md bg-gray-300'
						onPress={toggleDisableAnswers}
					>
						<Text className='text-center '>
							{disableAnswers ? 'Allow Answers' : 'Disable Answers'}
						</Text>
					</TouchableOpacity>
					{/* Disable Answers End*/}
				</View>
			)}

			{/* Question 1 */}
			<View className='bg-white  rounded-lg items-center justify-center mx-10 p-4 '>
				<Text className='text-center pb-4'>
					Who do you think will die first?
				</Text>
				<View className='mx-auto'>
					<RNPickerSelect
						style={pickerSelectStyles}
						disabled={disableAnswers}
						placeholder={{ label: 'Select a name...', value: null }}
						onValueChange={(value) => setDieFirst(value)}
						items={names.map((name) => {
							return { label: name, value: name }
						})}
					/>
				</View>
			</View>

			{/* Question 2 need to fix to have keyboard popup and only allow numbers*/}
			<View className='bg-white  rounded-lg items-center justify-center mx-10 p-4 mt-4 '>
				<Text className='text-center pb-4'>
					How many shots/drinks will it take for{' '}
					{dieFirst ? (
						<Text className='text-red-500'>{dieFirst}</Text>
					) : (
						'the first person'
					)}{' '}
					to die?
				</Text>

				<TextInput
					className='border border-gray-400 w-fit py-2 px-4  text-center rounded-md'
					placeholder='Enter a number...'
					value={dieFirstShots}
					onChange={(e) => {
						setDieFirstShots(e.target.value)
					}}
					keyboardType='numeric'
					underlineColorAndroid='transparent'
					editable={!disableAnswers}
					selectTextOnFocus={!disableAnswers}
				/>
			</View>

			{/* Question 3 need to filter your own name*/}

			{filteredUsers.map((user) => {
				return (
					<Fragment key={user.id}>
						<View className='bg-white  rounded-lg items-center justify-center mx-10 py-4 mt-4'>
							<View className='flex-row  w-full justify-center '>
								{/* <Image source={user.image} className='h-full w-16 mr-8' /> */}
								<View className=' '>
									<Text className='text-center text-2xl font-bold  '>
										{user.name}
									</Text>
									{/* <Text className='text-sm text-center text-gray-400'>
										30 years old
									</Text> */}
								</View>
							</View>
							<View className='flex flex-row w-full justify-evenly items-center'>
								<TouchableOpacity
									className=' p-4 rounded-md bg-gray-300'
									disabled={disableAnswers}
								>
									<Text>Over</Text>
								</TouchableOpacity>
								<View className=''>
									<Text className='text-center mb-1'>Shots/Drinks</Text>
									<Text className='text-center text-2xl font-bold'>
										{String(user.overUnder)}
									</Text>
								</View>
								<TouchableOpacity
									className='p-4  rounded-md bg-gray-300'
									disabled={disableAnswers}
								>
									<Text>Under</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Fragment>
				)
			})}
		</ScrollView>
	)
}

export default ProfileScreen

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: 'rgb(156 163 175)',
		borderRadius: 8,
		color: 'black',
		// paddingRight: 30,
	},
	inputAndroid: {
		paddingHorizontal: 8,
		paddingVertical: 12,
		borderWidth: 0.5,
		borderColor: 'rgb(156 163 175)',
		borderRadius: 8,
		color: 'black',
		// paddingRight: 30,
	},
})
