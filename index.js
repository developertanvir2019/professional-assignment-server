const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user.routes');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


app.use('/user', userRouter)

app.all('*', (req, res) => {
    res.send('NO DATA Found, you are trying a wrong url')
})

app.listen(port, () => console.log(`professional server in running on ${port}`))