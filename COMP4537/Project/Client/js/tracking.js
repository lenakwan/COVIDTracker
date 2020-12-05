const token = localStorage.getItem("token");
if (token == 'null') {
    window.location.href = './login.html';
}
const user = JSON.parse(atob(token.split('.')[1]));

$(document).ready(function () {
    // if token
    console.log(user);
    $("#loginUserName").html(user.user_name);

      //display all flights
      $("#displayAll").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/getFlights', {
            method: 'GET', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

    $('#login').click(()=>{
        window.location.href = './login.html';
    })

    $('#signout').click(() => {
        localStorage.setItem('token', null);
        window.location.href = './login.html';
    });


        $('#search_flight_submit').click(()=> {

            if (!$('#flight_id').val()){
                alert("You have to enter flight number");   
            }
            else if (!$('#flight_date').val()){
                alert("You have to enter flight date");   
            }
            else {
                fetch("https://covid-flight-backend.herokuapp.com/v1/getSingleFlight/'" + $('#flight_id').val() + "'/'" + $('#flight_date').val() + "'", {
                    method: 'GET', // likewise we have DELETE, PUT, PATCH
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).
                then(res => {
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
                    if(data){
                        let txt = "<b>Here's brief information about " + $('#flight_id').val() + " on " + $('#flight_date').val() + '</b>';
                        txt += "<br/><br/>Flight Company: " + data.flight_company;
                        txt += "<br/>Departure: " + data.from_city;
                        txt += "<br/>Arrival: " + data.to_city;
                        $('#result').html(txt);
                    }
                    else {
                        $('#result').html('<b>Unable to find the flight information.</b>');
                    }
                })
                .catch(e => {
                    // alert(e)
                });
            }
        })

});