var options = [];

function init(){
    document.addEventListener("deviceready",createpoll,true);
    delete init;
}

function createpoll(){
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
        var question = $("#question").val();
        //document.write(question);
        //document.write(options.length);
        //document.write(options);
        if(question != "" && options.length != 0){
            $.post("https://web.engr.illinois.edu/~opinio2014/addpoll.php",{question:question, num_options:options.length, options:options},function(res){
                document.write(res);
            });
            //document.write("post made");
        }
        else{
            navigator.notification.alert("field empty",function(){});
        }
    })
}