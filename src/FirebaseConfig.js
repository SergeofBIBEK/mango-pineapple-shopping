import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCmXr6gS44SZ9zWkTeixX0C9gr6XKq343U",
    authDomain: "shopping-a2fb2.firebaseapp.com",
    databaseURL: "https://shopping-a2fb2.firebaseio.com",
    projectId: "shopping-a2fb2",
    storageBucket: "shopping-a2fb2.appspot.com",
    messagingSenderId: "1028552578785"
};

export default firebase.initializeApp(firebaseConfig);

let uiConfig = {
    signInSuccessUrl: '/',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '/'
};

let ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', uiConfig);