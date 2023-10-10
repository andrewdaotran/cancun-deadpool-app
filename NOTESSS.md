- admin buttons

  - allowing for resetting all async storage
  - allow to see everyones stats
  - remove ability for people to change over unders and deadpool

- X results design

- X allow for changes to people's over/unders

- push all data from staticAppData to database and pull as admin to allow for changes

- X Input correct answers

  - Push to database

- change all buttons to push data to database

- Change colors of buttons and other things based on what was clicked

Database

- users
  - name
    id
    profileChosen
    overUnder
    answerOne
    answerTwo
    overUnderAnswers: [
    { name: 'Andrew', answer: false },
    { name: 'Brandon', answer: false },
    { name: 'Donovan', answer: false },
    { name: 'Duong', answer: false },
    { name: 'Johnny', answer: false },
    { name: 'Joseph', answer: false },
    { name: 'Naren', answer: false },
    { name: 'Nicky', answer: false },
    { name: 'Robert', answer: false },
    ],
- adminPowers
  - async storage
  - see stats
  - disable questions
- results
  answerOne
  answerTwo
  overUnderAnswers: [
  { name: 'Andrew', answer: false },
  { name: 'Brandon', answer: false },
  { name: 'Donovan', answer: false },
  { name: 'Duong', answer: false },
  { name: 'Johnny', answer: false },
  { name: 'Joseph', answer: false },
  { name: 'Naren', answer: false },
  { name: 'Nicky', answer: false },
  { name: 'Robert', answer: false },
  ],

10/09/23

- Need to fix results.overUnderAnswers[index + 1].answer in className in ResultsCard,js
