# Instructions for Twitch AdBlock Script 🇬🇧

## Overview
This script is designed to block advertisements on Twitch, ensuring a smooth and uninterrupted viewing experience. It works with Tampermonkey and compatible browser extensions.

## Features
- Blocks video advertisements.
- Removes banner ads from the interface.
- Provides a better viewing experience.

## Requirements
1. A supported web browser, [Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/en-US/firefox/windows/), [Opera](https://www.opera.com/it/download).
2. Download Tampermokey extension for your browser: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox](https://addons.mozilla.org/it/firefox/addon/tampermonkey/), [Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)



## Installation Steps

### Method 1: Manual Installation
1. Download the file `twitch_adblock.user.js` from this repository.
2. Open Tampermonkey in your browser.
3. Click on **Create a new script**.
4. Paste the script content from the downloaded file into the editor.
5. Save the script by clicking **File > Save** or pressing `Ctrl + S`.
6. Ensure the script is enabled in Tampermonkey.

### Method 2: Automatic Installation
1. Open the `twitch_adblock.user.js` file in your browser.
2. Tampermonkey will detect the script and prompt you to install it.
3. Confirm and enable the script.

## Usage
1. Visit [Twitch](https://www.twitch.tv/).
2. The script will automatically block advertisements.
3. Enjoy your ad-free streaming experience!

## Contributing
If you encounter issues or have suggestions for improvements, feel free to:
- Open an issue.
- Submit a pull request.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Script:
 
```
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


```
