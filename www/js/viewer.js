function init(){
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function deviceReady(){
	$("#loginForm").on("submit", function(e){
		$("#submitButton",this).attr("disabled","disabled");
		var u = $("#username",this).val();
		var p = $("#password",this).val();
		//document.write(u);
		//document.write(p);
		if(u!='' && p!=''){
			$.post("https://web.engr.illinois.edu/~mtmarsh2/login.php",{username:u,password:p},function(res){ 
				document.write(res);	
				if(res[1]==='t'){
					//$(":mobile-pagecontainer").pagecontainer("change","some.html",{transition:"slide"},false);
					$.get("https://web.engr.illinois.edu/~mtmarsh2/practice.php",function(data){
						document.write(data);
					});
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
	window.location="register.html";
}

//TODO: implement preAuth so user can remain logged in