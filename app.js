const pokeURL = "https://pokeapi.co/api/v2/pokemon/"
const pokeCount = 151
const pokeContainerEl = document.querySelector(".poke-container")
const pokeLoadingEl = document.querySelector(".lds-ring")

const inputEl = document.querySelector("#search-input")
const selectEl = document.querySelector("#poke-types")
let count = 0
async function getPokemon() {
    for (let i = 1; i <= pokeCount; i++) {
        const response = await fetch(pokeURL + i)
        const pokeData = await response.json()
        renderPokemon(pokeData, i)
    }
}

function renderPokemon(pokeData, id) {
    const pokeID = id
    const pokeName =
        pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)
    const pokeType =
        pokeData.types[0].type.name.charAt(0).toUpperCase() +
        pokeData.types[0].type.name.slice(1)

    if (pokeData.types.length === 2) {
        const pokeType2 =
            pokeData.types[1].type.name.charAt(0).toUpperCase() +
            pokeData.types[1].type.name.slice(1)
        const pokeBox = `
        <div class="poke-box">
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
            alt="pokemon-image"
        />
        <p id="pokeID">#${id}</p>
        <p>Name<span id="name">${pokeName}</span></p>
        <p>Types<span id="type"> ${pokeType} / ${pokeType2}</span></p>
        
        </div>
        `
        pokeContainerEl.innerHTML += pokeBox
    } else {
        const pokeBox = `
        <div class="poke-box">
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
            alt="pokemon-image"
        />
        <p id="pokeID">#${id}</p>
        <p>Name<span id="name">${pokeName}</span></p>
        <p>Type<span id="type"> ${pokeType}</span></p>
        </div>
        `
        pokeContainerEl.innerHTML += pokeBox
    }

    count += 1
    if (count != pokeCount) {
        selectEl.disabled = true
        pokeContainerEl.style.display = "none"
        pokeLoadingEl.style.display = "inline-block"
    } else {
        selectEl.disabled = false
        pokeLoadingEl.style.display = "none"
        pokeContainerEl.style.display = "flex"
    }
}

getPokemon()

inputEl.addEventListener("input", (e) => {
    const search = inputEl.value.toLowerCase()
    const pokeNames = document.querySelectorAll("#name")

    pokeNames.forEach((pokeName) => {
        pokeName.parentElement.parentElement.style.display = "block"

        if (!pokeName.innerHTML.toLowerCase().includes(search)) {
            pokeName.parentElement.parentElement.style.display = "none"
        }
    })
    selectEl.selectedIndex = "0"
})

selectEl.addEventListener("change", (e) => {
    const pokeTypes = document.querySelectorAll("#type")
    const type = e.target.value
    pokeTypes.forEach((pokeType) => {
        pokeType.parentElement.parentElement.style.display = "block"

        if (type === "all") {
            pokeType.parentElement.parentElement.style.display = "block"
        } else if (!pokeType.innerHTML.toLowerCase().includes(type)) {
            pokeType.parentElement.parentElement.style.display = "none"
        }
    })
})
