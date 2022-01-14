const express =require('express')
const res = require('express/lib/response')
const path=require('path')
let app=express()
app.set('view engine', 'ejs')

let users=[{name:"vivek kumar",email:"ervivekkumar677@gmail.com"},{name:"vivek kumar",email:"ervivekkumar677@gmail.com"}
,{name:"vivek kumar",email:"ervivekkumar677@gmail.com"},{name:"vivek kumar",email:"ervivekkumar677@gmail.com"}]

// app.get("/",(req,res)=>{
//     res.send("rajan is good boy")
// })
app.use(express.urlencoded({
    extended: true
})) 
app.use(express.static(__dirname + '/public'));


app.get("/",(req,res)=>{
    res.render('homepage.ejs',{user:users})
})
app.post('/user/add',(req,res)=>{

    const obj={
        name: req.body.name,
        email: req.body.email
    }
    users.push(obj)
    res.render('homepage.ejs', { user: users });
} );
app.get("/form",(req,res)=>{

    res.render('form.ejs')
}).listen(3000);