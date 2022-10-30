import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../config.js";
import { GoogleAuthProvider, signInWithPopup } from "../../config.js";


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
    signinUser(email, password);
})
function signinUser(email, password) {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert(user.email)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
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
            alert(token, user);
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
            alert(errorMessage, email, credential);
        });
}

const auth1 = getAuth();
const user = auth1.currentUser;
if (user) {
    console.log("yes");
} else {
    console.log("no");
}
