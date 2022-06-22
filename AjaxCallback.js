let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date=new Date();
    return date.getHours()+ "hrs: "+date.getMinutes()+"mins: "+date.getSeconds()+"secs"; 
}

function makeAJAXCall(methodType, url, callback, async=true, data=null){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        // console.log(methodType + " State Changed called at: " + showTime() + " Ready State: " +
        //             xhr.readyState + " Status: " + xhr.status);
        if(xhr.readyState===4){
            if(xhr.status===200 || xhr.status===201)
            callback(xhr.responseText);
        } else if(xhr.status >= 400){
            console.log("Handle 400 Client Error or 500 Server Error at: " + showTime());
        }
    }
    xhr.open(methodType, url, async);
    // xhr.send();
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else {
        xhr.send();
    }
    console.log(methodType +" request sent to the server at: "+showTime());
}

const getURL="http://localhost:3000/employees/5";

function getUserDetails(data){
    console.log("Get User Data at: "+ showTime() + "data: "+ data);
}
makeAJAXCall("Get", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to server at: "+showTime());

const deleteURL="http://localhost:49856/employees/4";
function userDeleted(data){
    console.log("User deleted: "+data);
}
makeAJAXCall("Delete", deleteURL,userDeleted,false);

const postURL="http://localhost:3000/employees";
const emplData={"name": "Harry", "salary": "5000"};
function userAdded(data){
    console.log("User Added: "+data);
}
makeAJAXCall("Post",postURL,userAdded,true,emplData)