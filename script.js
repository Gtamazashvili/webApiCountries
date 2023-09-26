document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("searchButton");
    let inputElement = document.getElementById("inputForCountryName");

    let countryMap = new Map(); 

    searchButton.addEventListener("click", function() {
       
        fetch(`https://restcountries.com/v3.1/name/${inputElement.value}`)
        .then(response => {
            if (!response.ok) {
                let errorDiv = document.createElement("div");
                errorDiv.classList.add("optionDiv");
                errorDiv.style.backgroundColor="#C36A6A";
                errorDiv.textContent="Country not found search a different one";
                document.getElementById("inputDiv").appendChild(errorDiv);
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {
            inputDiv.innerHTML = '';
            if(data.length > 1 ) {
            let inputDiv = document.getElementById("inputDiv");
            data.forEach((element, index) => {
                let div = document.createElement("div");
                div.classList.add("optionDiv");  
                div.textContent = element.name.common;
                inputDiv.appendChild(div);
                countryMap.set(div, element);
            });
        }
            return data; 
        })
        .then(data => {
                       
        if(data.length > 1){
            countryMap.forEach((value, key) => {
                key.addEventListener('click', function() {
                    inputDiv.innerHTML = '';
                    processCountryData(value)
                });
            });

        }else{

            processCountryData(data[0])
        }
        })
        .catch(err => console.log("error:", err));
    });

    function processCountryData(country) {
        if(country) {
            document.getElementById("flagPicture").src=country.flags.png;
            document.getElementById("nameOfTheCountry").innerHTML=country.name.common;
            document.getElementById("region").innerHTML="region : "+country.region;
            document.getElementById("population").innerHTML="population : "+country.population;
            document.getElementById("subregion").innerHTML="subregion : "+ country.subregion;
            let currencyCode = Object.keys(country.currencies)[0];
            document.getElementById("currencyDetails").innerHTML="test"
            document.getElementById("currencyDetails").innerHTML = 
                "currency code: " + currencyCode +"</br>"+
                " currency name: " + country.currencies[currencyCode].name +"</br>"+
                " currency symbol: " + country.currencies[currencyCode].symbol


            let borders=country.borders;
            let flags=document.getElementById("flags")
            flags.innerHTML="";
            let h1=document.getElementById("bordersh1")
            h1.innerHTML="neighbours of the country"
            
            if(borders){
                borders.forEach(element => {
                    fetch(`https://restcountries.com/v3.1/name/${element}`)
                    .then(response=>{
                        if(!response.ok){
                            console.log("country not found")
                        }else{
                            return response.json();
                        }
                        
                    })
                    .then(data=>{
                        if(data){
                        const country = data[0];
                        let img=document.createElement("img")
                        img.style.width="400px"
                        img.style.height="250px"
                        img.style.margin="10px"
                        img.src=country.flags.png;
                        flags.appendChild(img);
                        }
                    })
                    .catch(err => console.log("error:", err));
                })
        }
        }
    }
});
