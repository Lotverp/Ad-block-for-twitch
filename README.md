# ad-block-for-twitch
A simple script for Tampermonkey that remove ad from twitch and other sites.
# How to use it
1) Download Tampermokey extension for your browser ([Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox](https://addons.mozilla.org/it/firefox/addon/tampermonkey/))

```
// ==UserScript==
// @name         Nascondi Elementi su Twitch
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Nasconde un elemento specifico su Twitch (ad esempio un banner o una sezione) per scopi educativi
// @author       Il tuo nome
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Selettore CSS per individuare l'elemento (esempio generico)
    const adSelector = '[class*="ad"]'; // Cerca elementi che contengono "ad" nel nome della classe

    // Funzione per nascondere gli elementi trovati
    const hideAds = () => {
        const ads = document.querySelectorAll(adSelector);
        ads.forEach(ad => {
            ad.style.display = 'none';
            console.log('Elemento nascosto:', ad);
        });
    };

    // Esegui la funzione inizialmente
    hideAds();

    // Esegui nuovamente la funzione ogni secondo (utile per contenuti dinamici)
    setInterval(hideAds, 1000);
})();
```
