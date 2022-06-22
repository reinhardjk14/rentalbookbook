const express = require('express');
const app = express();
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => [
  res.send('Hello World')
])

app.listen(port, () => {
  console.log('Successfully connected to port ' + port)
})