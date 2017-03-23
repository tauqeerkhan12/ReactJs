import actionTypes from '../Reducers/actionTypes'
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';


export function SignUp(userSignUp){
    return dispatch=>{
        dispatch(newUserAction());
        // console.log("actiontype userSignUp",userSignUp)
        firebase.auth()
            .createUserWithEmailAndPassword(userSignUp.email, userSignUp.password)
            .then((user) => {
                let firebaseData={
                    email: userSignUp.email
                };
                firebase.database().ref('CrimeAppUsers/' + user.uid).set(firebaseData)
                    .then(() => {
                        console.log("SignUp Completed")
                        // console.log(userUth);
                    });
            })
            .catch((error) => {
                // var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }
}
export function SignIn(userSignIn){
    return dispatch =>{
        firebase.auth()
            .signInWithEmailAndPassword(userSignIn.email, userSignIn.password)
            .then((user) => {
                dispatch(signInUpdate());
                // console.log(user);
                browserHistory.push('/home');
            })
            .catch((error) => {
                // var errorCode = error.code;
                var errorMessage = error.message;
                // var errorMessage = "The email address or password you entered is not valid";
                console.log(errorMessage);
            });
    }
}

export function LogOutAction(){
    return dispatch =>{
         
        firebase.auth().signOut()
        .then(function() {
            dispatch(signInUpdate());
            browserHistory.push('/signin');
        }).catch(function(error) {
            console.log('Server error');
        });
    }   
}

function newUserAction(){
    return{
        type: actionTypes.GetUserInfo
    }
}

function signInUpdate(){
    return{
        type: actionTypes.SiginUpadte
    }
}