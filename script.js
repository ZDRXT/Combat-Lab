let volume = document.querySelector(".volume")

let audio = document.querySelector(".audio")

let audioStatus = false

volume.addEventListener("click", () => {
    if (audioStatus == false){
        audioStatus = true
        audio.play()
        volume.classList.add("active")
    } else {
        audioStatus = false
        audio.pause()
        volume.classList.remove("active")
    }
})