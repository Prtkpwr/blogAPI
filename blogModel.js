
// Defining a mongoose schema

// including mongoose
var mongoose = require('mongoose');

// declaring a schema (or) database structure

var Schema = mongoose.Schema;  

// blogSchema is an instance of Schema

var blogSchema = new Schema ({

	
	title    	 :   {type:String,default:'',required:true},
	subtitle 	 :   {type:String,default:''},
	blogBody 	 :   {type:String,default:'',required:true},
	authorInfo	 :   {},
	tags         : []

	
},{timestamps:true});      //for createdAt and updatedAt

// connect model and schema
mongoose.model('sampleBlog',blogSchema);

