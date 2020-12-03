$(document).ready(function() {


    
    document.getElementById('submit').addEventListener('click', e => {

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


});