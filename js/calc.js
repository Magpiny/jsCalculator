/**
 * @author OKoth Samuel;
 * @description codes for javascript calculator 
 * @license MIT 
 * @tutorial from tutorial by CodesTack thank you;
 * @
 */

const $input = document.querySelector("input");

document.querySelectorAll(".numkey").forEach(
    el => {
        el.onclick = () => ($input.value=$input.value !== "0" ? $input.value + el.innerText : el.innerText);
    }
);

const buffer = [];

/**
 * @function opCallback
 */
const opCallback = opName => () => {
    let currentVal = parseFloat($input.value);

    if(opName==="perc"){
        currentVal *= 0.01;
        $input.value = currentVal;

    }
    else{
        if (buffer && buffer.length){
            buffer.push({value : currentVal});

            const result = evaluate(buffer);

            buffer.push({ value : result });
            buffer.push({ value : opName });

            $input.value = "";
        }
        else{
            buffer.push({ value : currentVal});
            buffer.push({ value : opName });
            $input.value = "";
        }

    }
        
}

/**
 * @function evaluate
 */
const evaluate = buffer =>{
    const op2 = buffer.pop().value;
    const op = buffer.pop().value;
    const op1 = buffer.pop().value;
    
    switch (op) {
        case "add":
            return op1 + op2;
            break;
        case "subtr":
            return op1 - op2;
            break;
        case "mult":
            return op1 * op2;
            break;
        case "div":
            return op1 / op2;
            break;
        default:
            return op2;
    }

}

//looping through the operations ('for ... of' loop)
for (const opName of ["add", "subtr", "mult", "div", "perc"]){
    document.querySelector(`.opkey[op=${opName}]`).onclick = opCallback(opName);
};

//Equal key;            
document.querySelector(".eqkey").onclick = () =>{
    if (buffer && buffer.length){
        buffer.push({ value: parseFloat($input.value) });
        $input.value = evaluate(buffer);
    }

};

//clear key;
document.querySelector(".opkey[op=clr]").onclick = () => {
    $input.value  = 0;
    buffer.length = 0;

}

//negate +/- key;
document.querySelector(".opkey[op=neg]").onclick = () => {
    $input.value = -parseFloat($input.value);
}


//footer date 
let footer = document.querySelector(".footer");
let time = new Date().getFullYear();
footer.innerText = time ;
footer.style.color = "blue";