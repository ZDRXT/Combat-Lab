let weaponBtns = document.querySelectorAll(".weapon")
let bossTarget = document.querySelector(".boss img")
let bossHealthElemet = document.querySelector(".boss-inf .health-bar-progress")
let playerHealthElement = document.querySelector(".player-inf .health-bar-progress")

let modal = document.querySelector(".modal")
let modalTitle = document.querySelector(".modal-window h2")
let modalBtnAgain = document.querySelector(".modal-window-again")
let modalBtnMenu = document.querySelector(".modal-window-menu")
let modalBtnNext = document.querySelector(".modal-window-next")
let modalBossImg = document.querySelector(".modal-window-boss img")
let modalBossName = document.querySelector(".boss-stats-name span")
let modalBossHp = document.querySelector(".boss-stats-hp span")
let modalBossDamageDeal = document.querySelector(".boss-stats-damage span")
let modalBossTime = document.querySelector(".boss-stats-time span")

let timerGame = document.querySelector("header .timer")
let timerGameInitial
let timerGameCounter = 0

let tools = document.querySelectorAll(".tools button")

let bossObject

let bossId
let bossHp
let currentBossHp
let currentBossHpPrcent = 100
let currentDamage = 1
let currentDamagePrcent

let playerHp = +localStorage.getItem("bossId") * 500 + 500
let currentPlayerHpPrecent = 100

let playerHp15 = Math.floor(playerHp * 0.15)
let playerHp40 = Math.floor(playerHp * 0.4)

let restoreHp = 0

let bossDamage
let bossDamagePrecent
let bossDamageInterval

let bossImg

let drops = {
	drop1: true,
	drop2: true,
	drop3: true,
}

function getCurrentBoss() {
	bossId = +localStorage.getItem("bossId")
	
	if (bossId == 8){
		modalBtnNext.style.display = "none"
	}

	let difficult = +localStorage.getItem("difficult")

	if (!difficult){
		difficult = 1
	}

	fetch("../data/bosses.json")
		.then(res => res.json())
		.then(data => {
			let currentDataBoss = data.bossesList.filter(boss => boss.id === bossId)[0]
			console.log(difficult)

			if (currentDataBoss) {
				bossObject = currentDataBoss
				bossHp = currentDataBoss.hp * difficult
				currentBossHp = bossHp
				bossTarget.src = currentDataBoss.img
				bossImg = currentDataBoss.img
				calcDamage(currentDamage)
				bossDamage = currentDataBoss.damage * difficult
				bossDamagePrecent = bossDamage * 100 / playerHp
				bossDamageInterval = setInterval(() => {
					if (currentPlayerHpPrecent <= 0) {
						clearInterval(bossDamageInterval)
						showModal(false)
					} else {
						currentPlayerHpPrecent = +(currentPlayerHpPrecent - bossDamagePrecent).toFixed(3)
						playerHealthElement.style.width = currentPlayerHpPrecent + "%"
					}
				}, +((bossHp - 100) / 3.5).toFixed(0))

				timerGameInitial = setInterval(() => {
					timerGameCounter++

					timerGame.innerHTML = timerGameCounter
				}, 1000)
			}
		})
}

function calcDamage(damage) {
	currentDamagePrcent = damage * 100 / bossHp
}

getCurrentBoss()

bossTarget.addEventListener("click", () => {
	currentBossHpPrcent = +(currentBossHpPrcent - currentDamagePrcent).toFixed(3)
	bossHealthElemet.style.width = currentBossHpPrcent + "%"
	currentBossHp -= currentDamage
	console.log(currentBossHp)

	if (currentBossHpPrcent < 95) {
		weaponBtns[1].disabled = false
	}

	if (currentBossHpPrcent < 80) {
		if (drops.drop1) {
			tools[0].disabled = false
			drops.drop1 = false
		}
		weaponBtns[2].disabled = false
	}

	if (currentBossHpPrcent < 65) {
		weaponBtns[3].disabled = false
	}

	if (currentBossHpPrcent < 50) {
		weaponBtns[4].disabled = false
		if (drops.drop2) {
			tools[0].disabled = false
			tools[1].disabled = false
			drops.drop2 = false
		}
	}

	if (currentBossHpPrcent < 40) {
		weaponBtns[5].disabled = false
	}

	if (currentBossHpPrcent < 25) {
		weaponBtns[6].disabled = false
		if (drops.drop3) {
			tools[1].disabled = false
			tools[2].disabled = false
			drops.drop3 = false
		}
	}

	if (currentBossHpPrcent < 15) {
		weaponBtns[7].disabled = false
	}

	if (currentBossHpPrcent <= 0) {
		showModal(true)
		updateStats()
		updateOpenBoss()
	}
})

function updateStats() {
	let stats = JSON.parse(localStorage.getItem("bossStats"))

	let bossInfo = {
		id: bossId,
		hp: bossHp,
		time: timerGameCounter,
		image: bossImg,
		damage: bossDamage,
		restoreHp: restoreHp
	}

	if (stats){
		let index = stats.findIndex((element) => element.id == bossId)

		if (index >= 0){
			stats[index] = bossInfo
		} else {
			stats.push(bossInfo)
		}

		localStorage.setItem("bossStats", JSON.stringify(stats))
		
	} else {
		localStorage.setItem("bossStats", JSON.stringify([bossInfo]))
	}
}

function updateOpenBoss() {
	if (bossId == 8){
		location.pathname = "/src/pages/final.html"
	} else {
		localStorage.setItem("open-boss", bossId + 1)
	}
}

weaponBtns.forEach(weapon => {
	weapon.disabled = true
	weapon.addEventListener("click", () => {
		currentDamage = +weapon.dataset.damage
		calcDamage(currentDamage)
	})
})

tools.forEach(tool => {
	tool.disabled = true
	tool.addEventListener("click", () => {
		tool.disabled = true
		let option = tool.dataset.option

		if (option == "syringe") {
			currentDamage += +(currentDamage * 0.1).toFixed(1)
			calcDamage(currentDamage)
		}
		if (option == "bandage") {
			if (currentPlayerHpPrecent > 85) {
				currentPlayerHpPrecent = 100
			} else {
				currentPlayerHpPrecent += 15
			}
			restoreHp += playerHp15
		}
		if (option == "aid-kit") {
			if (currentPlayerHpPrecent > 60) {
				currentPlayerHpPrecent = 100
			} else {
				currentPlayerHpPrecent += 40
			}
			restoreHp += playerHp40
		}
	})
})

function showModal(param){
	clearInterval(timerGameInitial)
	modal.classList.remove("hide")
	modalBossImg.src = bossObject.img
	modalBossName.innerHTML = bossObject.name
	modalBossHp.innerHTML = bossObject.hp
	modalTitle.innerHTML = param ? "You win!" : "You lose!"
	modalBossDamageDeal.innerHTML = param ? bossObject.hp : bossObject.hp - currentBossHp
	modalBossTime.innerHTML = timerGameCounter
}

modalBtnAgain.addEventListener("click", () => {
	window.location.reload()
})

modalBtnMenu.addEventListener("click", () => {
	location.pathname = "/src/pages/bosses.html"
})

modalBtnNext.addEventListener("click", () => {
	localStorage.setItem("bossId", bossId + 1)
	window.location.reload()
})

weaponBtns[0].disabled = false