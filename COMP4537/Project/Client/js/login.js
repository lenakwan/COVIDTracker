
$(document).ready(function() {

    $("#signUpMoment").hide();

    $("#toSignIn").click(function() {
        $("#signInMoment").show();
        $("#signUpMoment").hide();
      });
    
      $("#toSignUp").click(function() {
        $("#signUpMoment").show();
        $("#signInMoment").hide();
      });
});