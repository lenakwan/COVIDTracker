
$(document).ready(function() {
    $("#toSignIn").click(function() {
        $("#signInMoment").show();
        $("#signUpMoment").hide();
      });
    
      $("#toSignUp").click(function() {
        $("#signUpMoment").show();
        $("#signInMoment").hide();
      });

      $("#signInButton").click((e)=>{
        e.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password:  document.getElementById('pw').value
            })
        }).
        then(res => {
            if(res.status == 200) {
                return res.json();
            }
            throw new Error('Invalid credentials');
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            if (data.admin) {
                window.location.href = './admin.html';
            }
            window.location.href = './index.html';
        }).
        catch(e => alert(e));
      });


      $("#signUpButton").click((e)=>{
        e.preventDefault();
        if (document.getElementById('rpw').value != document.getElementById('cfpw').value){
            alert("Password must match!");
            
        }
        else {
            fetch('http://localhost:3000/register', {
                method: 'POST', // likewise we have DELETE, PUT, PATCH
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: document.getElementById('rusername').value,
                    password: document.getElementById('rpw').value
                })
            }).
            then(res => {
                console.log(res);
                if(res.status == 200) {
                    return res.json();
                }
                else if (res.status == 401) {
                    throw new Error('Username already exists!');
                }
            })
            .then(data => {
                console.log("??")
                localStorage.setItem('token', data.token);
                window.location.href = './index.html';
            }).
            catch(e => alert(e));    
        }
      });
});