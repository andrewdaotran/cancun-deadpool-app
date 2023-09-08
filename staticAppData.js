import { TextInput } from 'react-native'

export const users = [
	{
		name: 'Andrew',
		id: '1',
		image: require('./assets/drunk-images/Brandon-1.png'),
		overUnder: 7.5,
	},
	{
		name: 'Brandon',
		id: '2',
		image: require('./assets/drunk-images/Brandon-2.png'),
		overUnder: 12.5,
	},
	{
		name: 'Donovan',
		id: '3',
		image: require('./assets/drunk-images/Donovan.png'),
		overUnder: 5.5,
	},
	{
		name: 'Duong',
		id: '4',
		image: require('./assets/drunk-images/Duong.png'),
		overUnder: 8,
	},
	{
		name: 'Johnny',
		id: '5',
		image: require('./assets/drunk-images/Brandon-1.png'),
		overUnder: 11.5,
	},
	{
		name: 'Naren',
		id: '6',
		image: require('./assets/drunk-images/Brandon-1.png'),
		overUnder: 5,
	},
	{
		name: 'Nicky',
		id: '7',
		image: require('./assets/drunk-images/Nicky.png'),
		overUnder: 5.5,
	},
	{
		name: 'Ricky',
		id: '8',
		image: require('./assets/drunk-images/Ricky.png'),
		overUnder: 6.5,
	},
	{
		name: 'Joseph',
		id: '9',
		image: require('./assets/drunk-images/Brandon-1.png'),
		overUnder: 5.5,
	},
]

export const questions = [
	{
		question: 'Who will die first?',
		answerType: () => <TextInput />,
		id: '1',
	},
	{
		question: 'How many shots will ',
	},
]

export const names = users.map((user) => user.name)
