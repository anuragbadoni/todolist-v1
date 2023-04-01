const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");
const date = require(__dirname + "/date.js");
///////

const mongoose = require("mongoose");// mongo
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://anuragbadoni123:wuxnXl2Y1UAlHO9f@cluster0.hia6h5n.mongodb.net/?retryWrites=true&w=majority");

const listschema = new mongoose.Schema({//mongo
    task: String
});

const itemdb = mongoose.model("itemdb", listschema);

const item1 = new itemdb({
    task: "wake up "
});

const item2 = new itemdb({
    task: "brush "
});

const item3 = new itemdb({
    task: "bathing"
});

const defaultItems = [item1, item2, item3];





////////////////////////



// var items=["a"];
// var workItems=[];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));//for css





















app.get("/", function (req, res) {
    // var today =new Date();

    // var options={weekday:"long",
    // day:"numeric",
    // month: "long",
    // year:"numeric",
    // hour:"numeric",
    // minute:"numeric",
    // second:"numeric"};

    // var day=today.toLocaleDateString("en-US",options);


    var day = date.getdate();


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



    itemdb.find({}, function (err, x) {
        if (err)
            console.log(err);
        else {

            if (x.length == 0) {
                itemdb.insertMany(defaultItems, function (err) {
                    if (err)
                        console.log(err);
                    else
                        console.log("updated default items");
                });
                res.redirect("/");
            }
            res.render("list", { kindOfDay: day, itemos: x });
            // items=[];
            // x.forEach(function(y){
            // items.push(y.task);
            // angela ne direct res.render("list",{kindOfDay: day,itemos:y}) kiya or ejs me itemos[i].task kar diya which is a good practice acc to me
            // });

            // res.render("list",{kindOfDay: day,itemos:items});
        }
    });









});


app.post("/", function (req, res) {


    console.log(req.body);
    // res.render("list",{kindOfDay:new Date(),itemos:item});

    var day = date.getdate();
    if (req.body.button === day) {
        var item = req.body.newitem;

    const newitem = new itemdb({
        task: item
    });
    newitem.save();
        res.redirect("/");
    }
    
    else {
        var people=[];
var item=req.body.newitem;
const newitem = new itemdb({
    task: item
});

itemnewdb.find({name:req.body.button},function(err,x){
    if(err)
    console.log(err);
    else
    {
        
 people=x[0].newtask;
 
people.push(newitem);
itemnewdb.updateMany({name:req.body.button},{newtask:people},function(err){
    if(err)
    console.log(err);
    else
    {
    console.log("value updated succesfully");

    res.redirect("/"+req.body.button);
    }
});
    }

});




        }
    });
     
 




const otherschema = new mongoose.Schema({
    name: String,
    newtask: [listschema]
});








const itemnewdb = mongoose.model("itemnewdb", otherschema);

// const first = new itemnewdb({
//     name: "sample",
//     newtask: defaultItems
// });
// first.save();
// console.log("done");



app.get("/:others", function (req, res) {

    itemnewdb.find({ name: req.params.others }, function (err, x) {
        if (err) { console.log(err); }
        else {
            if (x.length==0) {
                const naya = new itemnewdb({
                    name: req.params.others,
                    newtask: defaultItems
                });
                naya.save();
const url="/"+req.params.others;
console.log(url);
              res.redirect(url);
            }
            else
            {
            
 console.log(x[0].name);

              res.render("list",{kindOfDay: req.params.others,itemos:x[0].newtask});
            }
        }
    });
});

//}

















app.post("/minus", function (req, res) {
    console.log(req.body);
    var del = req.body.button;
    console.log(del);

    var day = date.getdate();
    if (req.body.kind === day) {





    itemdb.deleteOne({ task: del }, function (err) {
        if (err)
            console.log(err);
        else {
            console.log("deleted succesfully");
            res.redirect("/");
        
        }
    
    });
}
else //angela used this simple : newitemdb.findOneAndUpdate({name: req.body.kind},{$pull : {newtask: req.body.button} }, function(err,x){if(!err)res.redirect...})
{
itemnewdb.find({name:req.body.kind},function(err,x){
    if(err)
    console.log(err);
    else //angela used this simple : newitemdb.findOneAndUpdate({name: req.body.kind},{$pull : {newtask: req.body.button} }, function(err,x){if(!err)res.redirect...})
    {
      
        const m=x[0].newtask;
        console.log(m.length);
        for(var j=0;j<m.length;j++)
        {
            if(m[j].task===req.body.button)
m.pop();
        }
 /*    m.foreach(function(y){
  if(y.task===req.body.button)
 y.pop();
      }); */
x[0].save();
res.redirect("/"+req.body.kind);
    }
});

}
});



    //angela ne findIdAndRemove use kiya 
// });



// app.post("/work",function(req,res){
//     var item=req.body.newitem;
//     workItems.push(item);
// res.redirect("/work");
// });

const port =process.env.PORT || 3000;

app.listen(port, function () {
    console.log("server running ....on " + port);
});
