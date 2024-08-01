// experimentalFunction1 - ^0.1.x by VillageR88 (https://github.com/VillageR88)
/**
 * The experimentalFunction1 implements a basic client-side rendering mechanism for a single-page application.
 * It intercepts link clicks and uses the Fetch API to load new content dynamically without a full page reload.
 * This approach enhances the user experience by providing faster navigation and reducing server load.
 * It also handles browser navigation events to maintain the correct state.
 */
function experimentalFunction1() {
    function loadContent(page: string | URL | Request | null | undefined) {
        if (page) {
            fetch(page)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((html) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const newContent = doc.querySelector("body")?.innerHTML;
                    const mainElement = document.querySelector("body");
                    if (mainElement && newContent) {
                        mainElement.innerHTML = newContent;
                        history.pushState(null, "", String(page));
                        setupLinkListeners(); // Re-setup link listeners after content load
                    } else {
                        console.error("Main element not found");
                    }
                })
                .catch((error) => console.error("Error loading content:", error));
        }
    }

    window.onpopstate = () => {
        const path = window.location.pathname;
        loadContent(path || "/"); // Load content based on the current path
    };

    function setupLinkListeners() {
        const links = Array.from(document.querySelectorAll("a"));
        for (const link of links) {
            link.addEventListener("click", (event: MouseEvent) => {
                window.scrollTo(0, 0); // optional
                event.preventDefault();
                const target = event.target as HTMLElement;
                const page = target.closest("a")?.getAttribute("href");
                if (page) {
                    loadContent(page);
                }
            });
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        setupLinkListeners();
        loadContent(window.location.pathname); // Load content based on the initial path
    });
}
experimentalFunction1();

//global variables
const empty = '_____';
const spanIDrinkMyCoffee = '“I drink my coffee';
const spanEmpty = '';

function optionCheckboxSelector(loop: string) {
    const wantUsToGrindThem = document.getElementById('Want_us_to_grind_themLabel');
    const grindOptionPrefix = document.getElementById('Want_us_to_grind_themPrefix');
    const createPlanBlocksInput = document.getElementsByClassName('createPlanBlocksInput') as HTMLCollectionOf<HTMLInputElement>;
    const preferencesPrefix = document.getElementById('How_do_you_drink_your_coffeePrefix');
    if (Number(loop) - 1 === 0) {
        if (preferencesPrefix) preferencesPrefix.textContent = spanIDrinkMyCoffee;
        if (grindOptionPrefix) grindOptionPrefix.textContent = spanEmpty;
        wantUsToGrindThem?.classList.remove('cloaked');
    }
    const spanIds = ['How_do_you_drink_your_coffee', 'What_type_of_coffee', 'How_much_would_you_like', 'Want_us_to_grind_them', 'How_often_should_we_deliver'];
    const plan = document.getElementsByClassName('plan') as HTMLCollectionOf<HTMLInputElement>;
    const inputOption = document.getElementsByClassName('inputOption') as HTMLCollectionOf<HTMLInputElement>;
    let checkedPlan = 0;
    for (let i = plan.length - 1; i > Number(loop) - 1; i--) {
        (createPlanBlocksInput[i].checked = false);
    }
    for (let i = 4; i > Number(loop) - 2; i--) {

        const item = document.getElementById(spanIds[i]);
        if (item) {
            if (item.id === 'Want_us_to_grind_them') {
                item.textContent = '';
            } else {
                item.textContent = empty;
            }
        }
    }
    for (let i = 0; i < plan.length; i++) {
        if (plan[i].checked === true) checkedPlan = i;
    }
    for (let i = 0; i < plan.length; i++) {
        plan[i].checked = false;
        plan[i].setAttribute('disabled', 'true');
    }
    for (let i = 0; i < Number(loop) - 1; i++) {
        plan[i].removeAttribute('disabled');

    }
    for (let i = Number(loop) * 3 - 3; i < inputOption.length; i++) {
        inputOption[i].checked = false;
    }
    plan[Number(loop) - 1].checked = true;
}

function optionNavSelector(loop: string) {
    const createPlanBlocksInput = document.getElementsByClassName('createPlanBlocksInput') as HTMLCollectionOf<HTMLInputElement>;
    const preferencesPrefix = document.getElementById('How_do_you_drink_your_coffeePrefix');
    const plan = document.getElementsByClassName('plan') as HTMLCollectionOf<HTMLInputElement>;
    let checkedPlan = 0;
    for (let i = 0; i < plan.length; i++) {
        if (plan[i].checked === true) checkedPlan = i;
    }
    if (Number(loop) >= checkedPlan) {
        for (let i = 0; i < plan.length; i++) {
            plan[i].checked = false;
            plan[i].setAttribute('disabled', 'true');
        }
        for (let i = 0; i <= Number(loop); i++) {
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
    const spanGroundAla = ', ground ala';
    const preferences = document.getElementById('How_do_you_drink_your_coffee');
    const grindOption = document.getElementById('Want_us_to_grind_them');
    const grindOptionPrefix = document.getElementById('Want_us_to_grind_themPrefix');
    const wantUsToGrindThem = document.getElementById('Want_us_to_grind_themLabel');
    if (preferencesPrefix && grindOption && preferences && grindOptionPrefix && Number(loop) === 0)
        if (preferences.textContent === 'Capsule') {
            grindOption.textContent = spanEmpty;
            grindOptionPrefix.textContent = spanEmpty;
            preferencesPrefix.textContent = `${spanIDrinkMyCoffee} as`;
            wantUsToGrindThem?.classList.add('cloaked');

        }
        else if (preferences.textContent === 'Filter' || preferences.textContent === 'Espresso') {
            wantUsToGrindThem?.classList.remove('cloaked');
            preferencesPrefix.textContent = `${spanIDrinkMyCoffee} with`
            grindOptionPrefix.textContent = spanGroundAla;
            if (grindOption.textContent === spanEmpty) grindOption.textContent = empty;
        }
        else {
            preferencesPrefix.textContent = spanIDrinkMyCoffee;
        };
}

function checkOrderSummary() {
    const buttonCreateMyPlan = document.getElementById('buttonCreateMyPlan') as HTMLButtonElement;
    document.getElementById('orderSummary')?.textContent?.includes(empty) ? buttonCreateMyPlan?.setAttribute('disabled', 'true') : buttonCreateMyPlan?.removeAttribute('disabled');
}

// <span id="How_do_you_drink_your_coffee">_____</span>, with a
// <span id="What_type_of_coffee">_____</span> type of bean.
// <span id="How_much_would_you_like">_____</span>, ground ala
// <span id="Want_us_to_grind_them">_____</span>, sent to me
// <span id="How_often_should_we_deliver">_____</span>.”
//we gonna also create array of all span ids

