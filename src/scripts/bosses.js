let allBossCards = document.querySelectorAll(".boss__card")
let doorsStage1 = document.querySelectorAll(".stage-1 .door")
let doorsStage2 = document.querySelectorAll(".stage-2 .door")
let openBoss = 1

allBossCards.forEach(boss => {
	boss.addEventListener("click", () => {
		let bossId = boss.dataset.id

		if (bossId > openBoss) {
			alert("You must pass previous boss")
		} else {
			localStorage.setItem("bossId", bossId)
			location.pathname = "/src/pages/game.html"
		}
	})
})

function checkOpenBoss() {
	let data = localStorage.getItem("open-boss")

	if (data) {
		openBoss = +data
	}
}

checkOpenBoss()

doorsStage1.forEach((door, index) => {
	if (index + 1 < openBoss) {
		console.log(door)
		door.classList.add("opened")
		door.src = "/images/backgrounds/door-opened.png"
	}
})

doorsStage2.forEach((door, index) => {
	if (index + 5 < openBoss) {
		console.log(door)
		door.classList.add("opened")
		door.src = "/images/backgrounds/door-opened.png"
	}
})