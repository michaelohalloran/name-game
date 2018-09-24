const names = ['Augustine', 'Pius','Charles','Dominic','Francis', 'Ignatius',
'Michael','Peter','John', 'Alphonsus'];
let copyNames = [];
let key;

const gameBoard = document.getElementById('output');



function start() {
    //copy names
    copyNames = names.slice();
    //randomize copyNames
    let randNames = copyNames.sort((a,b)=> 0.5 - Math.random());
    // console.log(copyNames);
    //clear anything already there, then build divs w/ names in them
    gameBoard.innerHTML = '';
    build(randNames);
    findPerson();
}

function build(arr) {
    // console.log(arr);
    //loop over array, making div for each name
    // let nameBoxes = arr.forEach(name=> {
    //     // console.log(name);
    //     gameBoard.innerHTML+= `<div class="box">${name}</div>`;
    // });
    // return nameBoxes;

    for(let i = 0; i < arr.length; i++) {
        let str = arr[i];
        let shuffled = str.split('').sort(()=> 0.5 - Math.random()).join('');
        gameBoard.innerHTML+= `
            <div class="box" 
                onmouseover="updateText('${shuffled}')"
                onmouseout="updateText('Hidden ${i+1}')"
                onclick="checkEl('${str}', '${arr}')"
            >
                Hidden ${i+1}
            </div>
        `;
    }
}

function findPerson() {
    const randomIdx = Math.floor(Math.random() * copyNames.length);
    const randomName = copyNames[randomIdx];
    //randomly grab name to set as the winning answer
    key = randomName;
    message1(`Find this name: ${key}`);
}

function updateText(text) {
    //append text
    // console.log('target', target);
    // console.log(text);
    event.target.innerHTML = text;
}

function checkEl(text, arr) {
    // console.log(text);
    if(text==key) {
        message2('Correct!');
        //remove element from array
        // console.log('arr is', arr.split(','));
        let idxToRemove = copyNames.indexOf(text);
        copyNames.splice(idxToRemove, 1);
        // console.log('new arr is', namesArray);
        //remove element visually
        // gameBoard.innerHTML = '';
        // build(copyNames);
        event.target.parentNode.removeChild(event.target);
        findPerson();

    } else {
        message2('Try again');
    }
    if(copyNames.length <=0) {
        message1('Game over');
    }   
}

function message1(msg) {
 document.getElementById('message1').innerHTML = msg;   
}

function message2(msg) {
    document.getElementById('message2').innerHTML = msg;   
   }
