const token = localStorage.getItem("token");
if (token == 'null') {
    window.location.href = './login.html';
}
const user = JSON.parse(atob(token.split('.')[1]));
const login_user_id = localStorage.getItem("user_id");
const login_user_status = localStorage.getItem("covid");
const login_flight_number = localStorage.getItem("flight_id");
const login_flight_date = localStorage.getItem("flight_date");


$(document).ready(function () {
    // if token
    console.log(user);
    $("#loginUserName").html(user.user_name);
    $("#trackingFlightStatus").html("None");
    $("#trackingFlightNumber").html(login_flight_number);
    $("#trackingFlightStatus").css( {"color": "green"});
    
  
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
                for (i = 0; i < data.length; i++) {
                    let time = data[i].flight_date.split('T')[0];
                    console.log(time);
                    result += "<p>Flight: " + data[i].flight_id + " Date: " +
                        time + " From: " + data[i].from_city + " To: " + data[i].to_city + "</p>";
                }
                console.log(result);
                document.getElementById("flightData").innerHTML = result;
            }).
        catch(e => {
            // alert(e)
        });
    });

    $("#allLocations").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/getAllLocations', {
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
                let all_location_results = "";
                for (i = 0; i < data.length; i++) {
                    let time = data[i].date.split('T')[0];
                    console.log(time);
                    all_location_results += "<p>Location: " + data[i].location_name + " Date: " +
                        time + " Covid-19: " + data[i].covid + "</p>";
                }
                console.log(all_location_results);
                document.getElementById("displayLocationData").innerHTML = all_location_results;
            }).
        catch(e => {
            // alert(e)
        });
    });

    $("#checkArrivals").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/getArrival', {
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
                for (i = 0; i < data.length; i++) {
                    let time = data[i].flight_date.split('T')[0];
                    console.log(time);
                    result += "<p>Flight: " + data[i].flight_id + " Date: " +
                        time + " From: " + data[i].from_city + " To: " + data[i].to_city + "</p>";
                }
                console.log(result);
                document.getElementById("displayArrivalData").innerHTML = result;
            }).
        catch(e => {
            // alert(e)
        });
    });

    $("#checkDepartures").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/getDeparture', {
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
                for (i = 0; i < data.length; i++) {
                    let time = data[i].flight_date.split('T')[0];
                    console.log(time);
                    result += "<p>Flight: " + data[i].flight_id + " Date: " +
                        time + " From: " + data[i].from_city + " To: " + data[i].to_city + "</p>";
                }
                console.log(result);
                document.getElementById("displayDepartureData").innerHTML = result;
            }).
        catch(e => {
            // alert(e)
        });
    });

    $("#getMyLocations").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/getUserLocations/' + login_user_id, {
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
                console.log(data);
                let result = "";
                for (i = 0; i < data.length; i++) {
                    let time = data[i].date.split('T')[0];
                    console.log(time);
                    result += "<p>Location: " + data[i].location_name + " Date: " +
                        time + " Covid-19: " + data[i].covid + "</p>";
                }
                if (result === "") {
                    document.getElementById("myLocationData").innerHTML = "No Data Found";
                }
                console.log(result);
                document.getElementById("myLocationData").innerHTML = result;
            }).
        catch(e => {
            // alert(e)
        });
    });

    $("#search_carrier_submit").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/getCarrierFlights/' + "'"+ $('#search_flight_company').val() +"'", {
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
                for (i = 0; i < data.length; i++) {
                    
                    let time = data[i].flight_date.split('T')[0];
                    console.log(time);
                    result += "<br/>Departure: " + data[i].from_city;
                    result += " Arrival: " + data[i].to_city;
                    result += " Date: " + time;
                    result += " Flight: " + data[i].flight_id;
                }
                if (result === "") {
                    document.getElementById("carrierResults").innerHTML = "No Data Found";
                }
                console.log(result);
                document.getElementById("carrierResults").innerHTML = result;
            }).
        catch(e => {
            // alert(e)
        });
    });

    $('#login').click(() => {
        window.location.href = './login.html';
    })

    $('#signout').click(() => {
        localStorage.setItem('token', null);
        window.location.href = './login.html';
    });

    $("#add_location_submit").click(() => {
        fetch('https://covid-flight-backend.herokuapp.com/v1/inputUserLocation', {
            method: 'POST', // likewise we have DELETE, PUT, PATCH
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                location_name: document.getElementById('add_location_name').value,
                date: document.getElementById('add_date').value,
                user_id: login_user_id,
                covid: login_user_status
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
                alert("Data Entry Success.");
            }).
        catch(e => {
            // alert(e)
        });

    });

    //delete location
    $("#delete_location_submit").click(() => {
        if (!$('#delete_location_name').val()) {
            alert("You have to enter location name");
        } else {
            fetch('https://covid-flight-backend.herokuapp.com/v1/deleteuserLocation', {
                method: 'DELETE', // likewise we have DELETE, PUT, PATCH
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    location_name: document.getElementById('delete_location_name').value,
                    date: document.getElementById('delete_date').value,
                    user_id: login_user_id
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
        }
    });

    $('#search_flight_submit').click(() => {
        if (!$('#search_flight_id').val()) {
            alert("You have to enter flight number");
        } else if (!$('#search_flight_date').val()) {
            alert("You have to enter flight date");
        } else {
            fetch("https://covid-flight-backend.herokuapp.com/v1/getSingleFlight/'" + $('#search_flight_id').val() + "'/'" + $('#search_flight_date').val() + "'", {
                method: 'GET', // likewise we have DELETE, PUT, PATCH
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).
            then(res => {
                    console.log(res);

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
                    console.log(data);
                    if (data) {
                        let txt = "<b>Here's brief information about " + $('#search_flight_id').val() + " on " + $('#search_flight_date').val() + '</b>';
                        txt += "<br/><br/>Flight Company: " + data.flight_company;
                        txt += "<br/>Departure: " + data.from_city;
                        txt += "<br/>Arrival: " + data.to_city;
                        $('#searchedFlight').html(txt);
                    } else {
                        $('searchedFlight').html('<b>Unable to find the flight information.</b>');
                    }
                })
                .catch(e => {
                    // alert(e)
                });
        }
    });
    checkFlight = () => {
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
                let result = false;
                for (i = 0; i < data.length; i++) {
                    let time = data[i].flight_date;
                    let id = data[i].flight_id;
                    console.log(time);
                    console.log(id);
                    if ((time == login_flight_date) && (id = login_flight_number)) {
                        console.log("confirm");
                        $("#trackingFlightStatus").html("Confirmed");
                        $("#trackingFlightStatus").css( {"color": "red"});
                        $("#riskImage").html('<img src="./img/cancel.png" alt="No Covid Patients Found" width="120" height="auto">');
                        
                    }
                }
                console.log(result);
            }).
        catch(e => {
            // alert(e)
        });
    }
    
    checkFlight();
    

});