import { View, Text, TouchableOpacity, Image } from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { users } from '../staticAppData'
import UserContext from '../context/UserContext'

const ResultsCard = ({ user }) => {
	const [isLoading, setIsLoading] = useState(true)
	const navigation = useNavigation()

	const { results } = useContext(UserContext)

	const userOverUnderAnswers = user.overUnderAnswers

	// Pull data everyone pushed to database

	const drinksDifferenceCalculations = () => {
		return String(user.answerTwo - results.answerTwo)
	}

	const totalOverUnder = () => {
		let total = 0
		console.log(
			results.overUnderAnswers[2].answer === user.overUnderAnswers[2].answer
		)
		user.overUnderAnswers.forEach((answer, index) => {
			if (results.overUnderAnswers[index].answer) {
				if (answer.answer === results.overUnderAnswers[index].answer) {
					total += 1
					console.log(results.overUnderAnswers[total].answer)
				}
			}
		})
		return total
	}

	// totalOverUnder()

	useEffect(() => {
		if (results.overUnderAnswers) {
			setIsLoading(false)
		}
	}, [results])

	return (
		<>
			{isLoading && <Text className='text-white'>Loading...</Text>}
			{!isLoading && (
				<View className='bg-gray-600 align-center mb-4 rounded-md p-4 text-white'>
					<Text className='text-center text-lg mb-2 text-white font-bold'>
						{user.name}
					</Text>
					<View className=''>
						{/* if the answer matches the name then green, if not then red */}
						<View className='flex-row  mb-2 justify-evenly'>
							<Text className=' text-white'>
								<Text className='font-semibold'>
									Dead First:
									<Text
										className={`${
											user.answerOne === results.answerOne
												? 'text-green-400'
												: 'text-red-400'
										}`}
									>
										{user.answerOne ? ' ' + user.answerOne : ' No one'}
									</Text>
								</Text>
							</Text>
							<Text className=' text-white'>
								<Text className='font-semibold'>Drinks: </Text>
								<Text className={``}>
									{user.answerTwo ? String(user.answerTwo) : '0'}
								</Text>
							</Text>
						</View>

						<View className=''>
							<Text className=' text-white text-center font-semibold'>
								Difference:
								<Text
									className={`${
										Math.abs(Number(drinksDifferenceCalculations())) <= 3
											? 'text-green-400'
											: 'text-red-400'
									} text-white`}
								>
									{drinksDifferenceCalculations() > 0
										? ` +${drinksDifferenceCalculations()}`
										: ' ' + drinksDifferenceCalculations()}
								</Text>
							</Text>
						</View>

						<Text className='text-center mb-2 text-lg text-white font-bold'>
							Over Unders
						</Text>
						<View className=' flex-row'>
							<View className='w-[50%] '>
								{user.overUnderAnswers.map((answer, index) => {
									if (index > 4) return

									return (
										<Text className='mb-1 text-white' key={index}>
											<Text className='font-semibold'>{answer.name}: </Text>
											<Text
												className={`${
													answer.answer ===
													results.overUnderAnswers[index + 1].answer
														? 'text-green-400'
														: 'text-red-400'
												}`}
											>
												{answer.answer + ' '}
											</Text>
											<Text>
												{users.map((user) => {
													if (user.name === answer.name) {
														return user.overUnder
													}
												})}
											</Text>
										</Text>
									)
								})}
							</View>
							<View className='w-[50%] mb-4'>
								{user.overUnderAnswers.map((answer, index) => {
									if (index < 5) return

									return (
										<Text className='mb-1 text-white' key={index}>
											<Text className='font-semibold'>{answer.name}: </Text>
											<Text
												className={`${
													answer.answer ===
													results.overUnderAnswers[index + 1].answer
														? 'text-green-400'
														: 'text-red-400'
												}`}
											>
												{answer.answer + ' '}
											</Text>
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
						<View className='flex-row  justify-center mt-2 '>
							<Text className=' text-white '>
								<Text className='font-semibold'>
									Total over/unders correct:{' '}
								</Text>
								<Text
								// className={`${
								// 	totalOverUnder() <= 3
								// 		? 'text-red-400'
								// 		: totalOverUnder() > 3 && totalOverUnder() <= 6
								// 		? 'text-yellow-400'
								// 		: 'text-green-400'
								// }`}
								>
									{/* {totalOverUnder()} */}
								</Text>
							</Text>
						</View>
					</View>
				</View>
			)}
		</>
	)
}

export default ResultsCard
