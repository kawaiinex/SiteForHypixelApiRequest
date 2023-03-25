const button = document.getElementById("myButton");

const apikey = `a6b9ecae-d42d-4532-9996-bc467d6738b8`;


// Add a click event listener to the button
button.addEventListener("click", async () => {
    let name = document.getElementById("myTextbox").value;
    let uuid = await GetPlayerUUid(name);
    let data = await GetHypixelJson(uuid);
    let ap = await GetPlayerAP(data);

    document.getElementById("output").innerHTML = ap;




});

async function GetPlayerAP(data){
    return data.player.achievementPoints;
}

async function GetPlayerUUid(name){
    let url = 'https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/' + name;

    let uuid;
    try {
        const response = await fetch(url , {method: 'GET'});
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        let data = await response.json();
        return data.id;



    } catch (error) {
        document.getElementById("output").innerHTML = error.message;
    }

}

async function GetHypixelJson(uuid){

    url = `https://api.hypixel.net/player?uuid=` + uuid +`&key=${apikey}`;
    try {
        const response = await fetch(url , {method: 'GET'});
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        let data = await response.json();
        return data;

    } catch (error) {
        console.log(error.message);
    }
}




