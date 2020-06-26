//Generate Password JavaScript

var passString = '';
var password = '';
var wantLength = 0;
var wantUpper = false;
var wantLower = false;
var wantNumber = false;
var wantSpecial = false;
var passDisplay = document.getElementById("passArea");


function userPrompt() {
    while(wantLength < 8 || wantLength > 128) {
        wantLength = prompt("How long do you want your password to be? Enter a number between 8 and 128.");
        if(isNaN(wantLength)) {
        wantLength  = 0;
            alert("Please enter a valid number between 8 and 128.");
            continue;
        }
        wantLength = parseInt(wantLength);

        if(wantLength < 8 || wantLength > 128) {
            wantLength  = 0;
            alert("Please enter a valid number between 8 and 128.");
            continue;
        }
    }
console.log("The lenght of the password you requested is: " + wantLength);

    while ((wantUpper || wantLower || wantNumber || wantSpecial) === false) {
        wantUpper = confirm("Do you want your password to contain Uppercase characters? \n[Ex. W, U, T]" );
        wantLower = confirm("Do you want your password to contain lowercase characters? \n[Ex. g, a, f]");
        wantNumber = confirm("Do you want your password to contain Numbers? \n[Ex. 2, 3, 4]");
        wantSpecial = confirm("Do you want your password to contain Special Characters? \n[Ex. $, *, @]");

        if ((wantUpper || wantLower || wantNumber || wantSpecial) === false) {
            alert("You must select at least one character type.");
            continue;
        }
    }
}
var passwordParameters = {
    passUpper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    passLower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    passNumber: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    passSpecial: [" ", "!", "'", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"],     
}
function generatePassword(len) {

        if (wantUpper) {
            passString += passwordParameters.passUpper.join("");
        }

        if (wantLower) {
            passString += passwordParameters.passLower.join("");
        }

        if (wantNumber) {
            passString += passwordParameters.passNumber.join("");
        }

        if (wantSpecial) {
            passString += passwordParameters.passSpecial.join("");
        }

        for (j = 0; j < len; j++) {
        password += passString.charAt(Math.floor(Math.random() * passString.length));

        }
    console.log("The size of the pool for each character is: " + passString.length);
    return password;
}
    function runPassGen() {
        userPrompt();
        passDisplay.textContent = generatePassword(wantLength);
}



/* PSEUDOCODE
Object passwordParameters:
passUpper [ABCDEFGHIJKLMNOPQRSTUVWXYZ]
passLower [abcdefghijklmnopqrstuvwxyz]
passNumber [123456789]
passSpecial [ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
passString = '';
password = '';
generatePassword: function (len){
let len = wantLength;
if wantUpper = true, add passUpper
if wantLower = true, add passLower
if wantNumber = true, add passNumber
if wantSpecial = true, add passSpecial
var totalString = (passString.length)

for i=0, i<len, i++ {
password += passString.charAt(Math.floor(Math.random() * totalString))
}
}    

wantLength prompt sets a variable for total characters.
wantUpper will add all Uppercase characters to the generation loop.
wantLower will add all lowercase characters to the generation loop.
wantNumber will add all numbers to the generation loop.
wantSpecial will add all special characters to the generation loop.
*/
