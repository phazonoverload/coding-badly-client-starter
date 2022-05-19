const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})
app.use(express.static('public'))
app.use(express.json())

app.get('/snake', (req, res) => {
    res.json({
        apiversion: "1",
        color: "#e9194a",
        head: "trans-rights-scarf",
        tail: "mystic-moon",
    })
})

let socket
io.on("connection", s => {
    socket = s
    console.log('connected')
})

app.post('/snake/move', (req, res) => {
    socket.emit('move', req.body)
    const move = snakeLogic(req.body)
    res.json({ move })
})

function snakeLogic(state) {
    let moves = ['left', 'right', 'up', 'down']
    const { you, board } = state
    const { snakes } = board

    // Avoid walls
    if(you.head.y == board.height-1) remove('up')
    if(you.head.x == board.width-1) remove('right')
    if(you.head.y == 0) remove('down')
    if(you.head.x == 0) remove('left')

    // Avoid snakes
    console.dir(snakes, { depth: null })
    for(let snake of snakes) {
        for(let part of snake.body) {
            if(you.head.x == part.x && you.head.y + 1 == part.y)  remove('up')
            if(you.head.x == part.x && you.head.y - 1 == part.y)  remove('down')
            if(you.head.y == part.y && you.head.x + 1 == part.x)  remove('right')
            if(you.head.y == part.y && you.head.x - 1 == part.x)  remove('left')
        }
    }

    function remove(direction) {
        if(direction) moves = moves.filter(move => move != direction)
    }

    return moves[Math.floor(Math.random() * moves.length)]
}

httpServer.listen(3000)
