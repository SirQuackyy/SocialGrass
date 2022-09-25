var interest = []
var x = document.getElementById("contain")

function send(){
    let message = document.getElementById("sent").value
    document.getElementById("sent").value = ""
    switch (interest.length){
        case 0:
            interest.append(message)
            x.append("<p>Same, that's my favorite too </p><br><p>What is your personality?</p>")
            break
        case 1:
            interest.append(message)
            x.append("<p>Cool, that's my favorite too </p><br><p>What is your personality </p>")
    }P
}