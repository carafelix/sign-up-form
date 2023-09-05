const form = document.querySelector('form');
const inputs = document.querySelectorAll('[required]')

const pass = document.getElementById('user-pass');
const passConfirm = document.getElementById('user-pass-confirm');
const meter = document.querySelector('meter');


// Passwords

passConfirm.addEventListener('blur', ()=>checkPassMatches(pass,passConfirm))

function checkPassMatches(a,b){

    // if already visited do not steal al the fukin atention

    if(a.value !== b.value){
        a.classList.add('error')
        b.classList.add('error')

        b.setCustomValidity("Passwords does not match");
        b.reportValidity();
        passConfirm.removeEventListener('blur', ()=>checkPassMatches(pass,passConfirm))

        return

    } else {
        a.classList.remove('error');
        b.classList.remove('error');
        
        b.setCustomValidity('');
        b.reportValidity();
        return // toggle err div off
    }
}

// valid state 

inputs.forEach(el=>{
    if(el.validity.valid === true){
        el.classList.add('valid')
    } else {
        el.addEventListener('input', (el)=>{
            if(el.target.validity.valid === true){
                el.target.classList.add('valid')
            }
        })
    }
})

// meter 

const regexPass = /^(?=.*\d|.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

pass.addEventListener('input',()=>{

    const regexLength = /^.{8,}$/;
    const regexDigit = /\d/;
    const regexSpecialChar = /\W/;
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;

    const arr = [regexLength,regexDigit,regexSpecialChar,regexUpperCase,regexLowerCase];

    const matches = arr.reduce((acc,v) => (pass.value.match(v)) ? acc + 1 : acc , 0);

    meter.value = matches; 
    meter.innerText = `Requiered constrains ${matches}/5`

})