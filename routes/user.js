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

exports.signup = function(req, res){
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
};

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

   if(req.method == "POST"){
      var post  = req.body;
      var kitten_name= post.kitten_name;

      var sql="DELETE FROM kitten WHERE id='"+kitten_name+"'";	 
	   	db.query(sql, function(err, results){
		   console.log(results.affectedRows);	  		  
		});

		var sql_select="SELECT * FROM `kitten`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('kittens.ejs', {kittens:results});	  		  
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

	 if(req.method == "POST"){
	      var post  = req.body;
	      var staff_name= post.staff_name;

	      var sql="DELETE FROM staff WHERE id='"+staff_name+"'";	 
		   	db.query(sql, function(err, results){
			   console.log(results.affectedRows);	  		  
			});

			var sql_select="SELECT * FROM `staff`";	 
		   	db.query(sql_select, function(err, results){
			   res.render('staff.ejs', {staff:results});	  		  
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

	if(req.method == "POST"){
      var post  = req.body;
      var owner_name= post.owner_name;

      var sql="DELETE FROM owner WHERE id='"+owner_name+"'";	 
	   	db.query(sql, function(err, results){
		   console.log(results.affectedRows);	  		  
		});

		var sql_select="SELECT * FROM `owner`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('owners.ejs', {owner:results});	  		  
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

	if(req.method == "POST"){

      var post  = req.body;
      var name= post.staff_name;
      var email = post.staff_email;
      var phone = post.staff_phone;
      var address = post.staff_address;

      var sql = "INSERT INTO staff(name, email, phone, address) VALUES ('" + name + "','" + email + "','" + phone + "','" + address +"')";
	   	db.query(sql, function(err, results){
		   console.log(results);	  		  
		});

		var sql_select="SELECT * FROM `owner`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('staff.ejs', {staff:results});	  		  
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

	if(req.method == "POST"){
      var post  = req.body;
      var name= post.owner_name;
      var email = post.owner_email;
      var phone = post.owner_phone;
      var address = post.owner_address;

      var sql = "INSERT INTO owner(name, email, phone, address) VALUES ('" + name + "','" + email + "','" + phone + "','" + address +"')";
	   	db.query(sql, function(err, results){
		   console.log(results);	  		  
		});

		var sql_select="SELECT * FROM `owner`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('owners.ejs', {owner:results});	  		  
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
	
	var user =  req.session.user,
	userId = req.session.userId;

	if(req.method == "POST"){

      var post  = req.body;
      var name= post.kitten_name;
      var history = post.kitten_history;
      var age = post.kitten_age;
      if(post.kitten_fertility){ var fertility = 1;} else{ var fertility = 0;}
      if(post.kitten_adopted){ var adopted = 1;} else{ var adopted = 0;}
      var photos = post.kitten_photos;

      var sql = "INSERT INTO kitten(name, history, age, fertility, adopted, photos) VALUES ('" + name + "','" + history + "'," + age + "," + fertility +"," + adopted + ",'" + photos + "')";
	   	db.query(sql, function(err, results){
		   console.log(results);	  		  
		});

		var sql_select="SELECT * FROM `kitten`";	 
	   	db.query(sql_select, function(err, results){
		   res.render('kittens.ejs', {kittens:results});	  		  
		});

  	} else {

		if(userId == null){
			res.redirect("/home/login");
			return;
		}
		 
		res.render('new_kitten.ejs');	  
			  
	}	 
};