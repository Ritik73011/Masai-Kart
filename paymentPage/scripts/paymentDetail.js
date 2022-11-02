

document.getElementById("proceedBtn").addEventListener("click",()=>{

    let name=document.getElementById("name").value;
    let number=document.getElementById("number").value;
    let exp=document.getElementById("exp").value
    let cvv=document.getElementById("cvv").value;

    if(number.length!=16){
        alert("Invalid Card Number!");
    } else if(cvv.length!=3){
        alert("Invalid CVV");
    } else {
        document.getElementById("main_container").style.display="block"
        document.getElementById("bankMain").style.display="none"
        document.getElementById("payFrom").style.display="none"
        let givenOtp=Math.floor(Math.random()*10000);
        setTime("Your OTP is " + givenOtp*1 ,1000)
        
    }
})

//otp

document.getElementById("otpBtn").addEventListener("click",()=>{

    let myOtp=document.getElementById("otp").value;
    if(myOtp!="1234"){
        alert("Wrong OTP!");
    } else {
        // setTime("Payment Successfull",2000);
        alert("Payment Successfull")
        document.getElementById("main_container").style.display="none";
        document.getElementById("paymentSuccess").style.display="block";

    }
})

function setTime(msg,delay){
    setTimeout(() => {
        document.getElementById("otpGenerate").innerText=msg;
    }, delay);
}
// location.href="../index.html";
