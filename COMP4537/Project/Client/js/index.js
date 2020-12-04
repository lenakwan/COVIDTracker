
$(document).ready(function() {
    let token = localStorage.getItem("token");
    let user;
    try {
        user= JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        // window.location.href = './login.html';
    }
    console.log(user);
    console.log("hing");
    $("#loginUserName").html(user.user_name);
    $("#search").click(()=> {

        fetch('http://localhost:3000/getFlight', {
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
            // console.log(data)
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