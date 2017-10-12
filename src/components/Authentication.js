import firebase from '../FirebaseConfig.js';

import React, { Component } from 'react';

import App from '../App';
import Header from './Header';
import Footer from './Footer';

class Authentication extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signInStatus: false,
            displayName: "",
            email: "",
            emailVerified: "",
            photoURL: "",
            uid: "",
            providerData: "",
        }

    }

    componentWillMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.setState({
                    signInStatus: true,
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL || 'https://openclipart.org/download/237991/users81.svg',
                    uid: user.uid,
                    providerData: user.providerData,
                })
                document.getElementById("firebaseui-auth-container").style.display = "none";
            } else {
                // User is signed out.
                this.setState({
                    signInStatus: false,
                    displayName: "",
                    email: "",
                    emailVerified: "",
                    photoURL: "",
                    uid: "",
                    providerData: "",
                })
                document.getElementById("firebaseui-auth-container").style.display = "flex";
            }
        }, (error) => {console.log(error);});
    }

    render() {

        let { signInStatus, displayName, email, emailVerified, photoURL, uid, providerData } = this.state;

        return (
            <div>
                {
                    signInStatus ? 
                        <App
                            displayName={displayName}
                            email={email}
                            emailVerified={emailVerified}
                            photoURL={photoURL}
                            uid={uid}
                            providerData={providerData}
                            /> : 
                        (<div><Header />
                        <Footer/></div>)
                        
                }
            </div>
        )
    }

}

export default Authentication;