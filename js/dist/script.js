// $(document).ready(function() {
//     drawArc(document.getElementById('cvArc'), undefined, true, 5, 0.5, 'tomato')

//     $( ".hd__arrow" ).click(function() {
//         let scrH = document.querySelector('.hd').offsetHeight;

//         $('html, body').animate({
//             scrollTop: scrH
//         }, 200);
//     })


// })

// function drawArc(canv, r, lCap, lineW=5, perc="1", color="tomato") {
//   if (canv.getContext) {
//     let ctx = canv.getContext('2d');
//     let centCoord = Math.min(canv.width, canv.height) / 2;
//     if (r == undefined) r = centCoord - lineW;


//     if (perc > 1) {
//     	perc /= 100;
//     } else if (typeof perc == 'string' && perc.indexOf('%') != -1) {
// 			perc = perc.slice(0, -1) / 100;
//     }


// 		//alert(canv + ',' + r + ',' + lCap + ',' + lineW + ',' + perc + ',' + r  + ',' + color)

//   	ctx.beginPath();
//     ctx.arc(centCoord, centCoord, r, -.5 * Math.PI, perc * Math.PI*2- Math.PI*.5, false);

//     ctx.lineWidth = lineW;
//     ctx.strokeStyle = color;
//     ctx.lineCap = lCap;

//     ctx.stroke();
//   }
// }
"use strict";