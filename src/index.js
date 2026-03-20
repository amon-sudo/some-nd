import express from "express"


const app = express()
const PORT = process.env.PORT || 3000
const e = [
        {id:1, username:"amon", age: 12},
        {id:2, username:"julius", age: 13},
        {id:3, username:"caeser", age: 14},
        {id:4, username:"cicero", age: 15}
    ]

console.log(e)
app.get("/", (req, res) => {
    res.status(201).send("hi")
})



app.get("/api/users", (req, res) => {
    console.log(req.query)
})
app.get("/api/users/:id", (req, res) => {
    //console.log(req.params)
    //res.send(e)
    const parse = parseInt(req.params.id)
    //console.log(parse)
    if(isNaN(parse))
         return res.sendStatus(400)

    const finduser = e.find((u) =>u.id === parse)
    if (!finduser) return res.sendStatus(404)
    return res.send(finduser)
})
app.get("/api/products", (req, res) => {
    res.send([
        {id:12, name:"asa", price:12},
        {id:12, name:"as", price:2},
        {id:12, name:"sa", price:1},
        {id:12, name:"a", price:121},
    ])
})



app.listen(PORT, () =>{
    console.log(`Server running Port ${PORT}`)
})