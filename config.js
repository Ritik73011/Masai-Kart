
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    set,
    remove,
    update
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBLOv4GH_ix5BtYLuH_z9ANVy-p_PjgsQE",
    authDomain: "masai-kart-c9e16.firebaseapp.com",
    databaseURL: "https://masai-kart-c9e16-default-rtdb.firebaseio.com",
    projectId: "masai-kart-c9e16",
    storageBucket: "masai-kart-c9e16.appspot.com",
    messagingSenderId: "326956148653",
    appId: "1:326956148653:web:02a6f697882f9b9dc7a324"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { ref, onValue, set, remove, database, update };