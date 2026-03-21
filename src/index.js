import express from "express"


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
const e = [
        {id:1, username:"amon", age: 12},
        {id:2, username:"julius", age: 13},
        {id:3, username:"caeser", age: 14},
        {id:5, username:"cicero", age: 15},
        {id:6, username:"cicero", age: 16},
        {id:7, username:"cicero", age: 17},
        {id:8, username:"cicero", age: 18},
        {id:9, username:"cicero", age: 19}
    ]

console.log(e)
app.get("/", (req, res) => {
    res.status(201).send("hi")
})



app.get("/api/users", (req, res) => {
    console.log(req.query)
    const{query:{filter, value}} = req
 // when filtres and values are undefined
    if (filter && value) 
        return res.send(
      e.filter((i) =>  i[filter].includes(value) ))
    return res.send(e)
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
app.post("/api/users/", (req, res) => {
    console.log(req.body)
    const {body} = req
    const newUser = {id:e[e.length -1].id +1, ...body}
    e.push(newUser)
    return res.status(201).send("ok")

})

app.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req
    const p = Number(id)

    if (isNaN(p)) return res.sendStatus(400)

    const user = e.find((k) => k.id === p)

    if (!user) return res.sendStatus(404)

    user.username = body.username
    user.age = body.age

    return res.status(200).json(user)
})



app.patch("/api/users/:id", (req, res) =>{
    const {body, params:{id}} = req

    const p = Number(id)
    if(isNaN(p)) return res.sendStatus(400)
    const the = e.find((ke) => ke.id === p)
    if (!the) return res.sendStatus(404)
   
    if(body.username !==undefined) the.username = body.username
    if (body.age !==undefined ) the.age = body.age
    return res.status(200).json(the)
})


app.delete("/api/users/:id", (req, res) =>{
    const { params:{id}} = req

    const jj = parseInt(id)
    if(isNaN(jj)) return res.sendStatus(400)
    const tt = e.findIndex((ee) => ee.id === jj)
    if(!tt) return res.sendStatus(404)
    
    e.splice(tt, 1)
    return res.sendStatus(204).send("removed")
})












app.listen(PORT, () =>{
    console.log(`Server running Port ${PORT}`)
})