//Testscript to test JSON parsing

const jsonText = `{
    "teammembers": [
        {"firstName":"Louise", "lastName":"Rylander", "occupation":"Student"},
        {"firstName":"Leo", "lastName":"Engberg", "occupation":"Student"},
        {"firstName":"Elin", "lastName":"Ratcliff", "occupation":"Student"}
    ],
    "qa": [
        {
            "question": "Vilka yrkesroller finns inom Frontend/UX på ert företag?",
            "answer": "Formgivare med UX, Fullstackdeveloper och Frontenddeveloper."
        },
        {
            "question": "Vilka är deras ansvar och arbetsuppgifter?",
            "answer": "Formgivarnas ansvar är egentligen för hela designprocessen, hitta rätt målgrupp och identitet till företaget..."
        }
    ]
}`;
function parseData(jsonString) {
    console.log("Parsing JSON...");
    return JSON.parse(jsonString);
}
const data = parseData(jsonText);
if (data) {
    let teamHTML = "";
    for (const member of data.teammembers) {
        teamHTML += `<li>${member.firstName} ${member.lastName} – ${member.occupation}</li>`;
    }
    document.querySelector("#team").innerHTML = teamHTML;
    let qaHTML = "";
    for (const item of data.qa) {
        qaHTML += `<h3>${item.question}</h3><p>${item.answer}</p>`;
    }
    document.querySelector("#qa").innerHTML = qaHTML;
}
