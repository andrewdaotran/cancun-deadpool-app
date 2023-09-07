import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Alert,
	Button,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import React, { useRef, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { names } from '../staticAppData'

const ProfileScreen = () => {
	const pickerRef = useRef(null)
	const [dieFirst, setDieFirst] = useState('')
	const [dieFirstShots, setDieFirstShots] = useState('')

	return (
		<ScrollView className='mt-4'>
			{/* Question 1 */}
			<View className='bg-white border border-gray-400 rounded-lg items-center justify-center mx-10 py-4 '>
				<Text className='text-center pb-4'>
					Who do you think will die first?
				</Text>
				<View className='mx-auto'>
					<RNPickerSelect
						// style={pickerSelectStyles}
						className='justify-center '
						placeholder={{ label: 'Select a name...', value: null }}
						onValueChange={(value) => setDieFirst(value)}
						items={names.map((name) => {
							return { label: name, value: name }
						})}
					/>
				</View>
			</View>

			{/* Question 2 need to fix to have keyboard popup and only allow numbers*/}
			<View className='bg-white border border-gray-400 rounded-lg items-center justify-center mx-10 py-4 mt-4'>
				<Text className='text-center pb-4'>
					How many shots/drinks will it take for{' '}
					{dieFirst ? dieFirst : 'the first person'} to die?
				</Text>

				<TextInput
					className='border border-gray-400 w-fit py-2 px-4  text-center rounded-md'
					placeholder='Enter a number...'
					value={dieFirstShots}
					onChange={(e) => {
						setDieFirstShots(e.target.value)
					}}
					keyboardType='numeric'
				/>
			</View>

			{/* Question 3 need to map over and remove your own name*/}
			<View className='bg-white border border-gray-400 rounded-lg items-center justify-center mx-10 py-4 mt-4'>
				<Text className='text-center pb-4 text-2xl font-bold'>Andrew</Text>
				<View className='bflex flex-row w-full justify-evenly items-center'>
					<TouchableOpacity className='border border-black p-4 rounded-md bg-gray-300'>
						<Text>Over</Text>
					</TouchableOpacity>
					<View className=''>
						<Text className='text-center mb-1'>Shots/Drinks</Text>
						<Text className='text-center text-2xl font-bold'>7.5</Text>
					</View>
					<TouchableOpacity className='p-4 border border-black rounded-md bg-gray-300'>
						<Text>Under</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}

export default ProfileScreen

// const pickerSelectStyles = StyleSheet.create({
// 	inputIOS: {
// 		fontSize: 16,
// 		paddingVertical: 12,
// 		paddingHorizontal: 10,
// 		borderWidth: 1,
// 		borderColor: 'gray',
// 		borderRadius: 4,
// 		color: 'black',
// 		paddingRight: 30,
// 	},
// 	inputAndroid: {
// 		fontSize: 16,
// 		paddingHorizontal: 10,
// 		paddingVertical: 8,
// 		borderWidth: 0.5,
// 		borderColor: 'purple',
// 		borderRadius: 8,
// 		color: 'black',
// 		paddingRight: 30,
// 	},
// })
