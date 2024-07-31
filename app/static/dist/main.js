"use strict";
// experimentalFunction1 - ^0.1.x by VillageR88 (https://github.com/VillageR88)
/**
 * The experimentalFunction1 implements a basic client-side rendering mechanism for a single-page application.
 * It intercepts link clicks and uses the Fetch API to load new content dynamically without a full page reload.
 * This approach enhances the user experience by providing faster navigation and reducing server load.
 * It also handles browser navigation events to maintain the correct state.
 */
function experimentalFunction1() {
    function loadContent(page) {
        if (page) {
            fetch(page)
                .then(function (response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
                .then(function (html) {
                var _a;
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var newContent = (_a = doc.querySelector("body")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                var mainElement = document.querySelector("body");
                if (mainElement && newContent) {
                    mainElement.innerHTML = newContent;
                    history.pushState(null, "", String(page));
                    setupLinkListeners(); // Re-setup link listeners after content load
                }
                else {
                    console.error("Main element not found");
                }
            })
                .catch(function (error) { return console.error("Error loading content:", error); });
        }
    }
    window.onpopstate = function () {
        var path = window.location.pathname;
        loadContent(path || "/"); // Load content based on the current path
    };
    function setupLinkListeners() {
        var links = Array.from(document.querySelectorAll("a"));
        for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
            var link = links_1[_i];
            link.addEventListener("click", function (event) {
                var _a;
                event.preventDefault();
                var target = event.target;
                var page = (_a = target.closest("a")) === null || _a === void 0 ? void 0 : _a.getAttribute("href");
                if (page) {
                    loadContent(page);
                }
            });
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        setupLinkListeners();
        loadContent(window.location.pathname); // Load content based on the initial path
    });
}
experimentalFunction1();
function selectParallelCheckbox(loop) {
    var checkboxes = document.getElementsByClassName('createPlanBlocksInput');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].removeAttribute('checked');
    }
    for (var i = 0; i < Number(loop); i++) {
        checkboxes[i].setAttribute('checked', 'checked');
    }
}
var empty = '_____';
function checkOrderSummary() {
    var _a, _b;
    var buttonCreateMyPlan = document.getElementById('buttonCreateMyPlan');
    ((_b = (_a = document.getElementById('orderSummary')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.includes(empty)) ? buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.setAttribute('disabled', 'true') : buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.removeAttribute('disabled');
}
