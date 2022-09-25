function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

var user = getQueryVariable("s");

window.onload = function() {
    fetch("./db.json")
    .then(response => {
        return response.json();
    })
    .then(db => {
        for(var i = 0; i < db.length; i++){
            if(user == db[i].username){
            document.getElementById("username").innerText = user;
            document.getElementById("flName").innerText = db[i].first_name + " " + db[i].last_name;
            document.getElementById("about").innerText = db[i].about;
            document.getElementById("introvert").innerText = user;
            document.getElementById("sports").innerText = user;
            document.getElementById("inside").innerText = user;
            document.getElementById("reading").innerText = user;
            document.getElementById("academics").innerText = user;
            break;
            }
        }
    });
}