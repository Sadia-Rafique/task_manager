const express=require("express");
const app=express();
const port = process.env.PORT || 3000;
const path=require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

// dumy data
let tasks=[]
app.get("/",(req,res)=>{
    res.redirect("task");
})
// get data
app.get("/task",(req,res)=>{
  res.render("index",{tasks});
})
//  for new post:
app.get("/task/new",(req,res)=>{
    res.render("new")
})

app.post("/task", (req, res) => {
    let {description,date,status } = req.body;
    tasks.push({
        id: uuidv4(),
        description,
        date,
        status
    });

    res.redirect("/task");
});
// for edit task:
app.get("/task/:id/edit",(req,res)=>{
    let {id}=req.params;
    let taskid=tasks.find((t)=> t.id== id)
    res.render("edit",{taskid})
});
// for update :
app.patch("/task/:id", (req, res) => {
    let { id } = req.params;
    let { description, date, status } = req.body
    let taskid = tasks.find((t) => t.id == id);
    taskid.description = description;
    taskid.date=date;
    taskid.status=status;
    res.redirect("/task");
});
// for delete
app.delete("/task/:id",(req,res)=>{
    let { id } = req.params;
    tasks= tasks.filter((t) => id != t.id);
    res.redirect("/task");
   

});
app.listen(port,()=>{
    console.log(`listen to the port :${port}`)
})