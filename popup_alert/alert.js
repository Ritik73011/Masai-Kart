function showAlert(msg, backColor, color) {

    const containerBox = document.querySelector('body');

    let classAd;

    const customAlert = () => {
        const alertBox1 = document.createElement('div');
        const alertBox = document.createElement('div');
        alertBox.style.backgroundColor = backColor;
        alertBox.style.color = color;
        alertBox1.id = "alertBox";
        alertBox1.append(alertBox);
        containerBox.appendChild(alertBox1);
        alertBox.innerText = msg;

        classAd = alertBox.classList;
        classAd.add('custom-alert-box');


        const hideAlertBox = function () {
            alertBox.remove();
        };

        setTimeout(hideAlertBox, 2000);
    };

    customAlert();
}

export default showAlert;