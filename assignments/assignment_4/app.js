const { range } = require('express/lib/request');
const mongoose=require('mongoose')
const express =require('express')
const res = require('express/lib/response')
const path=require('path');

let app=express()

app.set('view engine', 'ejs')
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.use(express.urlencoded({
    extended: true
})) 

mongoose.connect("mongodb://localhost:27017/users")
.then(()=>console.log("connection created"))
.catch((err)=>{
    console.log(err)
});

app.use(express.static(__dirname + '/public'));


const mySchema3=new mongoose.Schema({
    name:{
        type:"string",
        required: true,

    },
    email:{
        type:"string",
        required: true,


    },
    isPromoted:{
        type:"string",
        default:null
    }
})

const myCollection=new mongoose.model("User",mySchema3);
const getDocsOfUser = async () => {
    try {
        const Docs = await myCollection.find();
        return Docs
    } catch (err) {
        console.log(err);
    };
}

app.get('/', (req, res) => {
    getDocsOfUser().then((data) => {
        console.log(data)
        res.render('home.ejs', { data: data });
    })
})
const insertDocToUser = async (doc) => {
    try {
        const Docs = new myCollection(doc);
        const res = await Docs.save()

    } catch (err) {
        console.log(err);
    };
}
app.post('/users/add',(req,res)=>{

    const obj={
        name: req.body.name,
        email: req.body.email,
        isPromoted:req.body.isPromoted
    }
    console.log(obj)

    insertDocToUser(obj)
    getDocsOfUser().then((data) => {
        res.redirect("/")
    })
} );
const updateDocofUser = async (_id) => {
    try {
       myCollection.findOne({ _id: _id }, { isPromoted: 1 }).then((data)=>{
            prevVal=data.isPromoted
            if(prevVal=="true"){
                prevVal="false"
            }
            else{
                prevVal="true"
            }
            myCollection.findByIdAndUpdate(_id,{isPromoted:prevVal},{new:true}).then(res=>{
                console.log(res);
            });

       });


    } catch (err) { console.log(err) }
}


app.put("/users/:_id",(req,res)=>{
    updateDocofUser(req.params._id);
    getDocsOfUser().then((data) => {
        res.redirect('/');
    })
});


const deleteDocofUser= async (_id) =>{
    myCollection.findByIdAndDelete(_id).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err);
    })
};
app.delete("/users/:_id",(req, res)=>{
    deleteDocofUser(req.params._id).then((data) => {
        res.redirect('/');
    })
})


app.get('/form',(req,res)=>{

    res.render('form.ejs')
})
app.get('/', (req, res) => {
    getDocsOfUser().then((data) => {
        res.render('views/homepage.ejs', { data: data });
    })
})


app.listen(3000, () => {
    console.log("Port 3000 is listening");
}) 