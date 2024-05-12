let body = document.querySelector("tbody")

let stats = JSON.parse(localStorage.getItem("bossStats"))

let foot = document.querySelector("tfoot")

if (!stats || stats.length < 8){
    location.pathname = "/"
} else {
    renderStats()
}

function renderStats() {
    let totalTime = 0
    let totalHp = 0
    let totalHealed = 0

    stats.forEach(element => {
        totalTime += element.time
        totalHp += element.hp
        totalHealed += element.restoreHp

        body.innerHTML += `
        <tr class="boss">
            <td class="image">
                <img src="${element.image}">
            </td>

            <td class="time">
                ${element.time}
            </td>

            <td class="hp">
                ${element.hp}
            </td>

            <td class="restoreHp">
                ${element.restoreHp}
            </td>

            <td>
                
            </td>
        </tr>`
    });

    foot.innerHTML = `
    <tr>
        <th></th>

        <th>${totalTime}</th>

        <th>${totalHp}</th>

        <th>${totalHealed}</th>

        <th>Total</th>
    </tr>`
}