
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

//  mongoose module
var mongoose = require('mongoose'); 

var bodyParser = require('body-parser');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//database

var databasePath = "mongodb://localhost/blogApp";

db = mongoose.connect(databasePath);

mongoose.connection.once('open',function(){
	console.log("Success! Database is now connected!");
});

// model file
var sampleBlog = require('./blogModel.js');

var blogModel = mongoose.model('sampleBlog');

// Application Middleware to log user data
app.use(function(req,res,next){

	console.log("Logging started");
	console.log("User requested "+ req.originalUrl);
	console.log("User's IP adress: "+req.ip);
	console.log("Logging ended");
	next();
});

app.get('/',function (request,response){

	response.send("Hi, Welcome to My Blog Application! Use '/blog/create' to create a blog, '/blog/_Id' to find a blog, '/blogs' to see all blogs, '/blog/edit/_Id' to edit a blog, '/blog/delete/_Id' to delete a blog. Thank You!  ");

});

// GET request for all blogs

app.get('/blogs',function(req,res){

	blogModel.find(function(err,result){
		
		if(err){
			res.send(err);
		}
		else {
		res.send(result);
		}
	});
});
	//POST request to create a blog
app.post('/blog/create',function(req,res){

	var newBlog = new blogModel({

		title: req.body.title,
		subtitle: req.body.subtitle,
		blogBody : req.body.blogBody
	});

	newBlog.authorInfo = {authorName:req.body.name,authorEmail:req.body.email};

    newBlog.tags = (req.body.tags != undefined && req.body.tags != null) ? req.body.tags.split(',') : '';
    
    // save blog
	newBlog.save(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(newBlog);
		}
	});

});

	//GET request to find a particular blog

app.get('/blog/:Id',function (req,res){

	blogModel.findOne({
        '_id': req.params.Id
    }, function (err, result) {
        if (err) {
            console.log("Error");
            res.send(err);
        } else {
            res.send(result);
        }
	});

});

	
//PUT request to Edit a blog

app.put('/blog/edit/:Id',function(req,res){

	var update = req.body ;

	//Find one blog and update it.

	blogModel.findOneAndUpdate({"_id": req.params.Id},update,function(err,result){

        if(err){
			res.send(err);
			}
			else{
			console.log(result);
			res.send(result);
			}
		
	});  // findOneAndUpdate ends

}); //PUT request ends


	// POST request to Delete a blog

app.post('/blog/delete/:Id',function(req,res){

	

	blogModel.remove({_id: req.params.Id},function(err,result){

		
		if(err){
			res.send(err);
		}
		else{
			res.json({Info:"Blog Deleted! "});
		}

	});  //  remove blog ends

}); //POST request  ends


app.get('*',function(request,response,next){
		
	response.status = 404 ;
	next("Error Occured");
});


//Error handling Middleware

app.use(function(err,req,res,next){
	console.log("Error handler used");
	if(res.status == 404){
		res.send("Make sure you entered a correct path !! -_- ");
	}
	else{
		res.send(err);
	}
});  



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});