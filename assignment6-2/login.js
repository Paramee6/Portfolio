window.onload = loginLoad;
var user = {username:"ploy",password:"paramee"}

function loginLoad(){
	var form = document.getElementById("myLogin");
	var username = document.querySelector('input[name="username"]');
	var password = document.querySelector('input[name="password"]');

    form.addEventListener("submit", function(e){
        checkLogin(username.value,password.value,e)
    });
}

function checkLogin(username,password,e) {
	if(username == user.username && password == user.password){
		alert("Login successful")
		return true;
	}
	else{
		e.preventDefault(); //ไม่ให้บราวเซอร์รีเฟรช
		alert("Username or password is incorrect")
        return false;  
	}
}			