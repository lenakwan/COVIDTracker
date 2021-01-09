$(document).ready(function () {
    $('#submitButton').click(() => {
        console.log($('#search').val());
        if ($('#search').val() == '') {
            $('#display').html("Can't be empty");
        } else {
            onSubmit($('#search').val());
        }
    });
    $('#back').click(() => {
        window.location.replace("./index.html");
    });
});


async function onSubmit(search) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://guarded-cliffs-20393.herokuapp.com/getdef/" + search, true);
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*')

    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#display').html(this.responseText);
        } else {
            $('#display').html("-Unable to find the word-");
        }
    };
}