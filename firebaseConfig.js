import { getFirestore } from 'firebase/firestore'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyCIAhDyexWBxBdSZ9ok7EzLFvApImRsn3k',
	authDomain: 'cancun-deadpool-app.firebaseapp.com',
	databaseURL: 'https://cancun-deadpool-app-default-rtdb.firebaseio.com',
	projectId: 'cancun-deadpool-app',
	storageBucket: 'cancun-deadpool-app.appspot.com',
	messagingSenderId: '363456261395',
	appId: '1:363456261395:web:607a3be9d3801098843ee6',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
