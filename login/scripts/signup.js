import { ref, onValue, set, remove, database, update } from "../../config.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../config.js";

document.getElementById("btn2").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    createUser(name, email, password);
})
function createUser(name, email, password) {
    console.log(email, password)
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const myUid = user.uid;
            set(ref(database, "userInfo/" + myUid), {
                name: name,
                email: email
            })
            alert(user);
            // console.log(user.uid);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
}




