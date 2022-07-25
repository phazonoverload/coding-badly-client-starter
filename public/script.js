function move(current, history) {
    const { height, width } = current.board

    const table = document.querySelector('table')
    table.innerHTML = ''
    for(let y=height-1; y>-1; y--) {
        const tr = document.createElement('tr')

        for(let x=0; x<width; x++) {
            const td = document.createElement('td')
            // td.textContent = x+','+y

            for(let snake of current.board.snakes) {
                // for(let part of snake.body) {
                for(const [i, part] of snake.body.entries()) {
                    if(xyMatch(part, {x, y})) {
                        let opacity = 1
                        switch(i) {
                            case 0:
                                opacity = 1
                                break
                            case 1:
                                opacity = 0.8
                                break
                            case 2:
                                opacity = 0.6
                                break
                            case 3:
                                opacity = 0.4
                                break
                            default:
                                opacity = 0.2
                                break
                        }

                        td.style.backgroundColor = snake.customizations.color
                        td.style.opacity = opacity
                    }
                }
                if(xyMatch(snake.head, {x, y})) {
                    const headDiv = document.createElement('div')
                    headDiv.setAttribute('style', 'display: flex; justify-content: center; align-items:center; width: 100%; height: 100%;')

                    if(current.turn > 1) {
                        const lastTurn = history[history.length-2]
                        const n = snake.head
                        const l = lastTurn.board.snakes.find(s => s.id == snake.id).head
                        if(n.x < l.x) headDiv.textContent = '👈🏻'
                        if(n.x > l.x) headDiv.textContent = '👉🏻'
                        if(n.y < l.y) headDiv.textContent = '👇🏻'
                        if(n.y > l.y) headDiv.textContent = '👆🏻'
                    } else {
                        headDiv.textContent = '😄'
                    }

                    td.appendChild(headDiv)

                }


            }

            for(let food of current.board.food) {
                if(xyMatch(food, {x, y})) {
                    const foodDiv = document.createElement('div')
                    foodDiv.setAttribute('style', 'display: flex; justify-content: center; align-items:center; width: 100%; height: 100%;')
                    foodDiv.textContent = '🍲'
                    td.appendChild(foodDiv)
                }
            }

            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

}

function xyMatch(o1, o2) {
    return o1.x == o2.x && o1.y == o2.y
}
