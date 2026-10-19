// ==============================
// Organization Data
// ==============================

const params = new URLSearchParams(window.location.search);
const organization = params.get("org");

const organizations = {
    akatsuki: {
        name: "AKATSUKI",
        description: "Legendary Rogue Shinobi Organization",
        image: "./Utils/Background/akatsuki.png"
    },

    "phantom-troupe": {
        name: "PHANTOM TROUPE",
        description: "Elite Criminal Organization",
        image: "./Utils/Background/phantom.png"
    },

    demons: {
        name: "DEMONS",
        description: "Upper Rank Demon Faction",
        image: "./Utils/Background/demons.png"
    },

    cosmics: {
        name: "COSMICS",
        description: "Extraterrestrial Destruction Force",
        image: "./Utils/Background/cosmic.png"
    },

    "resident-evil": {
        name: "RESIDENT EVIL",
        description: "Biological Weapons Division",
        image: "./Utils/Background/resident.png"
    }
};

const logo =
    document.querySelector("#organization-logo");

const name =
    document.querySelector("#organization-name");

const description =
    document.querySelector("#organization-description");

if (organization && organizations[organization]) {

    const org = organizations[organization];

    name.textContent = org.name;

    description.textContent =
        org.description;

    const img =
        document.createElement("img");

    img.src = org.image;

    img.alt = org.name;

    logo.appendChild(img);
}

// ==============================
// Form Submit
// ==============================

const form =
    document.querySelector("form");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const formData =
        new FormData(form);

    // ==============================
    // Get Form Data
    // ==============================

    const age =
        Number(formData.get("age"));

    const gender =
        formData.get("gender");

    const rank =
        formData.get("rank");

    const training =
        formData.getAll("training");

    const reason =
        formData.get("reason").trim();

    // ==============================
    // Validation
    // ==============================

    // Age Validation
    if (age < 13 || age > 100) {

        alert(
            "Age must be between 13 and 100."
        );

        return;
    }

    // Gender Validation
    if (!gender) {

        alert(
            "Please select your gender."
        );

        return;
    }

    // Rank Validation
    if (!rank) {

        alert(
            "Please select your rank."
        );

        return;
    }

    // Reason Validation
    if (reason.length === 0) {

        alert(
            "Please tell us why you want to join."
        );

        return;
    }

    // ==============================
    // Application Object
    // ==============================

    const application = {

        // Unique Application ID
        id: Date.now().toString(),

        name: formData.get("name"),
        alias: formData.get("alias"),
        age: age,
        gender: gender,
        rank: rank,
        training: training,
        reason: reason,
        rules: formData.get("rules"),
        accept: formData.get("accept"),
        organization: organization
    };

    // ==============================
    // Score Calculation
    // ==============================

    let score = 0;

    const rankScores = {

        E: 10,
        D: 20,
        C: 30,
        B: 40,
        A: 50,
        S: 60
    };

    score += rankScores[application.rank];

    score +=
        application.training.length * 5;

    if (application.reason.length >= 50) {

        score += 20;
    }

    // ==============================
    // Application Status
    // ==============================

    let status;

    if (score >= 60) {

        status = "Accepted";

    } else {

        status = "Rejected";
    }

    // ==============================
    // Complete Application
    // ==============================

    const applicationResult = {

        ...application,

        score: score,
        status: status
    };

    // ==============================
    // Get Existing Applications
    // ==============================

    const applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];

    // ==============================
    // Add New Application
    // ==============================

    applications.push(applicationResult);

    // ==============================
    // Save Applications
    // ==============================

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    // ==============================
    // New Application Notification
    // ==============================

    localStorage.setItem(
        "newApplication",
        "true"
    );

    // ==============================
    // Go To Home Page
    // ==============================

    window.location.href =
        "index.html";
});