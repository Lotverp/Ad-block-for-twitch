// ==UserScript==
// @name         Twitch AdBlock
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove Twitch AD
// @author       Lotverp
// @match        https://www.twitch.tv/*
// ==/UserScript==

(function() {
    'use strict';

    // Intercept and manipulate the richest video to bypass the audience
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        if (arguments[1] && arguments[1].includes("/gql")) {
            const payload = JSON.parse(arguments[1]);
            if (payload && payload.operationName === "PlaybackAccessToken_Template") {
                payload.extensions.persistedQuery.sha256Hash = "bypass_ads_hash_placeholder"; // Hash fittizio
            }
            arguments[1] = JSON.stringify(payload);
        }
        origOpen.apply(this, arguments);
    };

    // Insert a block for Ad banner
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .ad-banner {
            display: none !important;
        }
        video.ad-overlay {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // Alternative: Force low quality in Ad spot
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const adOverlay = document.querySelector('.ad-banner');
                if (adOverlay) {
                    const videoElement = document.querySelector('video');
                    if (videoElement) {
                        videoElement.pause(); // Metti in pausa per evitare la pubblicità
                    }
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

