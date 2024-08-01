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
                window.scrollTo(0, 0); // optional
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
//global variables
var empty = '_____';
var spanIDrinkMyCoffee = '“I drink my coffee';
var spanEmpty = '';
function optionCheckboxSelector(loop) {
    var wantUsToGrindThem = document.getElementById('Want_us_to_grind_themLabel');
    var grindOptionPrefix = document.getElementById('Want_us_to_grind_themPrefix');
    var createPlanBlocksInput = document.getElementsByClassName('createPlanBlocksInput');
    var preferencesPrefix = document.getElementById('How_do_you_drink_your_coffeePrefix');
    if (Number(loop) - 1 === 0) {
        if (preferencesPrefix)
            preferencesPrefix.textContent = spanIDrinkMyCoffee;
        if (grindOptionPrefix)
            grindOptionPrefix.textContent = spanEmpty;
        wantUsToGrindThem === null || wantUsToGrindThem === void 0 ? void 0 : wantUsToGrindThem.classList.remove('cloaked');
    }
    var spanIds = ['How_do_you_drink_your_coffee', 'What_type_of_coffee', 'How_much_would_you_like', 'Want_us_to_grind_them', 'How_often_should_we_deliver'];
    var plan = document.getElementsByClassName('plan');
    var inputOption = document.getElementsByClassName('inputOption');
    var checkedPlan = 0;
    for (var i = plan.length - 1; i > Number(loop) - 1; i--) {
        (createPlanBlocksInput[i].checked = false);
    }
    for (var i = 4; i > Number(loop) - 2; i--) {
        var item = document.getElementById(spanIds[i]);
        if (item) {
            if (item.id === 'Want_us_to_grind_them') {
                item.textContent = '';
            }
            else {
                item.textContent = empty;
            }
        }
    }
    for (var i = 0; i < plan.length; i++) {
        if (plan[i].checked === true)
            checkedPlan = i;
    }
    for (var i = 0; i < plan.length; i++) {
        plan[i].checked = false;
        plan[i].setAttribute('disabled', 'true');
    }
    for (var i = 0; i < Number(loop) - 1; i++) {
        plan[i].removeAttribute('disabled');
    }
    for (var i = Number(loop) * 3 - 3; i < inputOption.length; i++) {
        inputOption[i].checked = false;
    }
    plan[Number(loop) - 1].checked = true;
}
function optionNavSelector(loop) {
    var createPlanBlocksInput = document.getElementsByClassName('createPlanBlocksInput');
    var preferencesPrefix = document.getElementById('How_do_you_drink_your_coffeePrefix');
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
            createPlanBlocksInput[Number(loop) + 1].checked = true;
        }
        else {
            plan[Number(loop)].checked = true;
        }
    }
    var spanGroundAla = ', ground ala';
    var preferences = document.getElementById('How_do_you_drink_your_coffee');
    var grindOption = document.getElementById('Want_us_to_grind_them');
    var grindOptionPrefix = document.getElementById('Want_us_to_grind_themPrefix');
    var wantUsToGrindThem = document.getElementById('Want_us_to_grind_themLabel');
    if (preferencesPrefix && grindOption && preferences && grindOptionPrefix && Number(loop) === 0)
        if (preferences.textContent === 'Capsule') {
            grindOption.textContent = spanEmpty;
            grindOptionPrefix.textContent = spanEmpty;
            preferencesPrefix.textContent = "".concat(spanIDrinkMyCoffee, " as");
            wantUsToGrindThem === null || wantUsToGrindThem === void 0 ? void 0 : wantUsToGrindThem.classList.add('cloaked');
        }
        else if (preferences.textContent === 'Filter' || preferences.textContent === 'Espresso') {
            wantUsToGrindThem === null || wantUsToGrindThem === void 0 ? void 0 : wantUsToGrindThem.classList.remove('cloaked');
            preferencesPrefix.textContent = "".concat(spanIDrinkMyCoffee, " with");
            grindOptionPrefix.textContent = spanGroundAla;
            if (grindOption.textContent === spanEmpty)
                grindOption.textContent = empty;
        }
        else {
            preferencesPrefix.textContent = spanIDrinkMyCoffee;
        }
    ;
}
function checkOrderSummary() {
    var _a, _b;
    var buttonCreateMyPlan = document.getElementById('buttonCreateMyPlan');
    ((_b = (_a = document.getElementById('orderSummary')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.includes(empty)) ? buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.setAttribute('disabled', 'true') : buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.removeAttribute('disabled');
}
// <span id="How_do_you_drink_your_coffee">_____</span>, with a
// <span id="What_type_of_coffee">_____</span> type of bean.
// <span id="How_much_would_you_like">_____</span>, ground ala
// <span id="Want_us_to_grind_them">_____</span>, sent to me
// <span id="How_often_should_we_deliver">_____</span>.”
//we gonna also create array of all span ids
