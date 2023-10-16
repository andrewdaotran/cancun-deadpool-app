import { View, Text, TouchableOpacity, Image } from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { users } from '../staticAppData'
import UserContext from '../context/UserContext'

const ResultsCard = ({ user, isSoloResult }) => {
	const [isLoading, setIsLoading] = useState(true)
	const navigation = useNavigation()

	const { results } = useContext(UserContext)

	// Pull data everyone pushed to database

	const drinksDifferenceCalculations = () => {
		return String(user.answerTwo - results.answerTwo)
	}

	const totalOverUnder = () => {
		let total = 0
		user.overUnderAnswers.forEach((answer, index) => {
			const overUnderUser = results.overUnderAnswers.filter(
				(user) => user.name === answer.name
			)[0]
			if (results.overUnderAnswers[index].answer) {
				if (answer.answer === overUnderUser.answer) {
					total += 1
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
						{isSoloResult ? 'Final Results' : user.name}
					</Text>
					<View className=''>
						{/* if the answer matches the name then green, if not then red */}
						<View className='flex-row  mb-2 justify-evenly'>
							<Text className=' text-white'>
								<Text className='font-semibold'>
									Dead First:
									<Text
										className={`${
											!isSoloResult && user.answerOne === results.answerOne
												? 'text-green-400'
												: 'text-red-400'
										}`}
									>
										{!isSoloResult && user.answerOne
											? ' ' + user.answerOne
											: ' No one'}
									</Text>
								</Text>
							</Text>
							<Text className=' text-white'>
								<Text className='font-semibold'>Drinks: </Text>
								<Text className={``}>
									{!isSoloResult && user.answerTwo
										? String(user.answerTwo)
										: '0'}
								</Text>
							</Text>
						</View>
						{!isSoloResult && (
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
						)}

						<Text className='text-center mb-2 text-lg text-white font-bold'>
							Over Unders
						</Text>
						<View className=' flex-row'>
							{isSoloResult && (
								<>
									<View className='w-[50%] '>
										{results.overUnderAnswers.map((answer, index) => {
											if (index > 4) return
											return (
												<Text className='mb-1 text-white' key={index}>
													<Text className='font-semibold'>{answer.name}: </Text>
													<Text>{answer.answer + ' '}</Text>
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
										{results.overUnderAnswers.map((answer, index) => {
											if (index < 5) return
											return (
												<Text className='mb-1 text-white' key={index}>
													<Text className='font-semibold'>{answer.name}: </Text>
													<Text>{answer.answer + ' '}</Text>
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
								</>
							)}
							{!isSoloResult && (
								<>
									<View className='w-[50%] '>
										{user.overUnderAnswers.map((answer, index) => {
											if (index > 4) return
											const overUnderUser = results.overUnderAnswers.filter(
												(user) => user.name === answer.name
											)[0]

											return (
												<Text className='mb-1 text-white' key={index}>
													<Text className='font-semibold'>{answer.name}: </Text>
													<Text
														className={`${
															isSoloResult &&
															answer.answer === overUnderUser.answer
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
											const overUnderUser = results.overUnderAnswers.filter(
												(user) => user.name === answer.name
											)[0]

											return (
												<Text className='mb-1 text-white' key={index}>
													<Text className='font-semibold'>{answer.name}: </Text>
													<Text
														className={`${
															answer.answer === overUnderUser.answer
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
											)
										})}
									</View>
								</>
							)}
						</View>
						{!isSoloResult && (
							<View className='flex-row  justify-center mt-2 '>
								<Text className=' text-white '>
									<Text className='font-semibold'>
										Total over/unders correct:{' '}
									</Text>
									{/* Total Over Under */}

									<Text
										className={`${
											totalOverUnder() <= 2
												? 'text-red-400'
												: totalOverUnder() > 2 && totalOverUnder() <= 5
												? 'text-yellow-400'
												: 'text-green-400'
										}`}
									>
										{totalOverUnder()}
									</Text>
								</Text>
							</View>
						)}
					</View>
				</View>
			)}
		</>
	)
}

export default ResultsCard
