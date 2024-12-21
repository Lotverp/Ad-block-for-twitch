# Ad-block-for-twitch
A simple script for Tampermonkey that remove ads from Twitch and other sites.
# How to use it
1) Download Tampermokey extension for your browser ([Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox](https://addons.mozilla.org/it/firefox/addon/tampermonkey/))
2) Press the button "Add a new script"
3) Copy and paste this script ⬇️
4) Save it and realod twitch page
5) Enjoy on it without ads
   
```
// ==UserScript==
// @name         Nascondi Elementi su Twitch (Compatibile Firefox)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Nasconde un elemento specifico su Twitch (ad esempio un banner o una sezione) per scopi educativi
// @author       Il tuo nome
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funzione per verificare che la pagina sia completamente caricata
    const onPageLoad = (callback) => {
        if (document.readyState === 'complete') {
            callback();
        } else {
            window.addEventListener('load', callback);
        }
    };

    // Selettore CSS per individuare gli elementi (esempio generico)
    const adSelector = '[class*="ad"]'; // Cerca elementi che contengono "ad" nel nome della classe

    // Funzione per nascondere gli elementi trovati
    const hideAds = () => {
        const ads = document.querySelectorAll(adSelector);
        ads.forEach(ad => {
            ad.style.display = 'none';
            console.log('Elemento nascosto:', ad);
        });
    };

    // Avvia lo script quando la pagina è caricata
    onPageLoad(() => {
        // Esegui inizialmente
        hideAds();

        // Controlla periodicamente per gestire contenuti dinamici
        setInterval(hideAds, 1000);
    });
})();

```
