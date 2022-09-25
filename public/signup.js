var char = false, conf = false, num = false;

function checkpass(){
    var reg = /\d/m
    var pass = document.getElementById("pass").value
    var tex = document.getElementById("tex")
    if (pass.length < 8){
        document.getElementById("tex").style.color = "red"
        char = false
    }else if (pass.length>=8){
        document.getElementById("tex").style.color = "black"
        char = true
    }
    if (!reg.test(pass)){
        document.getElementById("tex1").style.color = "red"
        num  = false
    }else if (reg.test(pass)){
        document.getElementById("tex1").style.color = "black"
        num = true    
    }
}

function checkconf(){
    let pass = document.getElementById("pass").value, 
    cpass = document.getElementById("cpass").value,
    p = document.getElementById("confirm")
    if (cpass != pass){
        conf = false
        p.innerText = "It Doesn't Match Your Password"
    }else{
        conf = true
        p.innerText = ""
    }
}

function checkval(x){
  return document.getElementById(x).value.length > 0
}

function signsubmit(){
  if (char && conf && num){
    if (checkval("fname") && checkval("lname") && checkval("username") && checkval("school")){
      console.log(`${document.getElementById("pass").value}`)
      $.ajax({
        type: 'POST',
        url: `http://localhost:3000/users/${document.getElementById("username").value}&=${document.getElementById("pass").value}&=${document.getElementById("fname").value}&=${document.getElementById("lname").value}&=${document.getElementById("school").value}&=""&=${[]}`,
        success: function(response) { 
         console.log(response);
        },
        error: function(xhr, status, err) {
          console.log(xhr.responseText);
        }
      });
    }
  }
}
function checkcomplete(){
    var complete = document.getElementById("school").value
    $.getJSON(`https://api.schooldigger.com/v2.0/autocomplete/schools?q=${complete}&appID=129957d4&appKey=e2d00b8684e78914aefcfbd57a2ae348`, function(data){
        for(var i = 0; i < data.schoolMatches.length; i++){
            const school = data.schoolMatches[i].schoolName + ", " + data.schoolMatches[i].city + ", " + data.schoolMatches[i].state;
            if(!schoolNames.includes(school)){
                schoolNames.push(school);
            }
        }    
    });
    autocomplete(document.getElementById("school"), schoolNames);
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }