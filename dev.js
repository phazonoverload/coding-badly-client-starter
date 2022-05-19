const nodemon = require('nodemon')
const ngrok = require('ngrok')
const livereload = require('livereload')

const port = process.env.PORT || 3000
const server = livereload.createServer()
server.watch(__dirname + "/public")

nodemon({
    script: 'index.js',
    ext: 'js'
})

let url = null

nodemon.on('start', async () => {
    if (!url) {
        url = await ngrok.connect({ port })
        console.log(`Server now available at ${url}`)
    }
}).on('restart', async () => {
    console.log(`Restarted at ${new Date().toISOString()}`)
})
