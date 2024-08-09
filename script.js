//  <--->
 
//  Developed by Nadim Srabon
 
//  <--->
const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

// Select elements
const dropdown = document.querySelectorAll(".countries select");
const btn = document.querySelector("form button");
const toCurr = document.querySelector(".to select");
const img = document.querySelector("#toImg");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency options
for(let select of dropdown){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        
        if(select.name === "to" && currCode === "BDT"){
            newOption.selected = "selected";
        }
            
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Handle button click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/eur.json`;  // Assuming base currency is EUR

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        let rate = data.eur[toCurr.value.toLowerCase()];
        if (rate === undefined) {
            throw new Error('Currency code not found in the data');
        }


        let exchangeValue = amtVal * rate;

        msg.innerText = `${amtVal} EUR = ${exchangeValue} ${toCurr.value.toUpperCase()}  `;

        // console.log(`Amount ${amtVal} in ${toCurr.value.toUpperCase()}:`, exchangeValue);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Update flag based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = document.querySelector("#toImg");
    img.src = newSrc;
}


























//  <--->
 
//  Developed by Nadim Srabon
 
//  <--->
