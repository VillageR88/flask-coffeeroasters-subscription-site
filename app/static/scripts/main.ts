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


function selectParallelCheckbox(loop: string) {
    const checkboxes = document.getElementsByClassName('createPlanBlocksInput');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].removeAttribute('checked');
    }
    checkboxes[Number(loop) - 1].setAttribute('checked', 'checked');
}