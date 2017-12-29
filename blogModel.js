
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
	authorInfo	 :   {
						name:{type:String,default:''},
						age:{type:Number},
						email:{type:String}
					 }

	
},{timestamps:true});      //Schema with timestamps(createdAt and updatedAt) option set to true

// connect model and schema
mongoose.model('sampleBlog',blogSchema);

