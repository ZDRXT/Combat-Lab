let newGameButton = document.querySelector(".new-game-button")
let startButton = document.querySelector(".start-button")
let optionsButton = document.querySelector(".options-button")
let creditsButton = document.querySelector(".credits-button")
let modalElement = document.querySelector(".modal")

let options = document.querySelector(".options")
let credits = document.querySelector(".credits")

let difficult = "EASY"

let selectDifficult = document.querySelector(".options select")

if (!localStorage.getItem("bossStats")) {
	startButton.style.display = "none"
} else {
	startButton.addEventListener("click", () => {
		location.pathname = "/src/pages/bosses.html"
	})
}

newGameButton.addEventListener("click", () => {
	localStorage.clear()
	location.pathname = "/src/pages/bosses.html"
})


optionsButton.addEventListener("click", () => openModal(options))

creditsButton.addEventListener("click", () => openModal(credits))

function openModal(selector) {
	modalElement.classList.add("active-modal")

	selector.classList.add("active")
}

modalElement.addEventListener("click", (event) => {
	let clickedOptions = event.target.closest(".options")

	if (!clickedOptions) {
		modalElement.classList.remove("active-modal")
		options.classList.remove("active")
		credits.classList.remove("active")
	}
})

selectDifficult.addEventListener("change", () => {
	difficult = selectDifficult.value
	saveDifficult()
})

function getDifficult() {
	let data = localStorage.getItem("difficult")

	if (data) {
		let opts = selectDifficult.querySelectorAll("option")
		if (data == 1) {
			opts[0].selected = true
		}
		if (data == 1.5) {
			opts[1].selected = true
		}
		if (data == 2) {
			opts[2].selected = true
		}
	} else {
		localStorage.setItem("difficult", 1)
	}
}

function saveDifficult() {
	if (difficult === "EASY") {
		localStorage.setItem("difficult", 1)
		return
	}

	if (difficult === "MEDIUM") {
		localStorage.setItem("difficult", 1.5)
		return
	}

	if (difficult === "HARD") {
		localStorage.setItem("difficult", 2)
		return
	}
}

getDifficult()