//module.exports=getdate; 
// module.exports.getdate=getdate;


//module.expoerts.getdate=function () {
    
//can use any

exports.getdate=function(){

    var today =new Date();

    var options={weekday:"long",
    day:"numeric",
    month: "long",
    year:"numeric"
    // hour:"numeric",
    // minute:"numeric",
    // second:"numeric"
};
    
    var day=today.toLocaleDateString("en-US",options);
    
return day;
}

