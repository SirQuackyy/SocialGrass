var z = ["introvert", "sports", "going", "reading", "academics"]
var inter = []
function send(){
    for (var x = 0; x < z.length; x++){
        inter.append($(`input[name=${z[x]}]`).val());
    }
}