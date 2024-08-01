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
function optionCheckboxSelector(loop) {
    var plan = document.getElementsByClassName('plan');
    var inputOption = document.getElementsByClassName('inputOption');
    var checkedPlan = 0;
    for (var i = 0; i < plan.length; i++) {
        if (plan[i].checked === true)
            checkedPlan = i;
    }
    console.log(checkedPlan);
    for (var i = 0; i < plan.length; i++) {
        plan[i].checked = false;
        plan[i].setAttribute('disabled', 'true');
    }
    for (var i = 0; i < Number(loop) - 1; i++) {
        plan[i].removeAttribute('disabled');
    }
    // Also, we have to do in range to clear all checked inputs from class inputOption according to loop
    // for (let i = inputOption.length - 1; i >= Number(loop); i--) {
    //     inputOption[i].checked = false;
    // } almost good
    // for (let i = Number(loop) - 1; i >= 0; i--) {
    //     inputOption[i].checked = false;
    // } almost good this time but it should be somewhat reversed
    // for (let i = Number(loop); i < 5; i++) {
    //     inputOption[i].checked = false;
    // } I probably understand the problem
    // It is because inputOption is a class of li of ul but they have 5 ul of 3xli each so
    // we have to loop through all ul and then through all li
    // for (let i = 0; i < inputOption.length; i++) {
    //     inputOption[i].checked = false;
    // } like this but we don't want to uncheck all but only the ones that are not loop or above
    // for (let i = 0; i < inputOption.length; i++) { // I don't see loop var here
    // ok i have idea input class even if there is 0,1,2,3,4 index of inputOption
    //there is also 3 input in a row
    //so we have in reality 3x5=15 inputs in total so when we use condition we have to like this
    for (var i = Number(loop) * 3 - 3; i < inputOption.length; i++) {
        console.log(i);
        inputOption[i].checked = false;
    }
    plan[Number(loop) - 1].checked = true;
}
function optionNavSelector(loop) {
    var plan = document.getElementsByClassName('plan');
    var checkedPlan = 0;
    for (var i = 0; i < plan.length; i++) {
        if (plan[i].checked === true)
            checkedPlan = i;
    }
    if (Number(loop) >= checkedPlan) {
        for (var i = 0; i < plan.length; i++) {
            plan[i].checked = false;
            plan[i].setAttribute('disabled', 'true');
        }
        for (var i = 0; i <= Number(loop); i++) {
            plan[i].removeAttribute('disabled');
        }
        if (Number(loop) + 1 <= plan.length - 1) {
            plan[Number(loop) + 1].checked = true;
        }
        else {
            plan[Number(loop)].checked = true;
        }
    }
}
function checkOrderSummary() {
    var _a, _b;
    var empty = '_____';
    var buttonCreateMyPlan = document.getElementById('buttonCreateMyPlan');
    ((_b = (_a = document.getElementById('orderSummary')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.includes(empty)) ? buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.setAttribute('disabled', 'true') : buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.removeAttribute('disabled');
}
