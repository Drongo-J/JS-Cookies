// document.cookie = `username=Togrul Eliyev`;

// setTimeout(() => {
//     console.log(document.cookie);
// }, 5000);

function setCookie(name, value, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + seconds * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    alert(document.cookie);
}

function getCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// setCookie('name', 'tural', 50);

// setCookie("agent", "AGENT007", 10);

// setInterval(() => {
//     let data = getCookie("agent");
//     console.log(data);
// }, 1000);

// console.log(document.cookie);


let game = [];
function FillGame() {
    for (let i = 0; i < 3; i++) {
        let subGame = [];
        for (let k = 0; k < 3; k++) {
            subGame.push(0);
        }
        game.push(subGame);
    }
}

function DrawGame() {
    let content = '';
    let id = 0;
    for (let i = 0; i < game.length; i++) {
        let subGame = game[i];
        content += `<tr>`;
        for (let k = 0; k < subGame.length; k++) {
            const data = subGame[k];
            let element = '';
            if (data != 0) {
                element = data;
            }
            content += `<td id='${id}' onclick="SelectItem(id, ${i}, ${k})">${element}</td>`;
            id++;
        }
        content += `</tr>`;
    }
    let gameTable = document.getElementById('gameTable');
    gameTable.innerHTML = content;
}

function Turn(){
    let element = document.getElementById("turn");
    element.innerHTML = isFirstPlayer ? "X player" : "O player";
}

let isFirstPlayer = true;
function StartGame() {
    game = [];
    Turn();
    FillGame();
    DrawGame();
}

function SelectItem(id, i, k) {
    let item = document.getElementById(id);
    if (isFirstPlayer){
        item.innerHTML = 'X';
        game[i][k] = 1;
    }
    else{
        item.innerHTML = 'O';
        game[i][k] = 2;
    }
    isFirstPlayer = !isFirstPlayer;
    Turn();
}

function gameArrayToString(){
    let content = '';
    for (let i = 0; i < game.length; i++) {
        const subGame = game[i];
        for (let k = 0; k < subGame.length; k++) {
            const element = subGame[k];
            content += `${element} `;
        }
        content += '='
    }
    return content;
}

function SaveGame(){
    let result = gameArrayToString();
    alert(result);
    setCookie('game', result, 3600);
}

function InitialLoad(){
    let result = getCookie('game');
    if (result.length > 0){
        let element = document.getElementById('info');
        element.innerHTML = 'You can continue your last game';
    }
}

InitialLoad();