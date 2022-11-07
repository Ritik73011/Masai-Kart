import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../config.js";
import { GoogleAuthProvider, signInWithPopup } from "../../config.js";
import sendPasswordResetEmail from "../../config.js";
import showAlert from "../../popup_alert/alert.js"

document.getElementById("tosignup").addEventListener("click", () => {
    document.getElementById("mainL").style.display = "none";

    document.getElementById("mainL2").style.display = "flex";
})

document.getElementById("tologin").addEventListener("click", () => {
    document.getElementById("mainL").style.display = "flex";

    document.getElementById("mainL2").style.display = "none";
})

document.getElementById("btn").addEventListener("click", () => {
    let email = document.getElementById("emailL").value;
    let password = document.getElementById("passL").value;
    if (email === "") {
        showAlert("Please enter your email!", "#FF6347", "#fff")
    } else if (password === "" && password.length < 6) {
        showAlert("Please enter valid password!", "#FF6347", "#fff")
    } else {
        signinUser(email, password);
    }
})
function signinUser(email, password) {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            showAlert("Login successfull", "#23d959", "#fff");
            window.location.href = "../../index.html";
            
            // window.location.href="../../popup_alert/"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // alert(errorMessage)
            showAlert("Invalid Credential!!!", "#FF6347", "#fff")
        });
}

document.getElementById("googleImg").addEventListener("click", () => {
    signinWithGoogle();
})

function signinWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            showAlert("Signin Successfull", "#23d959", "#fff")
            window.location.href = "../../index.html";
            // alert(token, user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            showAlert("Signin Failed!", "#FF6347", "#fff")
            // alert(errorMessage, email, credential);
        });
}

const auth1 = getAuth();
const user = auth1.currentUser;


// FORGET PASSWORD

document.getElementById("cancel").addEventListener("click", () => {
    let div = document.getElementById("popup_box"); div.style.display = "none";
});

document.getElementById("forget").addEventListener("click", () => {
    let div = document.getElementById("popup_box"); div.style.display = "block";
});

document.getElementById("form2").addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("email2").value;

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            // alert("Password reset email sent!");
            showAlert("Password reset link has been successfully sent to your registered email address.", "#23d959", "#fff")
            let div = document.getElementById("popup_box");
            div.style.display = "none";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showAlert("SMS Sent Failed!", "#FF6347", "#fff")
            // alert(errorMessage);
        });
});