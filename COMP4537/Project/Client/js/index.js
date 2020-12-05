$(document).ready(function() {
    $("#search").click(()=> {

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

    $('#toSign').click(()=>{
        window.location.href = './login.html';
    });


});