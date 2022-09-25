function load(){
    var username = document.cookie.split("=")[1]
    document.getElementById("Username").innerText = username
    console.log(username)
}