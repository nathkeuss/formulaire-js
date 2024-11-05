
// Récupération des différents éléments du DOM
let inputs = document.querySelectorAll('input,select');
let form = document.querySelector('form');
let password = document.querySelector('#pass1');
let passwordToConfirm = document.querySelector('#pass2');
let check = document.querySelector('#check');

//Vérification de la longueur de la value des inputs
function checkInput(input){
   return input.value.trim().length > 0;
}

//Vérification de la checkbox cochée ou non
function checkCheck(input){
    return input.checked;
}

//Création du message d'erreur
function createError(input){
    let parent = input.parentElement;
    let span = document.createElement('span');
    span.classList.add('error');
    span.classList.add('errorInput');
    span.innerHTML = "Ce champ est obligatoire";
    parent.appendChild(span);
}

//Création du message d'erreur pour les mots de passe
function createDivError(){
    let error = document.createElement('div');
    error.classList.add('error');
    error.classList.add('errorDiv');
    error.innerHTML = 'Les mots de passe ne correspondent pas';
    form.before(error);
}

//Vérification de l'égalité des mots de passe
function checkPasswords(password1,password2){
    return password1.value === password2.value;
}

//Vérification de la validité du formulaire
function verifForm(){
    //tableau des potentielles erreurs
    let errorsArray = [];

    //pour chaque input de la page, on vérifie sa validité
    inputs.forEach((input) =>{
        if(input.getAttribute('type') != 'checkbox'){
            if(!checkInput(input)){
                createError(input);
                // si il y a une erreur, on push l'input dans le tableau d'erreurs
                errorsArray.push(input);
            }
        }
        else{
            if(!checkCheck(input)){
                createError(input);
                errorsArray.push(input);
            }
        }
    })
    if(!checkPasswords(password,passwordToConfirm)){
        createDivError();
        errorsArray.push(input);
    }

    //on retourne la longueur du tableau d'erreur (si >0, alors le formulaire est faux)
    return errorsArray.length > 0 ? false : true;
}


//on ecoute la soumission
form.addEventListener('submit', (e) => {
    //on prévient le comportement par défaut
    e.preventDefault();

    // on reset toutes les erreurs
    const errors = document.querySelectorAll('.error');

    if(errors.length > 0){
        errors.forEach((error) =>{
            error.remove();
        })
    }

    // Si le formulaire est ok on soumet le formulaire
    if(verifForm()){
        form.submit();
    }
})

// //menu
// const burger = document.querySelector('#burger');
// const menu = document.querySelector('#menu');

// const audio = document.createElement('audio');
// audio.style.display = 'none';
// burger.appendChild(audio);

// burger.addEventListener('click',() => {
//     menu.classList.toggle('active');
//     burger.classList.toggle('active');
//     if(menu.classList.contains('active')){
//         audio.src = "sound/frein.mp3";
//     }
//     else{
//         audio.src = "sound/depart.mp3";
//     }
//     audio.play();
// })