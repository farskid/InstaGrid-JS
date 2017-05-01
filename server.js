const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/test/index.html')
})

app.use(express.static(__dirname))

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
