
$(document).ready(function() {
    $("#toSignIn").click(function() {
        $("#signInMoment").show();
        $("#signUpMoment").hide();
      });
    
      $("#toSignUp").click(function() {
        $("#signUpMoment").show();
        $("#signInMoment").hide();
      });

      $("#signInButton").click(()=>{
        fetch('http://localhost:3000/login', {
            method: 'POST', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('userid').value,
                password:  document.getElementById('pw').value
            })
        }).
        then(res => {
            console.log(res);
            if(res.status == 200) {
                return res.json();
            }
            throw new Error('Invalid credentials');
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            window.location.href = './index.html';
        }).
        catch(e => {alert(e); console.log(e)});
    
      });
});