import React from 'react';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import './App.css'

firebase.initializeApp({
  apiKey: "AIzaSyB5-7jOOiVIW7H_xbfORuVyXOWWX0EEVkQ",
  authDomain: "my-first-auth-268804.firebaseapp.com"
})

class App extends React.Component {
state={
  isSignedIn: false
}

uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  callbacks:{
    signInSuccess: () => false
  }
}

componentDidMount = () => {
  firebase.auth().onAuthStateChanged(user => {
    this.setState({isSignedIn: !!user})
    console.log("user", user)
  })
}

render(){
  return (
    <div className="App">
      {this.state.isSignedIn ? (
        <>
        <br/> 
        <br/>
        <div>Signed In</div>
        <br/> 
        <br/>
        <button onClick={()=> firebase.auth().signOut()}>Sign Out</button>
        <h1>Welcome { firebase.auth().currentUser.displayName }</h1>
        <img alt="user" src={ firebase.auth().currentUser.photoURL }/>
        </>
      ) : (
        <>
        <br/> 
        <br/>
        <div className="uiConfig">
        <h2>Welcome to</h2>
        <h1>Waste Not, Want Not</h1>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
        </div>
        </>
      )}
    </div>
  )
}
}
export default App;
