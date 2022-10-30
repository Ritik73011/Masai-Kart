import { ref, onValue, set, remove, database, update } from "../../config.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../config.js";

document.getElementById("btn2").addEventListener("click", () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    createUser(email, password);
})
function createUser(email, password) {
    console.log(email, password)
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
}




