const express=require('express');
const hbs =require('hbs');
const fs =require('fs');

var app=express();


hbs.registerPartials(__dirname +'/views/partial');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));


app.use((req,res,next)=>{
	var now =new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n',(err)=>{
		if(err){
			console.log('Unable to append to server.log');
	}
	next();
	});
	
});


app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});

app.get('/',(req,res)=>{
	//res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs',{
		pageTitle:'Home page',
		welcome:'welcome to my website',
		currentYear: new Date().getFullYear()
		/*name:'naman',
		likes:[
		    'badminton',
			'movies'
			]*/
	});
});

app.get('/about',(req,res)  => {
	res.render('about.hbs',{
		pageTitle:'About page',
	currentYear:new Date().getFullYear()
	});
});

app.listen(3000);