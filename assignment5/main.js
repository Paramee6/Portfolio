var counter = 1;
function postFunction() {
    
    console.log(counter);
    text_1 = document.getElementById("text1").value;
    if (counter == 1) {
        document.getElementById("topic1").innerHTML = text_1;
        counter++;
    }
    else if (counter == 2) {
        document.getElementById("comment1").innerHTML = text_1;
        counter++;
    }
    else if (counter == 3) {
        document.getElementById("comment2").innerHTML = text_1;
        counter++;
    }
    else {
        alert("Limit post !");
    }
}

function clearFunction() {
document.getElementById("topic1").innerHTML = '';
document.getElementById("comment1").innerHTML = '';
document.getElementById("comment2").innerHTML = '';
counter = 1;
}