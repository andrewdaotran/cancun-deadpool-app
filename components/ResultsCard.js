import { View, Text, TouchableOpacity, Image } from 'react-native'

import React from 'react'
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { users } from '../staticAppData'

const ResultsCard = ({ user }) => {
	const navigation = useNavigation()

	// Pull data everyone pushed to database

	return (
		<View className='bg-gray-300 align-center mb-4 rounded-md p-4 '>
			<Text className='text-center text-lg mb-2'>{user.name}</Text>
			<View className=''>
				{/* if the answer matches the name then green, if not then red */}
				<View className='flex-row  mb-2'>
					<Text className='w-[50%]'>
						Dead First: {user.answerOne ? user.answerOne : 'No one'}
					</Text>
					<Text className='w-[50%]'>
						Drinks: {user.answerTwo ? String(user.answerTwo) : '0'}
					</Text>
				</View>
				<Text className='text-center mb-2 text-lg'>Over Unders</Text>
				<View className=' flex-row'>
					<View className='w-[50%]'>
						{user.overUnderAnswers.map((answer, index) => {
							if (index > 4) return
							return (
								<Text className='mb-1'>
									{answer.name}: {answer.answer ? 'Over' : 'Under'}{' '}
									{users.map((user) => {
										if (user.name === answer.name) {
											return user.overUnder
										}
									})}
								</Text>
							)
						})}
					</View>
					<View className='w-[50%] mb-4'>
						{user.overUnderAnswers.map((answer, index) => {
							if (index < 5) return
							return (
								<Text className='mb-1'>
									{answer.name}: {answer.answer ? 'Over' : 'Under'}{' '}
									{users.map((user) => {
										if (user.name === answer.name) {
											return user.overUnder
										}
									})}
								</Text>
								// </View>
							)
						})}
					</View>
				</View>
				<View className='flex-row '></View>
			</View>
		</View>
	)
}

export default ResultsCard