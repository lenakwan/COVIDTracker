const token = localStorage.getItem("token");
if (token == 'null') {
    window.location.href = './login.html';
}
const user = JSON.parse(atob(token.split('.')[1]));

$(document).ready(function () {
    // if token
    console.log(user);
    $("#loginUserName").html(user.user_name);

    //add flight
    $("#add_flight_submit").click(() => {
            fetch('https://covid-flight-backend.herokuapp.com/v1/createFlightEntry', {
                method: 'POST', // likewise we have DELETE, PUT, PATCH
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    flight_id: document.getElementById('flight_id').value,
                    flight_date: document.getElementById('flight_date').value,
                    to_city: document.getElementById('to_city').value,
                    from_city: document.getElementById('from_city').value,
                    flight_company: document.getElementById('flight_company').value
                })
            }).
            then(res => {
                    console.log(res.json);
                    if (res.status == 200) {
                        console.log("Success");
                        return res.json();
                        
                    } else if (res.status == 401) {
                        throw new Error('Invalid Values');
                    }else{
                        console.log(res.json);
                    }
                })
                .then(data => {
                    alert("Data Entry Success");
                }).
            catch(e => {
                // alert(e)
            });
        
    });

    //delete flight
    $("#delete_flight_submit").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/deleteFlightEntry', {
            method: 'DELETE', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                flight_id: document.getElementById('flight_id').value,
                flight_date: document.getElementById('flight_date').value
            })
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Success");
                    return res.json();
                    
                } else if (res.status == 401) {
                    throw new Error('Invalid Values');
                }else{
                    console.log(res.json);
                }
            })
            .then(data => {
                alert("Delete Success");
            }).
        catch(e => {
            // alert(e)
        });
    
});
    $('#signout').click(() => {
        localStorage.setItem('token', null);
        window.location.href = './login.html';
    });

    
});