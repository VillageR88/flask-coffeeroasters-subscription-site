"use strict";
var _a;
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
experimentalFunction1(); // If you want to use this function (at current stage) in your project, you do it on your own risk.
//global variables
var empty = "_____";
var spanIDrinkMyCoffee = "“I drink my coffee";
var spanEmpty = "";
function navSelector(loop) {
    var wantUsToGrindThem = document.getElementById("Want_us_to_grind_themLabel");
    var grindOptionPrefix = document.getElementById("Want_us_to_grind_themPrefix");
    var createPlanBlocksInput = document.getElementsByClassName("createPlanBlocksInput");
    var preferencesPrefix = document.getElementById("How_do_you_drink_your_coffeePrefix");
    if (Number(loop) - 1 === 0) {
        if (preferencesPrefix)
            preferencesPrefix.textContent = spanIDrinkMyCoffee;
        if (grindOptionPrefix)
            grindOptionPrefix.textContent = spanEmpty;
        wantUsToGrindThem === null || wantUsToGrindThem === void 0 ? void 0 : wantUsToGrindThem.classList.remove("cloaked");
    }
    var spanIds = [
        "How_do_you_drink_your_coffee",
        "What_type_of_coffee",
        "How_much_would_you_like",
        "Want_us_to_grind_them",
        "How_often_should_we_deliver",
    ];
    var plan = document.getElementsByClassName("plan");
    var inputOption = document.getElementsByClassName("inputOption");
    var checkedPlan = 0;
    for (var i = plan.length - 1; i > Number(loop) - 1; i--) {
        createPlanBlocksInput[i].checked = false;
    }
    for (var i = 4; i > Number(loop) - 2; i--) {
        var item = document.getElementById(spanIds[i]);
        if (item) {
            if (item.id === "Want_us_to_grind_them") {
                item.textContent = "";
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
        plan[i].setAttribute("disabled", "true");
    }
    for (var i = 0; i < Number(loop) - 1; i++) {
        plan[i].removeAttribute("disabled");
    }
    for (var i = Number(loop) * 3 - 3; i < inputOption.length; i++) {
        inputOption[i].checked = false;
    }
    plan[Number(loop) - 1].checked = true;
}
function optionSelector(loop) {
    var createPlanBlocksInput = document.getElementsByClassName("createPlanBlocksInput");
    var preferencesPrefix = document.getElementById("How_do_you_drink_your_coffeePrefix");
    var plan = document.getElementsByClassName("plan");
    var checkedPlan = 0;
    for (var i = 0; i < plan.length; i++) {
        if (plan[i].checked === true)
            checkedPlan = i;
    }
    if (Number(loop) >= checkedPlan) {
        for (var i = 0; i < plan.length; i++) {
            plan[i].checked = false;
            plan[i].setAttribute("disabled", "true");
        }
        for (var i = 0; i <= Number(loop); i++) {
            plan[i].removeAttribute("disabled");
        }
        if (Number(loop) === 2 &&
            document.querySelector("main.create-your-plan .cloaked")) {
            plan[Number(loop) + 2].checked = true;
            createPlanBlocksInput[Number(loop) + 1].checked = true;
        }
        else if (Number(loop) + 1 <= plan.length - 1) {
            plan[Number(loop) + 1].checked = true;
            createPlanBlocksInput[Number(loop) + 1].checked = true;
        }
        else {
            plan[Number(loop)].checked = true;
        }
    }
    var spanGroundAla = ", ground ala";
    var preferences = document.getElementById("How_do_you_drink_your_coffee");
    var grindOption = document.getElementById("Want_us_to_grind_them");
    var grindOptionPrefix = document.getElementById("Want_us_to_grind_themPrefix");
    var wantUsToGrindThem = document.getElementById("Want_us_to_grind_themLabel");
    var inputOptionHow_do_you_drink_your_coffeeCapsule = document.getElementById("inputOptionHow_do_you_drink_your_coffeeCapsule");
    var inputOptionWant_us_to_grind_them = document.getElementsByClassName("inputOptionWant_us_to_grind_them");
    if (preferencesPrefix &&
        grindOption &&
        preferences &&
        grindOptionPrefix &&
        Number(loop) === 0) {
        if (preferences.textContent === "Capsule") {
            grindOption.textContent = spanEmpty;
            grindOptionPrefix.textContent = spanEmpty;
            preferencesPrefix.textContent = "".concat(spanIDrinkMyCoffee, " as");
            wantUsToGrindThem === null || wantUsToGrindThem === void 0 ? void 0 : wantUsToGrindThem.classList.add("cloaked");
            //
        }
        else if (preferences.textContent === "Filter" ||
            preferences.textContent === "Espresso") {
            wantUsToGrindThem === null || wantUsToGrindThem === void 0 ? void 0 : wantUsToGrindThem.classList.remove("cloaked");
            preferencesPrefix.textContent = "".concat(spanIDrinkMyCoffee, " with");
            grindOptionPrefix.textContent = spanGroundAla;
            if (grindOption.textContent === spanEmpty)
                grindOption.textContent = empty;
        }
        else {
            preferencesPrefix.textContent = spanIDrinkMyCoffee;
        }
        if (inputOptionHow_do_you_drink_your_coffeeCapsule.checked) {
            for (var i = 0; i < inputOptionWant_us_to_grind_them.length; i++) {
                inputOptionWant_us_to_grind_them[i].checked = false;
            }
        }
    }
}
function checkOrderSummary() {
    var _a, _b;
    var buttonCreateMyPlan = document.getElementById("buttonCreateMyPlan");
    ((_b = (_a = document.getElementById("orderSummary")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.includes(empty))
        ? buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.setAttribute("disabled", "true")
        : buttonCreateMyPlan === null || buttonCreateMyPlan === void 0 ? void 0 : buttonCreateMyPlan.removeAttribute("disabled");
}
function handleMask() {
    scrollTo(0, 0);
    var How_do_you_drink_your_coffeePrefix = document.getElementById("How_do_you_drink_your_coffeePrefix");
    var How_do_you_drink_your_coffeePrefixCopy = document.getElementById("How_do_you_drink_your_coffeePrefixCopy");
    var How_do_you_drink_your_coffee = document.getElementById("How_do_you_drink_your_coffee");
    var How_do_you_drink_your_coffeeCopy = document.getElementById("How_do_you_drink_your_coffeeCopy");
    var What_type_of_coffee = document.getElementById("What_type_of_coffee");
    var What_type_of_coffeeCopy = document.getElementById("What_type_of_coffeeCopy");
    var How_much_would_you_like = document.getElementById("How_much_would_you_like");
    var How_much_would_you_likeCopy = document.getElementById("How_much_would_you_likeCopy");
    var Want_us_to_grind_them = document.getElementById("Want_us_to_grind_them");
    var Want_us_to_grind_themCopy = document.getElementById("Want_us_to_grind_themCopy");
    var How_often_should_we_deliver = document.getElementById("How_often_should_we_deliver");
    var How_often_should_we_deliverCopy = document.getElementById("How_often_should_we_deliverCopy");
    if (How_do_you_drink_your_coffeePrefix &&
        How_do_you_drink_your_coffeePrefixCopy) {
        How_do_you_drink_your_coffeePrefixCopy.textContent =
            How_do_you_drink_your_coffeePrefix.textContent;
    }
    if (How_do_you_drink_your_coffee && How_do_you_drink_your_coffeeCopy) {
        How_do_you_drink_your_coffeeCopy.textContent =
            How_do_you_drink_your_coffee.textContent;
    }
    if (What_type_of_coffee && What_type_of_coffeeCopy) {
        What_type_of_coffeeCopy.textContent = What_type_of_coffee.textContent;
    }
    if (How_much_would_you_like && How_much_would_you_likeCopy) {
        How_much_would_you_likeCopy.textContent =
            How_much_would_you_like.textContent;
    }
    if (Want_us_to_grind_them && Want_us_to_grind_themCopy) {
        Want_us_to_grind_themCopy.textContent = Want_us_to_grind_them.textContent;
    }
    if (How_often_should_we_deliver && How_often_should_we_deliverCopy) {
        How_often_should_we_deliverCopy.textContent =
            How_often_should_we_deliver.textContent;
    }
    calculatePrice();
    var mask = document.getElementById("mask");
    if (mask) {
        if ((mask === null || mask === void 0 ? void 0 : mask.style.display) === "flex") {
            mask.style.display = "none";
        }
        else
            mask.style.display = "flex";
    }
}
function calculatePrice() {
    var buttonMobileCheckout = document.getElementById("buttonMobileCheckout");
    var How_much_would_you_like = document.getElementById("How_much_would_you_like");
    var How_often_should_we_deliver = document.getElementById("How_often_should_we_deliver");
    var weight250g = "250g";
    var weight500g = "500g";
    var weight1000g = "1000g";
    var everyWeek = "Every week";
    var every2Weeks = "Every 2 weeks";
    var everyMonth = "Every month";
    var price = (How_much_would_you_like === null || How_much_would_you_like === void 0 ? void 0 : How_much_would_you_like.textContent) === weight250g
        ? (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyWeek
            ? 7.2
            : (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === every2Weeks
                ? 9.6
                : (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyMonth
                    ? 12
                    : 0
        : (How_much_would_you_like === null || How_much_would_you_like === void 0 ? void 0 : How_much_would_you_like.textContent) === weight500g
            ? (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyWeek
                ? 13
                : (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === every2Weeks
                    ? 17.5
                    : (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyMonth
                        ? 22
                        : 0
            : (How_much_would_you_like === null || How_much_would_you_like === void 0 ? void 0 : How_much_would_you_like.textContent) === weight1000g
                ? (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyWeek
                    ? 22
                    : (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === every2Weeks
                        ? 32
                        : (How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyMonth
                            ? 42
                            : 0
                : 0;
    var perShipmentPrice = price;
    var perMonthPrice = 0;
    if ((How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyWeek) {
        perMonthPrice = perShipmentPrice * 4;
    }
    else if ((How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === every2Weeks) {
        perMonthPrice = perShipmentPrice * 2;
    }
    else if ((How_often_should_we_deliver === null || How_often_should_we_deliver === void 0 ? void 0 : How_often_should_we_deliver.textContent) === everyMonth) {
        perMonthPrice = perShipmentPrice * 1;
    }
    var formattedPerMonthPrice = "".concat("$".concat(perMonthPrice.toFixed(2)), " / mo");
    var formattedPerMonthPriceSpan = document.getElementById("formattedPerMonthPriceSpan");
    if (formattedPerMonthPriceSpan)
        formattedPerMonthPriceSpan.textContent = formattedPerMonthPrice;
    if (buttonMobileCheckout)
        buttonMobileCheckout.textContent = "Checkout - ".concat(formattedPerMonthPrice);
}
function handleNavbar() {
    var mobileNavigation = document.getElementById("mobileNavigation");
    if (mobileNavigation) {
        if (mobileNavigation.classList.contains("open"))
            mobileNavigation.classList.remove("open");
        else
            mobileNavigation.classList.add("open");
    }
}
(_a = document.getElementById("mask")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    fetch(form.action, {
        method: form.method,
        body: formData,
    })
        .then(function (response) {
        if (response.ok) {
            window.location.href = "./";
        }
        else {
            console.error("Form submission failed");
        }
    })
        .catch(function (error) {
        console.error("Error:", error);
    });
});
