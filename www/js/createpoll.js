var options = [];

function init(){
    document.addEventListener("deviceready",createpoll,true);
    delete init;
}

function createpoll(){
           window.alert("in create poll funciton");     

    $("#add-option-button").on("tap",function(e){
        var option_text = $("#add-option-text").val();
        options.push(option_text);
        if(option_text !== ''){
            $("#options-list").append('<li><a>'+ option_text +'</a><a class="deleteMe"></a></li>').listview("refresh");
            $("#add-option-text").val("");
        }
        else{
            navigator.notification.alert("Nothing to add!",function(){});
        }
        //document.write(option_text);
        $("#createPoll").trigger("create");
    });

    $("#add-image").on("tap",function(e){
        window.location="testphoto.html";
    });

    $(document).on("tap","#create-poll-button",function(e){
       // window.alert("tapped create poll");
        var isInsta= $("#INSTABOX").is(":checked");
        window.alert("is insta: "+isInsta);
        var question = $("#question").val();
        //document.write(question);
        //document.write(options.length);
        //document.write(options);
        if(question != "" && options.length != 0){
           // window.alert ("insta: (user END) "+isInsta);
            $.post("https://web.engr.illinois.edu/~opinio2014/addpoll.php",{question:question, num_options:options.length,
             options:options, insta:isInsta},function(res){
                    window.alert("Results on user-end: "+res);
                    var registrationIds; 
                    registrationIds=jQuery.parseJSON(res);
                    window.alert(registrationIds[0]);


                    window.alert("might be an error on next line");
                    var gcm = require('node-gcm');
                    window.alert("gcm is: "+gcm);
                    var message = new gcm.Message();
                     
                    //API Server Key
                    var sender = new gcm.Sender('AIzaSyAyE15f7AvLniA6Y0xD4Ap9wc2BRg360L8');
                     
                    // Value the payload data to send...
                    message.addData('message',"BEN CHANSKY!");
                    message.addData('title','Push Notification Sample' );
                    message.addData('msgcnt','3'); // Shows up in the notification in the status bar
                    message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
                    //message.collapseKey = 'demo';
                    //message.delayWhileIdle = true; //Default is false
                    message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

                    /**
                     * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
                     */
                    sender.send(message, registrationIds, 4, function (result) {
                        console.log(result);
                    });

                });
            //document.write("post made");
        }
        else{
            navigator.notification.alert("field empty",function(){});
        }
    })
}