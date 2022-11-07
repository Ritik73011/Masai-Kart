import { ref, onValue, set, remove, database, update } from "../../config.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../config.js";
import showAlert from "../../popup_alert/alert.js"

document.getElementById("btn2").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name === "") {
        showAlert("Please enter your name!", "#FF6347", "#fff")
    } else if (email === "") {
        showAlert("Please enter your email!", "#FF6347", "#fff")
    } else if (password === "" && password.length < 6) {
        showAlert("Please enter valid password!", "#FF6347", "#fff")
    } else {
        createUser(name, email, password);
    }
})
function createUser(name, email, password) {
    //console.log(email, password)
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
            // alert(user);
            showAlert("Signup successfull", "#23d959", "#fff")
            window.location.href = "../../index.html";
            // console.log(user.uid);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showAlert(errorMessage, "#FF6347", "#fff")
            // alert(errorMessage)
            // ..
        });
}

document.getElementById("logoMasai").addEventListener("click", () => {
    window.location.href = "../../index.html";
});



