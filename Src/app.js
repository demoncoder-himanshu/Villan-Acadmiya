// ==============================
// Application Data
// ==============================

const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

const newApplication =
    localStorage.getItem("newApplication");

// ==============================
// Organization Names
// ==============================

const organizationNames = {

    akatsuki: "AKATSUKI",

    "phantom-troupe": "PHANTOM TROUPE",

    demons: "DEMONS",

    cosmics: "COSMICS",

    "resident-evil": "RESIDENT EVIL"
};

// ==============================
// Latest Application
// ==============================

const latestApplication =
    applications.length > 0
        ? applications[applications.length - 1]
        : null;

// ==============================
// Toast Notification
// ==============================

const toast =
    document.querySelector("#toast");

const toastMessage =
    document.querySelector("#toast-message");

if (
    latestApplication &&
    newApplication === "true"
) {

    const data = latestApplication;

    toastMessage.textContent =
        "Application Submitted";

    toast.classList.add("show");

    toast.addEventListener(
        "click",
        function(event) {

            if (event.target.tagName === "A") {
                return;
            }

            document
                .querySelector("#requests")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );

    setTimeout(function() {

        if (data.status === "Accepted") {

            toastMessage.innerHTML = `
                ✓ Application Accepted
                <br>
                <a href="offer.html?id=${data.id}">
                    View Offer Letter →
                </a>
            `;

        } else {

            toastMessage.innerHTML = `
                ◇ Application Under Review
                <br>
                <span>
                    Awaiting academy decision...
                </span>
            `;
        }

        localStorage.removeItem("newApplication");

    }, 4000);
}

// ==============================
// Requests Section
// ==============================

const requestList =
    document.querySelector("#request-list");

if (
    requestList &&
    applications.length > 0
) {

    requestList.innerHTML = "";

    applications.forEach(function(data) {

        const organizationName =
            organizationNames[data.organization]
            || "VILLAN ACADMIYA";

        let actionButton = "";

        if (data.status === "Accepted") {

            actionButton = `
                <a
                    href="offer.html?id=${data.id}"
                    class="request-button"
                >
                    VIEW OFFER LETTER
                </a>
            `;

        } else {

            actionButton = `
                <span class="request-waiting">
                    APPLICATION UNDER REVIEW
                </span>
            `;
        }

        requestList.innerHTML += `

            <div class="request-card">

                <h3>
                    ${organizationName}
                </h3>

                <p>
                    <strong>Name:</strong>
                    ${data.name}
                </p>

                <p>
                    <strong>Alias:</strong>
                    ${data.alias}
                </p>

                <p>
                    <strong>Rank:</strong>
                    ${data.rank}
                </p>

                <p>
                    <strong>Score:</strong>
                    ${data.score}
                </p>

                <p class="request-status">

                    Application
                    ${
                        data.status === "Accepted"
                            ? "Accepted"
                            : "Under Review"
                    }

                </p>

                <div class="request-action">

                    ${actionButton}

                </div>

            </div>
        `;
    });
}