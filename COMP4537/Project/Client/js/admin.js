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
        // fetch('https://covid-flight-backend.herokuapp.com/v1/createFlightEntry', {
            method: 'POST', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                flight_id: document.getElementById('add_flight_id').value,
                flight_date: document.getElementById('add_flight_date').value,
                to_city: document.getElementById('add_to_city').value,
                from_city: document.getElementById('add_from_city').value,
                flight_company: document.getElementById('add_flight_company').value
            })
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Success");
                    return res.json();

                } else if (res.status == 401) {
                    throw new Error('Invalid Values');
                } else if (res.status == 402) {
                    throw new Error('Unauthorized User!');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                alert("Data Entry Success.");
            }).
        catch(e => {
            alert(e)
        });

    });

    $("#delete_flight_submit").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/deleteFlightEntry', {
            method: 'DELETE', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token

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
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                alert("Delete Success.");
            }).
        catch(e => {
            // alert(e)
        });
    });


    //edit flight
    $("#edit_flight_submit").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/updateFlightEntry', {
            method: 'PUT', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                flight_id: "'" + document.getElementById('edit_flight_id').value + "'",
                flight_date: document.getElementById('edit_flight_date').value,
                to_city: document.getElementById('edit_to_city').value,
                from_city: document.getElementById('edit_from_city').value,
                flight_company: document.getElementById('edit_flight_company').value
            })
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Success");
                    return res.json();

                } else if (res.status == 401) {
                    throw new Error('Invalid Values');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                alert("Update Success.");
            }).
        catch(e => {
            // alert(e)
        });
    });

    retreiveToDo = () =>{
        fetch('http://localhost:3000/getTodos', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Success");
                    return res.json();

                } else if (res.status == 401) {
                    throw new Error('Invalid Values');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                let result = "";
                for (i = 0; i< data[0].items.length; i++){
                    result += "<li>"+ data[0].items[i] + "</li> " 
                }
                document.getElementById("items").innerHTML = result;
            }).
        catch(e => {
           console.log(e);
        });
    }
    }
    //display all flights
    $("#displayAll").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/getFlights', {
            method: 'GET', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Success");
                    return res.json();

                } else if (res.status == 401) {
                    throw new Error('Invalid Values');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                let result = "";
                for (i = 0; i< data.length; i++){
                    let time = data[i].flight_date.split('T')[0];
                    console.log(time);
                    result += "<p>Flight: "+ data[i].flight_id + " Date: " 
                    + time + " From: " + data[i].from_city + " To: "+ data[i].to_city +"</p>"
                }
                console.log(result);
                document.getElementById("flightData").innerHTML = result;
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