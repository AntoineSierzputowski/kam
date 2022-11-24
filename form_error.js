// Controle de champ formulaire envoie de données

// exemple avec un formulaire ou le visiteur doit rentrer prénom nom et email

// controle de la cohérence des valeurs des champs, si c cohérent on fait la request, sinon on affiche message d'erreur pour chacun des inputs

Kameleoon.API.Utils.addUniversalClickListener(document.querySelector('.cta_send'), () => {
    let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'); // adresse email
    let classicRegex = new RegExp("^[a-zàâçéèêîïôúûA-ZÀÁÂÉÈÊÎÏÓÔÚÛ ,.'-]+$"); // prenom, ,nom

    let nomValue = document.querySelector('.input_nom').value; // récupérer valeur du input nom
    let prenomValue = document.querySelector('.input_prenom').value; // récupérer valeur du input prenom
    let emailValue = document.querySelector('.input_email').value; // récupérer valeur du input email

    // return true ou false
    var nomValid = classicRegex.test(nomValue);
    var prenomValid = classicRegex.test(prenomValue);
    var emailValid = emailRegex.test(emailValue);
    if (nomValid && prenomValid && emailValid) {
        // ---------------- Champ de formulaire ok --> envoyer la request ----------------
        var request_http = new XMLHttpRequest();
        var body_request = {};
        document.querySelectorAll('.widget_class input').forEach((item) => {
            body_request[item.name] = item.value;
        });
        var getUrl = (url, data) => {
            var query = '';
            for (var key in data) {
                if (query) {
                    query += '&';
                }
                query += key;
                query += '=';
                query += encodeURIComponent(data[key]);
            }
            return url.includes('?') ? url + '&' + query : url + '?' + query;
        };
        request_http.open('GET', getUrl('url api', body_request), true);
        request_http.onload = function () {
            if (this.status >= 200 && this.status < 400) {
            } else {
            }
        };
        request_http.onerror = function () {};
        request_http.send();
    } else {
        // -------------- gestion erreur --------------
        if (!nomValid) {
            // checker si le message d'erreur existe deja (en cas de 2e erreur)
            const checkNomError = document.getElementById('errorNomElem');
            if (!checkNomError) {
                const errorNom = `<p id="errorNomElem" style="font-size:12px; color: red; text-align: left">Veuillez renseigner votre nom</p>`;
                const divNom = document.querySelector('.div_input_nom');
                divNom.insertAdjacentHTML('beforeend', errorNom);
                const inputNom = document.querySelector('.input_nom');
                inputNom.style = 'border: solid 1px red';
            }
        } else if (nomValid) {
            // checker si le message d'erreur existe deja (en cas de 2e erreur) et le supp si il n'y a plus d'erreurs
            document.getElementById('errorNomElem')?.remove();
            const cleanInputNom = document.querySelector('.input_nom');
            cleanInputNom.style = 'border: solid 1px green';
        }
        if (!prenomValid) {
            // pareil que  pour nom
            const checkPrenomError = document.getElementById('errorPrenomElem');
            if (!checkPrenomError) {
                const errorPrenom = `<p id="errorPrenomElem" style="font-size:12px; color: red; text-align: left">Veuillez renseigner votre prénom</p>`;
                const divPrenom = document.querySelector('.div_input_prenom');
                divPrenom.insertAdjacentHTML('beforeend', errorPrenom);
                const inputPrenom = document.querySelector('.input_prenom');
                inputPrenom.style = 'border: solid 1px red';
            }
        } else if (prenomValid) {
            document.getElementById('errorPrenomElem')?.remove();
            const cleanInputPrenom = document.querySelector('.input_prenom');
            cleanInputPrenom.style = 'border: solid 1px green';
        }
        if (!emailValid) {
            // pareil que  précédemment
            const checkEmailError = document.getElementById('errorEmailElem');
            if (!checkEmailError) {
                const errorEmail = `<p id="errorEmailElem" style="font-size:12px; color: red; text-align: left">Veuillez renseigner votre email</p>`;
                const divEmail = document.querySelector('.div_input_email');
                divEmail.insertAdjacentHTML('beforeend', errorEmail);
                const inputEmail = document.querySelector('.input_email');
                inputEmail.style = 'border: solid 1px red';
            }
        } else if (emailValid) {
            document.getElementById('errorEmailElem')?.remove();
            const cleanInputEmail = document.querySelector('.input_email');
            cleanInputEmail.style = 'border: solid 1px green';
        }
    }
});
