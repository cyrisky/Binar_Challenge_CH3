const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll(className = 'button')
const batuComputerDisplay = document.getElementById('batuComputer')
const guntingComputerDisplay = document.getElementById('guntingComputer')
const kertasComputerDisplay = document.getElementById('kertasComputer')
const refreshButton = document.getElementById('refreshButton')
let userChoice
let computerChoice
let result

// Pilihan User
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    generateComputerChoice()
    getResults()
}))

// Pilihan Computer
// baru
class computerSkill {
    constructor (compItem) {
        this.compChoice = compItem
    }
    pilihBatu() {
        computerChoice = "batu"
        batuComputerDisplay.setAttribute('class','computerSkillSelected')
        guntingComputerDisplay.setAttribute('class','computerSkill')
        kertasComputerDisplay.setAttribute('class','computerSkill')
    }
    pilihKertas() {
        computerChoice = "kertas"
        batuComputerDisplay.setAttribute('class','computerSkill')
        guntingComputerDisplay.setAttribute('class','computerSkill')
        kertasComputerDisplay.setAttribute('class','computerSkillSelected')
    }
    pilihGunting() {
        computerChoice = "gunting"
        batuComputerDisplay.setAttribute('class','computerSkill')
        guntingComputerDisplay.setAttribute('class','computerSkillSelected')
        kertasComputerDisplay.setAttribute('class','computerSkill')
    }
}

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length)
    console.log(randomNumber)

    if (randomNumber === 0) {
        let batu = new computerSkill("batu")
        batu.pilihBatu()
    }
    if (randomNumber === 1) {
        let kertas = new computerSkill("kertas")
        kertas.pilihKertas()
    }
    if (randomNumber === 2) {
        let gunting = new computerSkill("gunting")
        gunting.pilihGunting()
    }
}

// Hasil tanding
function getResults() {
    if (computerChoice === userChoice) {
        result = 'DRAW'
    }
    if (computerChoice === 'batu' && userChoice === 'kertas') {
        result = 'PLAYER 1 WIN'
    }
    if (computerChoice === 'batu' && userChoice === 'gunting') {
        result = 'COM WIN'
    }
    if (computerChoice === 'kertas' && userChoice === 'gunting') {
        result = 'PLAYER 1 WIN'
    }
    if (computerChoice === 'kertas' && userChoice === 'batu') {
        result = 'COM WIN'
    }
    if (computerChoice === 'gunting' && userChoice === 'batu') {
        result = 'PLAYER 1 WIN'
    }
    if (computerChoice === 'gunting' && userChoice === 'kertas') {
        result = 'COM WIN'
    }
    resultDisplay.innerHTML = result
    resultDisplay.setAttribute('class','results')
}

// Button Refresh
function buttonRefresh() {
    batuComputerDisplay.setAttribute('class','computerSkill')
    kertasComputerDisplay.setAttribute('class','computerSkill')
    guntingComputerDisplay.setAttribute('class','computerSkill')
    resultDisplay.setAttribute('class','versus')
    resultDisplay.innerHTML = 'VS'
}