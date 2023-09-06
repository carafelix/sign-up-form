const form = document.querySelector('form');
const inputs = document.querySelectorAll('[required]')

const pass = document.getElementById('user-pass');
const passConfirm = document.getElementById('user-pass-confirm');
const meter = document.querySelector('meter');
const submit = document.querySelector('input[type="submit"]')


// Passwords

passConfirm.addEventListener('blur', ()=>checkPassMatches(pass,passConfirm))

function checkPassMatches(a,b){

    if(b.className === 'error'){

        if(a.value !== b.value || b.value === ''){
            b.classList.add('error')
            b.classList.remove('valid');
    
            b.setCustomValidity("Passwords does not match");

            return
    
        } else {
            b.classList.remove('error');
            b.classList.add('valid');
            
            b.setCustomValidity('');
            b.reportValidity();

            passConfirm.addEventListener('blur', ()=>checkPassMatches(pass,passConfirm));

            return // toggle err div off
        }
    } else {
        if(a.value !== b.value || b.value === ''){
            b.classList.add('error')
            b.classList.remove('valid');
    
            b.setCustomValidity("Passwords does not match");
            b.reportValidity();
    
            passConfirm.addEventListener('input', ()=>checkPassMatches(pass,passConfirm));
    
            return
    
        } else {
            b.classList.remove('error');
            b.classList.add('valid');
            
            b.setCustomValidity('');
            b.reportValidity();
    
            return // toggle err div off
        }
    }
}

// valid state 

inputs.forEach(el=>{
    if(el === passConfirm){
        return
    }

    if(el.localName === 'select'){
        if(el.validity.valid === true){
            el.classList.add('valid');
            el.addEventListener('input', (el) => inputValidation(el))
            return
        } else {
            el.addEventListener('input', (el) => inputValidation(el))
            return
        }
    }

    if(el.validity.valid === true){
        el.classList.add('valid');
        el.addEventListener('blur', (el) => inputValidation(el))
    } else {
        el.addEventListener('blur', (el) => inputValidation(el))
    }
});

function inputValidation(el){

    if(el.target.className.includes('error')){

        if(el.target.validity.valid === true){
            el.target.classList.add('valid');
            el.target.classList.remove('error');

        } else {
            el.target.classList.remove('valid')
            el.target.classList.add('error')
        } 

    } else {

        if(el.target.validity.valid === true){
            el.target.classList.add('valid')
            el.target.classList.remove('error')
            
        } else {
            el.target.classList.remove('valid')
            el.target.classList.add('error')

            el.target.addEventListener('input', (el) => inputValidation(el))
        } 
    }
}

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

submit.addEventListener('submit', ()=>checkPassMatches(pass,passConfirm))