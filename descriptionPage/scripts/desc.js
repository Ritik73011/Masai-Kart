
function changeImg(id,listener){
    document.getElementById(id).addEventListener(listener,()=>{
        let src=document.getElementById(id).src;
        document.getElementById("bigImg").src=src;
    })
}
changeImg("smallImg1","mouseover")
changeImg("smallImg2","mouseover")
changeImg("smallImg3","mouseover")
changeImg("smallImg1","click")
changeImg("smallImg2","click")
changeImg("smallImg3","click")


