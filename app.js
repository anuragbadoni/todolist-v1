const express=require ("express");
const bodyParser=require("body-parser");
let ejs =require("ejs");
const date =require(__dirname + "/date.js");
///////

const mongoose =require("mongoose");// mongo
mongoose.connect("mongodb://localhost:27017/todolistDB");

const listschema=new mongoose.Schema({//mongo
    task : String
});

const itemdb=mongoose.model("itemdb",listschema);

const item1= new itemdb({
    task: "wake up "
});

const item2= new itemdb({
    task: "brush "
});

const item3= new itemdb({
    task: "bathing"
});

const defaultItems=[item1,item2,item3];





////////////////////////



var items=["a"];
var workItems=[];

const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));//for css





















app.get("/",function(req,res)
{
// var today =new Date();

// var options={weekday:"long",
// day:"numeric",
// month: "long",
// year:"numeric",
// hour:"numeric",
// minute:"numeric",
// second:"numeric"};

// var day=today.toLocaleDateString("en-US",options);


var day=date.getdate();


// var currentday =today.getDay();
// var day ="";
// console.log(currentday);
// switch (currentday) {
//     case 0:
//         day="sunday";
//         break;
//         case 1:
//             day="monday";
//             break;
//             case 2:
//                 day="tuesday";
//                 break;
//                 case 3:
//                     day="wednesday";
//                     break;
//                     case 4:
//                         day="thrusday";
//                         break;
//                         case 5:
//                             day="friday";
//                             break;
//                             case 6:
//                                 day="satday";
//                                 break;
                                                                                    
//     default:
//         console.log("error");
//         break;
// }



itemdb.find({},function(err,x){
    if(err)
    console.log(err);
    else
    {

if(x.length==0)
{
    itemdb.insertMany(defaultItems,function(err){
        if(err)
        console.log(err);
        else
        console.log("updated default items");
    });
    res.redirect("/");
}
        
        items=[];
x.forEach(function(y){
items.push(y.task);
// angela ne direct res.render("list",{kindOfDay: day,itemos:y}) kiya or ejs me itemos[i].task kar diya which is a good practice acc to me
});
    
        res.render("list",{kindOfDay: day,itemos:items});
    }
});









});

app.post("/",function(req,res)
{
   
    var item=req.body.newitem;

const newitem= new itemdb({
task: item
});
newitem.save();

console.log(req.body);
// res.render("list",{kindOfDay:new Date(),itemos:item});

if(req.body.button==="work")
{
workItems.push(item);
res.redirect("/work");
}
else
{
// items.push(item);

res.redirect("/");}
});

app.get("/work",function(req,res){
res.render("list",{kindOfDay:"work", itemos:workItems});

});



app.post("/minus", function(req,res){
    var del=req.body.button;
console.log(del);
itemdb.deleteOne({task:del},function(err){
    if(err)
    console.log(err);
    else
    {
    console.log("deleted succesfully");
    console.log(del);
res.redirect("/");    
}
})
//angela ne findIdAndRemove use kiya 
});



// app.post("/work",function(req,res){
//     var item=req.body.newitem;
//     workItems.push(item);
// res.redirect("/work");
// });



app.listen(3000,function(){
    console.log("server running ....");
})