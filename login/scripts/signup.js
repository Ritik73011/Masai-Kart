import { ref, onValue, set, remove, database, update } from "../../config.js";

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "../../config.js";


function onSignInSubmit() {

    document.getElementById("btn2").addEventListener("click", () => {
        // console.log("hello")
        // const appVerifier = window.recaptchaVerifier;
        // const phoneNum = "+16505551234";
        // const auth = getAuth();
        // signInWithPhoneNumber(auth, phoneNum, appVerifier)
        //     .then((confirmationResult) => {
        //         // SMS sent. Prompt user to type the code from the message, then sign the
        //         // user in with confirmationResult.confirm(code).
        //         window.confirmationResult = confirmationResult;
        //         // ...
        //         alert("hello")
        //     }).catch((error) => {
        //         // Error; SMS not sent
        //         // ...
        //         console.log(error)
        //     });

    })
}

const auth = getAuth();
// window.recaptchaVerifier = new RecaptchaVerifier('captcha', {}, auth);
window.recaptchaVerifier = new RecaptchaVerifier('captcha', {
    'size': 'normal',
    'callback': (response) => {
        const appVerifier = window.recaptchaVerifier;
        const phoneNum = "+16505551234";
        // const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNum, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
                alert("hello")
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error)
            });
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      // ...
    }
  }, auth);


