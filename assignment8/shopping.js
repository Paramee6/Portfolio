window.onload = pageLoad;

function pageLoad(){
	var xhr = new XMLHttpRequest(); 
    xhr.open("GET", "cloth.json"); 
    xhr.onload = function() { 
        var jsondata = JSON.parse(xhr.responseText);
        console.log(jsondata);
        display(jsondata);
    }; 
    xhr.onerror = function() { alert("ERROR!"); }; 
    xhr.send();
}

function display(people){	
    console.log(Object.keys(people).length);
    var showdiv = document.querySelectorAll("#layer div");
    var keys = Object.keys(people);
    for(var i =0; i< keys.length;i++){   
        var temp = document.createElement("p");
        var image = document.createElement("img");
        temp.innerHTML = people[keys[i]].brandname + " " + people[keys[i]].price;
        image.src ="pic/"+ people[keys[i]].pic;
        
        showdiv[i].appendChild(image);
        showdiv[i].appendChild(temp);

    }
}