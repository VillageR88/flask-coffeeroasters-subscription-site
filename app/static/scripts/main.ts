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
experimentalFunction1(); // If you want to use this function (at current stage) in your project, you do it on your own risk.

//global variables
const empty = "_____";
const spanIDrinkMyCoffee = "“I drink my coffee";
const spanEmpty = "";

function navSelector(loop: string) {
	const wantUsToGrindThem = document.getElementById(
		"Want_us_to_grind_themLabel",
	);
	const grindOptionPrefix = document.getElementById(
		"Want_us_to_grind_themPrefix",
	);
	const createPlanBlocksInput = document.getElementsByClassName(
		"createPlanBlocksInput",
	) as HTMLCollectionOf<HTMLInputElement>;
	const preferencesPrefix = document.getElementById(
		"How_do_you_drink_your_coffeePrefix",
	);
	if (Number(loop) - 1 === 0) {
		if (preferencesPrefix) preferencesPrefix.textContent = spanIDrinkMyCoffee;
		if (grindOptionPrefix) grindOptionPrefix.textContent = spanEmpty;
		wantUsToGrindThem?.classList.remove("cloaked");
	}
	const spanIds = [
		"How_do_you_drink_your_coffee",
		"What_type_of_coffee",
		"How_much_would_you_like",
		"Want_us_to_grind_them",
		"How_often_should_we_deliver",
	];
	const plan = document.getElementsByClassName(
		"plan",
	) as HTMLCollectionOf<HTMLInputElement>;
	const inputOption = document.getElementsByClassName(
		"inputOption",
	) as HTMLCollectionOf<HTMLInputElement>;
	let checkedPlan = 0;
	for (let i = plan.length - 1; i > Number(loop) - 1; i--) {
		createPlanBlocksInput[i].checked = false;
	}
	for (let i = 4; i > Number(loop) - 2; i--) {
		const item = document.getElementById(spanIds[i]);
		if (item) {
			if (item.id === "Want_us_to_grind_them") {
				item.textContent = "";
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
		plan[i].setAttribute("disabled", "true");
	}
	for (let i = 0; i < Number(loop) - 1; i++) {
		plan[i].removeAttribute("disabled");
	}
	for (let i = Number(loop) * 3 - 3; i < inputOption.length; i++) {
		inputOption[i].checked = false;
	}
	plan[Number(loop) - 1].checked = true;
}

function optionSelector(loop: string) {
	const createPlanBlocksInput = document.getElementsByClassName(
		"createPlanBlocksInput",
	) as HTMLCollectionOf<HTMLInputElement>;
	const preferencesPrefix = document.getElementById(
		"How_do_you_drink_your_coffeePrefix",
	);
	const plan = document.getElementsByClassName(
		"plan",
	) as HTMLCollectionOf<HTMLInputElement>;
	let checkedPlan = 0;
	for (let i = 0; i < plan.length; i++) {
		if (plan[i].checked === true) checkedPlan = i;
	}
	if (Number(loop) >= checkedPlan) {
		for (let i = 0; i < plan.length; i++) {
			plan[i].checked = false;
			plan[i].setAttribute("disabled", "true");
		}
		for (let i = 0; i <= Number(loop); i++) {
			plan[i].removeAttribute("disabled");
		}
		if (
			Number(loop) === 2 &&
			document.querySelector("main.create-your-plan .cloaked")
		) {
			plan[Number(loop) + 2].checked = true;
			createPlanBlocksInput[Number(loop) + 1].checked = true;
		} else if (Number(loop) + 1 <= plan.length - 1) {
			plan[Number(loop) + 1].checked = true;
			createPlanBlocksInput[Number(loop) + 1].checked = true;
		} else {
			plan[Number(loop)].checked = true;
		}
	}
	const spanGroundAla = ", ground ala";
	const preferences = document.getElementById("How_do_you_drink_your_coffee");
	const grindOption = document.getElementById("Want_us_to_grind_them");
	const grindOptionPrefix = document.getElementById(
		"Want_us_to_grind_themPrefix",
	);
	const wantUsToGrindThem = document.getElementById(
		"Want_us_to_grind_themLabel",
	);
	const inputOptionHow_do_you_drink_your_coffeeCapsule =
		document.getElementById(
			"inputOptionHow_do_you_drink_your_coffeeCapsule",
		) as HTMLInputElement;
	const inputOptionWant_us_to_grind_them = document.getElementsByClassName(
		"inputOptionWant_us_to_grind_them",
	) as HTMLCollectionOf<HTMLInputElement>;
	if (
		preferencesPrefix &&
		grindOption &&
		preferences &&
		grindOptionPrefix &&
		Number(loop) === 0
	) {
		if (preferences.textContent === "Capsule") {
			grindOption.textContent = spanEmpty;
			grindOptionPrefix.textContent = spanEmpty;
			preferencesPrefix.textContent = `${spanIDrinkMyCoffee} as`;
			wantUsToGrindThem?.classList.add("cloaked");
			//
		} else if (
			preferences.textContent === "Filter" ||
			preferences.textContent === "Espresso"
		) {
			wantUsToGrindThem?.classList.remove("cloaked");
			preferencesPrefix.textContent = `${spanIDrinkMyCoffee} with`;
			grindOptionPrefix.textContent = spanGroundAla;
			if (grindOption.textContent === spanEmpty)
				grindOption.textContent = empty;
		} else {
			preferencesPrefix.textContent = spanIDrinkMyCoffee;
		}
		if (inputOptionHow_do_you_drink_your_coffeeCapsule.checked) {
			for (let i = 0; i < inputOptionWant_us_to_grind_them.length; i++) {
				inputOptionWant_us_to_grind_them[i].checked = false;
			}
		}
	}
}

function checkOrderSummary() {
	const buttonCreateMyPlan = document.getElementById(
		"buttonCreateMyPlan",
	) as HTMLButtonElement;
	document.getElementById("orderSummary")?.textContent?.includes(empty)
		? buttonCreateMyPlan?.setAttribute("disabled", "true")
		: buttonCreateMyPlan?.removeAttribute("disabled");
}

function handleMask() {
	scrollTo(0, 0);
	const How_do_you_drink_your_coffeePrefix = document.getElementById(
		"How_do_you_drink_your_coffeePrefix",
	);
	const How_do_you_drink_your_coffeePrefixCopy = document.getElementById(
		"How_do_you_drink_your_coffeePrefixCopy",
	);
	const How_do_you_drink_your_coffee = document.getElementById(
		"How_do_you_drink_your_coffee",
	);
	const How_do_you_drink_your_coffeeCopy = document.getElementById(
		"How_do_you_drink_your_coffeeCopy",
	);
	const What_type_of_coffee = document.getElementById("What_type_of_coffee");
	const What_type_of_coffeeCopy = document.getElementById(
		"What_type_of_coffeeCopy",
	);
	const How_much_would_you_like = document.getElementById(
		"How_much_would_you_like",
	);
	const How_much_would_you_likeCopy = document.getElementById(
		"How_much_would_you_likeCopy",
	);
	const Want_us_to_grind_them = document.getElementById(
		"Want_us_to_grind_them",
	);
	const Want_us_to_grind_themCopy = document.getElementById(
		"Want_us_to_grind_themCopy",
	);
	const How_often_should_we_deliver = document.getElementById(
		"How_often_should_we_deliver",
	);
	const How_often_should_we_deliverCopy = document.getElementById(
		"How_often_should_we_deliverCopy",
	);
	if (
		How_do_you_drink_your_coffeePrefix &&
		How_do_you_drink_your_coffeePrefixCopy
	) {
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

	const mask = document.getElementById("mask");
	if (mask) {
		if (mask?.style.display === "flex") {
			mask.style.display = "none";
		} else mask.style.display = "flex";
	}
}

function calculatePrice() {
	const buttonMobileCheckout = document.getElementById("buttonMobileCheckout");
	const How_much_would_you_like = document.getElementById(
		"How_much_would_you_like",
	);
	const How_often_should_we_deliver = document.getElementById(
		"How_often_should_we_deliver",
	);
	const weight250g = "250g";
	const weight500g = "500g";
	const weight1000g = "1000g";
	const everyWeek = "Every week";
	const every2Weeks = "Every 2 weeks";
	const everyMonth = "Every month";
	const price =
		How_much_would_you_like?.textContent === weight250g
			? How_often_should_we_deliver?.textContent === everyWeek
				? 7.2
				: How_often_should_we_deliver?.textContent === every2Weeks
					? 9.6
					: How_often_should_we_deliver?.textContent === everyMonth
						? 12
						: 0
			: How_much_would_you_like?.textContent === weight500g
				? How_often_should_we_deliver?.textContent === everyWeek
					? 13
					: How_often_should_we_deliver?.textContent === every2Weeks
						? 17.5
						: How_often_should_we_deliver?.textContent === everyMonth
							? 22
							: 0
				: How_much_would_you_like?.textContent === weight1000g
					? How_often_should_we_deliver?.textContent === everyWeek
						? 22
						: How_often_should_we_deliver?.textContent === every2Weeks
							? 32
							: How_often_should_we_deliver?.textContent === everyMonth
								? 42
								: 0
					: 0;
	const perShipmentPrice = price;
	let perMonthPrice = 0;
	if (How_often_should_we_deliver?.textContent === everyWeek) {
		perMonthPrice = perShipmentPrice * 4;
	} else if (How_often_should_we_deliver?.textContent === every2Weeks) {
		perMonthPrice = perShipmentPrice * 2;
	} else if (How_often_should_we_deliver?.textContent === everyMonth) {
		perMonthPrice = perShipmentPrice * 1;
	}
	const formattedPerMonthPrice = `${perMonthPrice.toFixed(2)} / mo`;
	const formattedPerMonthPriceSpan = document.getElementById(
		"formattedPerMonthPriceSpan",
	);
	if (formattedPerMonthPriceSpan)
		formattedPerMonthPriceSpan.textContent = formattedPerMonthPrice;
	if (buttonMobileCheckout)
		buttonMobileCheckout.textContent = `Checkout - ${formattedPerMonthPrice}`;
}

function handleNavbar() {
	const mobileNavigation = document.getElementById("mobileNavigation");
	if (mobileNavigation) {
		if (mobileNavigation.classList.contains("open"))
			mobileNavigation.classList.remove("open");
		else mobileNavigation.classList.add("open");
	}
}
