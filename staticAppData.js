import { TextInput } from 'react-native'

export const users = [
	{
		name: 'Andrew',
		id: '1',
		image: require('./assets/drunk-images/Brandon-1.png'),
	},
	{
		name: 'Brandon',
		id: '2',
		image: require('./assets/drunk-images/Brandon-2.png'),
	},
	{
		name: 'Donovan',
		id: '3',
		image: require('./assets/drunk-images/Donovan.png'),
	},
	{
		name: 'Duong',
		id: '4',
		image: require('./assets/drunk-images/Duong.png'),
	},
	{
		name: 'Johnny',
		id: '5',
		image: require('./assets/drunk-images/Brandon-1.png'),
	},
	{
		name: 'Naren',
		id: '6',
		image: require('./assets/drunk-images/Brandon-1.png'),
	},
	{
		name: 'Nicky',
		id: '7',
		image: require('./assets/drunk-images/Nicky.png'),
	},
	{
		name: 'Ricky',
		id: '8',
		image: require('./assets/drunk-images/Ricky.png'),
	},
	{
		name: 'Joseph',
		id: '9',
		image: require('./assets/drunk-images/Brandon-1.png'),
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
