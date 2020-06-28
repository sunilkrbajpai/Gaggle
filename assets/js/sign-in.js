$(document).ready(function(){
    $("#submitbtn").click(function(){  
            var recaptcha=$("#g-recaptcha-response").val();

            //if recaptcha is not clicked
            if(recaptcha===""){
                    event.preventDefault();
                    alert("Please fill reCaptcha!");
            }
            else{
                $("#signInForm").submit();
            }
        });
});
