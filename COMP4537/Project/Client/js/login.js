
$(document).ready(function() {
    $("#toSignIn").click(function() {
        $("#signInMoment").show();
        $("#signUpMoment").hide();
      });
    
      $("#toSignUp").click(function() {
        $("#signUpMoment").show();
        $("#signInMoment").hide();
      });

      $('#toMain').click(()=>{
        window.location.href = './index.html';
    });


      $("#signInButton").click((e)=>{
        e.preventDefault();
        fetch('https://covid-flight-backend.herokuapp.com/v1/login',{
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
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('covid', data.covid);
            localStorage.setItem('flight_id', data.flight_id);
            localStorage.setItem('flight_date', data.flight_date);
            localStorage.setItem('admin', data.admin);
            if (data.admin) {
                window.location.href = './admin.html';
            }
            else{            
                window.location.href = './tracking.html';
            }
        }).
        catch(e => alert(e));
      });


      $("#signUpButton").click((e)=>{
        e.preventDefault();
        if (!$('#rusername').val()){
            alert("You have to enter User Name");   
        }
        else if (!$('#rpw').val() || !$('#cfpw').val()){
            alert("You have to enter Password");   
        }
        else if ($('#rpw').val() != $('#cfpw').val()){
            alert("Password must match!");   
        }
      });

    $('#realSignUp').click(()=> {
        fetch('https://covid-flight-backend.herokuapp.com/v1/register', {
            method: 'POST', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: $('#rusername').val(),
                password: $('#rpw').val(),
                flight_id: $('#flight_id').val(),
                flight_date: $('#flight_date').val()
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
            localStorage.setItem('token', data.token);
            alert ()
            if (data.admin) {
                window.location.href = './admin.html';
            }
            window.location.href = './tracking.html';
        }).
        catch(e => {
            // alert(e)
        });    

    })
   
});