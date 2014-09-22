function init(){
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function deviceReady(){
	$("#loginForm").on("submit", function(e){
		console.log("HELLLOOOOO");
		$("#submitButton",this).attr("disabled","disabled");
		var u = $("#username",this).val();
		var p = $("#password",this).val();
		var regID=(localStorage.getItem("registrationID"));

		//document.write(u);
		//document.write(p);
		if(u!='' && p!=''){
			$.post("https://web.engr.illinois.edu/~opinio2014/login.php",{username:u,password:p, push_address:regID},function(res){ 
				//document.write(res);	
				if(res[1]==='t'){
					//$(":mobile-pagecontainer").pagecontainer("change","some.html",{transition:"slide"},false);
					$.get("https://web.engr.illinois.edu/~opinio2014/login.php",function(data){
						//document.write(data);
					});
						//console.log("wrote data:");

				//	console.log("bout to store username");
					var keyinput = "user";
					var valoutput = u;
					if(typeof(window.localStorage) != 'undefined'){ 
						window.localStorage.setItem(keyinput,valoutput); 
						//console.log("stored username");

					} 
					else{ 
						console.log("store FAILED");
						throw "window.localStorage, not defined"; 
					}
					//console.log("tryna segue");
					window.location = "feed.html";
				}

				else{
					navigator.notification.alert("Your login failed",function(){});
				}
				$("#submitButton").removeAttr("disabled");
			});
		}
		return false;
	});
}

function register(){
	window.location="contacts.html";
}

//TODO: implement preAuth so user can remain logged in