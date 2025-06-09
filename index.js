const express = require("express");
const app = express();
const port = 3000 ;
const path = require("path");
const {v4 : uuidv4} = require('uuid');
const methodOverride = require('method-override');

app.set("view engine","ejs");
app.set("views",path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.listen(port , ()=>{
    console.log("listning to ",port);
});

let posts = [
    {
        id : uuidv4() ,
        username : "ajit" ,
        content : "my first post"
    },
    {
        id : uuidv4() ,
        username : "raju",
        content : "babu bhaiya mai chor nahi hu babu bhaiya"
    },
    {
        id : uuidv4() ,
        username : "babu bhaiya",
        content : " mai to tereko chor samaaz raha tha tu to dev manus nikla"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("newPost.ejs");
});

app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username ,content} = req.body ;
    let id = uuidv4();
    posts.push({id, username , content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === req.params.id);
    console.log(post);
    res.render("show.ejs",{id , post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === req.params.id);
    
    let newContent = req.body.content;
    post.content = newContent ; 
    console.log(newContent);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === req.params.id);
    res.render("edit.ejs",{post, id});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params ;
    posts = posts.filter((p)=> p.id !== req.params.id);
    res.redirect("/posts");
})