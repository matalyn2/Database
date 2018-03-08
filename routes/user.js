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
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
	 
	 var sql="SELECT * FROM `kitten`";
	 
	   db.query(sql, function(err, results){

		   res.render('kittens.ejs', {kittens:results});	  
		  
		});	 
};


exports.staff = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
	 
	 var sql="SELECT * FROM `staff`";
	 
	   db.query(sql, function(err, results){
		   
		   res.render('staff.ejs', {staff:results});	  
		  
		});	 
};

exports.owners = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
	 
	 var sql="SELECT * FROM `owner`";
	 
	   db.query(sql, function(err, results){

		   res.render('owners.ejs', {owner:results});	  
		  
		});	 
};