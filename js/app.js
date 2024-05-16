
const inputForms = {
    email: '',
    subject: '',
    message: ''
}


// Variables from html
const inputEmail   = document.querySelector('#email');
const inputSubject = document.querySelector('#subject');
const inputMessage = document.querySelector('#message');
const form         = document.querySelector('#form');
const submitButton = document.querySelector('.btn-submit');
const resetButton  = document.querySelector('.btn-reset');
const spinner      = document.querySelector('#spinner');


// Events Listeners
inputEmail.addEventListener('input',   checkInput);
inputSubject.addEventListener('input', checkInput);
inputMessage.addEventListener('input', checkInput);
resetButton.addEventListener('click', resetForm);
form.addEventListener('submit', sendEmail);



// Check value input
function checkInput(e) {
    if(e.target.value.trim() === '') {
        errorMessage(`Format invalid ${ e.target.id }`, e.target.parentElement);
        inputForms[e.target.name] = '';
        checkinputForms()
        return;
    }

    // check format email
    if( e.target.id === 'email' && !validEmail(e.target.value) ) {
        errorMessage(`Not a valid email`, e.target.parentElement);
        inputForms[e.target.name] = '';
        checkinputForms();
        return;
    }
    
    removeAlert(e.target.parentElement);

    inputForms[ e.target.name ] = e.target.value.trim().toLowerCase();
    checkinputForms(); 
}


// Error message create and remove if repite
function errorMessage(message, reference) {

    removeAlert(reference);

    const error = document.createElement('P');
    error.textContent = message;             
    error.classList.add('bg-pink-600', 'text-white', 'p-2', 'alertOn');
   
    // inject HTML error message
    reference.appendChild(error);
}


// Remove error message if valid
function removeAlert(reference) {
    const alert = reference.querySelector('.alertOn');

    if(alert) {
       alert.remove();
    }
}


// check email (true or false)
function validEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
}


// Check if objeto inputForms is empty
function checkinputForms() {
    
    if( Object.values(inputForms).includes('') ) {
        submitButton.classList.add('opacity-50');
        submitButton.disabled = true;
       return; 
    }
    
    submitButton.classList.remove('opacity-50');
    submitButton.disabled = false;
    
}

// Send Email
function sendEmail(e) {
    e.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout( () => {
        spinner.classList.add('hidden');
        spinner.classList.remove('flex');
        resetForm();
    }, 2000);

   resetForm()
}


// Reset button
function resetForm() {
    
    inputForms.email   = '';
    inputForms.subject  = '';
    inputForms.message = '';

    form.reset();
    checkinputForms();
}

