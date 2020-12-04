const token = localStorage.getItem("token");
if(token == 'null'){
    window.location.href = './login.html';
}
const user= JSON.parse(atob(token.split('.')[1]));

$(document).ready(function() {
    // if token
    console.log(user);
    $("#loginUserName").html(user.user_name);
    $("#search").click(()=> {

        fetch('https://covid-flight-backend.herokuapp.com/v1/getFlights', {
            method: 'GET', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // username: document.getElementById('username').value,
                // password:  document.getElementById('password').value
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
            window.location.href = './contacts.html';
        }).
        catch(e => alert(e));

    })

    $('#signout').click(()=>{
        localStorage.setItem('token', null);
        window.location.href = './login.html';
    });


});