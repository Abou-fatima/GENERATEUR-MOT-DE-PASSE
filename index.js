const affichage = document.getElementById('Password');
const longueur = 15;


const lettresMajuscules = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
const lettresMiniscules = "abcdefghijklmnopqrstuvwxyz";
const caracteres = "!@#$%^&*()_+{}|,./<>?`~*-+";
const chiffres ="0123456789";

const resultat= lettresMajuscules + lettresMiniscules + caracteres;


const GenererMotDePasse= ( () =>{
    let password = '';

    password=lettresMajuscules[Math.floor(Math.random() * lettresMajuscules.length)];
    password=lettresMiniscules[Math.floor(Math.random() * lettresMiniscules.length)];
    password=caracteres[Math.floor(Math.random() * caracteres.length)];
    password=chiffres[Math.floor(Math.random() * chiffres.length)];

    // console.log(password);

    while (password.length<longueur) {
        password += resultat[Math.floor(Math.random() * resultat.length)];
    }

    affichage.value=password;
})

const copy= () =>{
    affichage.select()
    document.execCommand("copy")
}