const express=require('express');
const request=require('request');
const path=require('path');
const bodyParser=require('body-parser');



const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views",path.join(__dirname,"views"));
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index.ejs', {weather: null, error: null});
})

app.post('/',(req,res)=>{
    //res.render("index.ejs");
    console.log(req.body.city);
    const apikey="a079665bc4fe7f96ff12c0fcc2495350";
    const city=req.body.city;
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    request(url,(err,response,body)=>{
        if(err){
            console.log(err);
            res.render(index,{weather:null,error:"Error! Pls try again"});
        }
        else{
            const weather=JSON.parse(body);
            if(weather.main==undefined)
                res.render("index",{weather:null,error:"Error! Pls try again"});
                else{
                    const weather=JSON.parse(body);
                    const weatherText=`It's ${weather.main.temp} degrees at ${weather.name}`;
                    res.render("index",{weather:weatherText, error:null});
                }
        }
        
    });

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })