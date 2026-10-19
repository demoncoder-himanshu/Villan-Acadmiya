// ==============================
// Get Applications
// ==============================

const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

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
// Get Application ID
// ==============================

const params =
    new URLSearchParams(window.location.search);

const applicationId =
    params.get("id");

// ==============================
// Find Selected Application
// ==============================

const application =
    applications.find(function(data) {

        return data.id === applicationId;

    });

// ==============================
// Check Application
// ==============================

if (
    !application ||
    application.status !== "Accepted"
) {

    window.location.href = "index.html";

} else {

    const data = application;

    const organizationName =
        organizationNames[data.organization]
        || "VILLAN ACADMIYA";

    // ==============================
    // Fill Offer Letter
    // ==============================

    document.querySelector("#candidate-name")
        .textContent = data.name;

    document.querySelector("#candidate-alias")
        .textContent = data.alias;

    document.querySelector("#candidate-organization")
        .textContent = organizationName;

    document.querySelector("#candidate-rank")
        .textContent = data.rank;

    document.querySelector("#candidate-score")
        .textContent = data.score;
}