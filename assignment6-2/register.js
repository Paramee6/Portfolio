window.onload = pageLoad;
function pageLoad(){
	var form = document.getElementById("myForm");

    form.addEventListener("submit", function(e){
        validateForm(e);
    });
}
function validateForm(e) {
    var firstname = document.querySelector('input[name="firstname"]');
    var lastname = document.querySelector('input[name="lastname"]');
    var gender = document.querySelector('input[name="gender"]');
    var birthday = document.querySelector('input[name="bday"]');
    var email = document.querySelector('input[name="email"]');
    var username = document.querySelector('input[name="username"]');
    var password = document.querySelector('input[name="password"]');
    var confirmPassword = document.querySelector('input[name="confirmPassword"]');
    var errorMsg = document.getElementById("errormsg");
    if(username.value == "" || password.value != confirmPassword.value){
        e.preventDefault(); 
        errorMsg.innerText = "Username must not be empty."
        return false;  
    }else if(password.value != confirmPassword.value){
        e.preventDefault(); 
        errorMsg.innerText = "Password and confirm password must match."
        return false;  
}
console.log("Register successful")
    return true;
}