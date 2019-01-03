import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import config from './fire-config.json'

firebase.initializeApp(config[process.env.NODE_ENV])

export default firebase
