$(document).ready(function() {
    $(".fancy_title").lettering();
});

const btnLogin = document.querySelector(".btn-login");
const form = document.querySelector("form");

btnLogin.addEventListener("click", event => {
    event.preventDefault();
    form.classList.add("form-hide");
});

const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            },
            number: {
                valueMissing: "Por favor, preencha este campo"
            },
            checkbox: {
                valueMissing: "Por favor, verifique os termos"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for( field of fields ){
    field.addEventListener("invalid", event => {
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
    .addEventListener('submit', event => {
        console.log("enviar o formulário")
    });

const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function(element) {
        if((windowTop) > element.offsetTop) {
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }
    })
}

animeScroll();

if(target.length) {
    window.addEventListener('scroll', debounce(function() {
        animeScroll();
    }, 200));
}

$("#add").on("click", function() {
    $("<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>").appendTo(".content");
  });

 
/* Confere se as senhas são iguais*/

function validar(){
    var campo1 = document.getElementById("cad-password");
    var campo2 = document.getElementById("confirm_password");
    if (campo1.value != campo2.value){
    campo2.setCustomValidity("As senhas não conferem");
    campo2.validity = false;
    }else{
    campo2.setCustomValidity("");
    campo2.validity = true;
    }
    }

function validarlog(){
    var email1 = document.getElementById("login-email");

    if (email1.value != "tauanynunes@icloud.com"){
        email1.setCustomValidity("Cadastro inexistente");
        email1.validity = false;
    }else{
        email1.setCustomValidity("");
        email1.validity = true;
    }
}

function validarcod(){
    var cod1 = document.getElementById("cod-cad");

    if (cod1.value != "AO9B24"){
        cod1.setCustomValidity("Código inválido");
        cod1.validity = false;
    }else{
        cod1.setCustomValidity("");
        cod1.validity = true;
    }
}

/** */
