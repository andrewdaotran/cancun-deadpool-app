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
import { FontAwesome } from '@expo/vector-icons'

import { users } from '../staticAppData'

import { names, filterUsers } from '../utils'

import UserContext from '../context/UserContext'
import AdminContext from '../context/AdminContext'

const ProfileScreen = () => {
	const {
		userData,
		selectAnswer,
		selectOverUnderAnswer,
		allUsers,
		results,
		andrewInputAnswers,
		andrewInputOverUnderAnswer,
	} = useContext(UserContext)

	const [dieFirst, setDieFirst] = useState(userData.answerOne)
	const [dieFirstShots, setDieFirstShots] = useState(userData.answerTwo)

	const {
		showResults,
		toggleShowResults,
		allowClearStorage,
		toggleAllowClearStorage,
		disableAnswers,
		toggleDisableAnswers,
		inputResults,
		toggleInputResults,
	} = useContext(AdminContext)

	useEffect(() => {
		if (inputResults) {
			setDieFirst(results.answerOne)
			setDieFirstShots(results.answerTwo)
			return
		}

		setDieFirst(userData.answerOne)
		setDieFirstShots(userData.answerTwo)
	}, [inputResults])

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
					{/* Input Results */}
					<TouchableOpacity
						className=' p-4 rounded-md bg-gray-300'
						onPress={toggleInputResults}
					>
						<Text className='text-center '>
							{inputResults ? 'Back to Default' : 'Input Results'}
						</Text>
					</TouchableOpacity>
					{/* Input Results End*/}
				</View>
			)}

			{/* Question 1 */}
			<View className=' bg-gray-600 rounded-lg items-center justify-center mx-10 p-4 '>
				<Text className='text-center pb-4 text-white'>
					{inputResults
						? 'Who died first?'
						: 'Who do you think will die first?'}
				</Text>
				<View className='mx-auto'>
					<RNPickerSelect
						style={pickerSelectStyles}
						disabled={disableAnswers}
						value={dieFirst}
						placeholder={{ label: 'Select a name...', value: null }}
						onValueChange={(value) => {
							setDieFirst(value)
							if (inputResults) {
								andrewInputAnswers('answerOne', value)
								return
							}
							selectAnswer('answerOne', value)
						}}
						items={names.map((name) => {
							return { label: name, value: name }
						})}
					/>
				</View>
			</View>

			{/* Question 2 need to fix to have keyboard popup and only allow numbers*/}
			<View className=' bg-gray-600  rounded-lg items-center justify-center mx-10 p-4 mt-4 '>
				<Text className='text-center pb-4 text-white'>
					How many shots/drinks {inputResults ? 'did' : 'will'} it take for{' '}
					{dieFirst ? (
						<Text className='text-red-400 font-bold'>{dieFirst}</Text>
					) : (
						'the first person'
					)}{' '}
					to die?
				</Text>

				<TextInput
					className='border border-gray-400 w-fit py-2 px-4  text-center rounded-md text-white'
					placeholder='Enter a number...'
					placeholderTextColor={'#fff'}
					value={String(dieFirstShots)}
					onChangeText={(value) => {
						setDieFirstShots(Number(value))
						if (inputResults) {
							andrewInputAnswers('answerTwo', Number(value))
							return
						}

						selectAnswer('answerTwo', Number(value))
					}}
					keyboardType='numeric'
					underlineColorAndroid='transparent'
					editable={!disableAnswers}
					selectTextOnFocus={!disableAnswers}
				/>
			</View>

			{/* Question 3 need to filter your own name*/}

			<View className='mb-8'>
				{userData.name &&
					!inputResults &&
					userData.overUnderAnswers.map((user) => {
						if (user.name === userData.name && !inputResults) return null

						return (
							<Fragment key={user.id}>
								<View className=' rounded-lg items-center justify-center mx-10 py-4  my-4   bg-gray-600'>
									<View className='flex-row  w-full justify-center '>
										<View className=' '>
											<Text className='text-center text-2xl font-bold text-white '>
												{user.name}
											</Text>
										</View>
									</View>
									<View className='flex flex-row w-full justify-evenly items-center'>
										<TouchableOpacity
											className={`p-4  rounded-md bg-gray-300 ${
												user.answer === 'Over' && 'bg-blue-400'
											}`}
											disabled={disableAnswers}
											onPress={() => {
												selectOverUnderAnswer(user.name, 'Over')
											}}
										>
											<FontAwesome name='arrow-up' size={24} color='black' />
										</TouchableOpacity>
										<View className=''>
											<Text className='text-center mb-1 text-white'>
												Shots/Drinks
											</Text>
											<Text className='text-center text-2xl font-bold text-white'>
												{String(
													allUsers.filter((u) => u.name === user.name)[0]
														.overUnder
												)}
											</Text>
										</View>
										<TouchableOpacity
											className={`p-4  rounded-md bg-gray-300 ${
												user.answer === 'Under' && 'bg-blue-400'
											}`}
											disabled={disableAnswers}
											onPress={() => {
												selectOverUnderAnswer(user.name, 'Under')
											}}
										>
											<FontAwesome name='arrow-down' size={24} color='black' />
										</TouchableOpacity>
									</View>
								</View>
							</Fragment>
						)
					})}
				{inputResults &&
					results.overUnderAnswers.map((user) => {
						if (user.name === userData.name && !inputResults) return null

						return (
							<Fragment key={user.id}>
								<View className=' rounded-lg items-center justify-center mx-10 py-4  my-4   bg-gray-600'>
									<View className='flex-row  w-full justify-center '>
										<View className=' '>
											<Text className='text-center text-2xl font-bold text-white '>
												{user.name}
											</Text>
										</View>
									</View>
									<View className='flex flex-row w-full justify-evenly items-center'>
										<TouchableOpacity
											className={`p-4  rounded-md bg-gray-300 ${
												user.answer === 'Over' && 'bg-blue-400'
											}`}
											disabled={disableAnswers}
											onPress={() => {
												andrewInputOverUnderAnswer(user.name, 'Over')
											}}
										>
											<FontAwesome name='arrow-up' size={24} color='black' />
										</TouchableOpacity>
										<View className=''>
											<Text className='text-center mb-1 text-white'>
												Shots/Drinks
											</Text>
											<Text className='text-center text-2xl font-bold text-white'>
												{String(
													allUsers.filter((u) => u.name === user.name)[0]
														.overUnder
												)}
											</Text>
										</View>
										<TouchableOpacity
											className={`p-4  rounded-md bg-gray-300 ${
												user.answer === 'Under' && 'bg-blue-400'
											}`}
											disabled={disableAnswers}
											onPress={() => {
												andrewInputOverUnderAnswer(user.name, 'Under')
											}}
										>
											<FontAwesome name='arrow-down' size={24} color='black' />
										</TouchableOpacity>
									</View>
								</View>
							</Fragment>
						)
					})}
			</View>
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
		color: 'white',

		// paddingRight: 30,
	},
	inputAndroid: {
		paddingHorizontal: 8,
		paddingVertical: 12,
		borderWidth: 0.5,
		borderColor: 'rgb(156 163 175)',
		borderRadius: 8,
		color: 'white',
		// paddingRight: 30,
	},
})
