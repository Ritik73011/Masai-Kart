let cardContainers = [...document.querySelectorAll("#mobileContainer, #fashionContainer, #productContainer, #bigSavingContainer")];
let preBtns = [...document.querySelectorAll(".pre-btn")];
let nxtBtns = [...document.querySelectorAll(".nxt-btn")];
cardContainers.forEach((items, i) => {
    let containerDimensions = items.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
    nxtBtns[i].addEventListener("click", () => {
        items.scrollLeft += containerWidth - 100;
    });
    preBtns[i].addEventListener("click", () => {
        items.scrollLeft -= containerWidth + 100;
    });
});