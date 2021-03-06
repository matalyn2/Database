exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      //post data

   } else {
      res.render('signup');
   }
};


exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var uname= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, name, email FROM `users` WHERE `email`='"+uname+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }         
};

/*exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var uname= post.email;
      var pass= post.password;
      var name= post.name;

      var sql = "INSERT INTO `users`(`name`,`email`, `password`) VALUES ('" + name + "','" + uname + "','" + pass + "')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      res.render('signup');
   }
};*/

exports.dashboard = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
	 
	 var sql="SELECT name, email FROM `user` WHERE `id`='"+userId+"'";	 
	   db.query(sql, function(err, results){
		   
		   console.log(results);
		   
		   res.render('profile.ejs', {user:user});	  
		  
		});	 
};


exports.kittens = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	var message;

   if(req.method == "POST"){
      var post  = req.body;
      var kitten_name= post.kitten_name;
      if(!kitten_name)
      {
      	message = "Nothing was entered";

      } else {

	      var sql="DELETE FROM kitten WHERE id='"+kitten_name+"'";	 
		   	db.query(sql, function(err, results){
			   console.log(results.affectedRows);
			   if(err){
			   		message = "Row could not be deleted";
			   }	  		  
			});
		}

		var sql_select="SELECT * FROM `kitten`";
		console.log(message);	 
	   	db.query(sql_select, function(err, results){
		   res.render('kittens.ejs', {kittens:results, message:message});	  		  
		});
	   

  	} else{

		if(userId == null){
			res.redirect("/home/login");
			return;
		}
		 
		var sql="SELECT * FROM `kitten`";	 
	   	db.query(sql, function(err, results){
		   res.render('kittens.ejs', {kittens:results});	  
		  
		});
	}	 
};


exports.staff = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	var message;

	 if(req.method == "POST"){
	      var post  = req.body;
	      var staff_name= post.staff_name;

	      if(!staff_name){
	      	message = "Nothing was entered";
	      } else {

	      var sql="DELETE FROM staff WHERE id='"+staff_name+"'";	 
		   	db.query(sql, function(err, results){
			   console.log(results.affectedRows);	  		  
			});

		   }
			var sql_select="SELECT * FROM `staff`";	 
		   	db.query(sql_select, function(err, results){
			   res.render('staff.ejs', {staff:results, message:message});	  		  
			});

  	} else{
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
	 
	 var sql="SELECT * FROM `staff`";
	 
	   db.query(sql, function(err, results){
		   
		   res.render('staff.ejs', {staff:results});	  
		  
		});
	}	 
};

exports.owners = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	var message;

	if(req.method == "POST"){
      var post  = req.body;
      var owner_name= post.owner_name;
      if(!owner_name){
      	message = "Nothing was entered";
      } else {

      var sql="DELETE FROM owner WHERE id='"+owner_name+"'";	 
	   	db.query(sql, function(err, results){
		   console.log(results.affectedRows);	  		  
		});

	   }
		var sql_select="SELECT * FROM `owner`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('owners.ejs', {owner:results, message:message});	  		  
		});
  	} else{
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
	 
	 var sql="SELECT * FROM `owner`";
	 
	   db.query(sql, function(err, results){

		   res.render('owners.ejs', {owner:results});	  
		  
		});
	}	 
};


exports.newstaff = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	var message;

	if(req.method == "POST"){

      var post  = req.body;
      var name= post.staff_name;
      var email = post.staff_email;
      var phone = post.staff_phone;
      var address = post.staff_address;
      if(!name || !email || !phone || !address){
      	message = "Missing information on form";
      }
      else {
      var sql = "INSERT INTO staff(name, email, phone, address) VALUES ('" + name + "','" + email + "','" + phone + "','" + address +"')";
	   	db.query(sql, function(err, results){
		   console.log(results);	  		  
		});
	   }

		var sql_select="SELECT * FROM `owner`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('staff.ejs', {staff:results, message:message});	  		  
		});

  	} else {

		if(userId == null){
			res.redirect("/home/login");
			return;
		}
		 
		res.render('new_staff.ejs');	  
			  
			
	}	 
};

exports.newowner = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	var message;

	if(req.method == "POST"){
      var post  = req.body;
      var name= post.owner_name;
      var email = post.owner_email;
      var phone = post.owner_phone;
      var address = post.owner_address;
      if(!name || !email || !phone || !address){
      	message = "Missing information on form";
      } else {

      var sql = "INSERT INTO owner(name, email, phone, address) VALUES ('" + name + "','" + email + "','" + phone + "','" + address +"')";
	   	db.query(sql, function(err, results){
		   console.log(results);	  		  
		});
	   }
		var sql_select="SELECT * FROM `owner`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('owners.ejs', {owner:results, message: message});	  		  
		});

  	} else {

		if(userId == null){
			res.redirect("/home/login");
			return;
		}
		 
		res.render('new_owner.ejs');	  

			  
	}	 
};



exports.newkitten = function(req, res, next){
	var path = require('path');
	var fs = require('fs');
	var busboy = require('connect-busboy');
	var multiparty = require('multiparty');

	var user =  req.session.user,
	userId = req.session.userId;

	if(req.method == "POST"){
		var formData = new multiparty.Form();
		var name;
		var history;
		var age;
		var fertility;
		var adopted;
	    var photos = req.pipe(req.busboy);  
      	var fstream;
      	var message;
      
		formData.parse(req, function(err, fields, files) {
	    	 //here you can read the appropriate fields/files
	    	 var n = Object.keys(files).map(function(key) {
		    	return files[key];
			});
	    	 var x = n[0];
	    	 var y = x[0];
	    	 name = fields.kitten_name;
	    	 history = fields.kitten_history;
	    	 age = fields.kitten_age;
	    	 if(fields.kitten_fertility){ fertility = 1;} else{ fertility = 0;}
			 if(fields.kitten_adopted){ adopted = 1;} else{ adopted = 0;}
			var filename = y.originalFilename;
			console.log(filename);
			var targetPath = '/img/' + filename;
			var sql = "INSERT INTO kitten(name, history, age, fertility, adopted, photos) VALUES ('" + name + "','" + history + "'," + age + "," + fertility +"," + adopted + ",'" + targetPath + "')";
		   	db.query(sql, function(err, results){
			   console.log(results);
			   console.log(err);	  		  
			});
   		});

   		req.busboy.on('file', function (fieldname, file, filename) {
        	if(filename){
		        fstream = fs.createWriteStream('./public/img/' + filename);
		        file.pipe(fstream);
		        fstream.on('close', function () {
		            //res.redirect('back');
		        });
	    	}

    	});

   		console.log(message);
		var sql_select="SELECT * FROM `kitten`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('kittens.ejs', {kittens:results, message:message});	  		  
		});

  	} else {

		if(userId == null){
			res.redirect("/home/login");
			return;
		}
		 
		res.render('new_kitten.ejs');	  
			  
	}	 
};
