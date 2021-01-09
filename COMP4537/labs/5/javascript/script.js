$( document ).ready(function() {
    $('#submitButton').click(()=>{
        if($('#word').val() == '' || $('#definition').val().trim() == ''){
            $('#display').html("Can't be empty");
        }
        else if(!isLetter($('#word').val())){
            $('#display').html("Invalid Word");
        }
        else{
            onSubmit($('#word').val(), $('#definition').val());
        }
    });

    $('#goToSearch').click(()=>{
        window.location.replace("./searchPage.html");
    });
    $('#back').click(()=>{
        window.location.replace("../../index.html");
    });
});

isLetter = (s) =>
{
  return s.match("^[a-zA-Z\(\)]+$");    
}

async function onSubmit(word, definition){
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://guarded-cliffs-20393.herokuapp.com/definition", true);
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*')

    xhttp.send(JSON.stringify({
        "word": word, 
        "definition" : definition
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState==4 && this.status == 200){
            $('#display').html("success");
        } 
        else{
            $('#display').html("failed");
        }
    }; 
}