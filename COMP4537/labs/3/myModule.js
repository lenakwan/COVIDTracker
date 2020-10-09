let xhttp = new XMLHttpRequest();
let str = "username";
xhttp.open("GET", "http://localhost:8888/?name=" +str, true);
xhttp.send();
xhttp.onreadystatechange = function(){
    if (this.readyState==4 && this.status == 200){
        document.getElementById("greeting").innerHTML= "Hello" + this.responseText;
        
    }
}