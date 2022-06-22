let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date=new Date();
    return date.getHours()+ "hrs: "+date.getMinutes()+"mins: "+date.getSeconds()+"secs"; 
}

function makPromiseCall(methodType, url, async=true, data=null){
    return new Promise(function (resolve, reject) {
        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            // console.log(methodType + " State Changed called at: " + showTime() + " Ready State: " +
            //             xhr.readyState + " Status: " + xhr.status);
            if(xhr.status.toString().match('^[2][0-9]{2}$')){
                resolve(xhr.responseText);
            } else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
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
    });
}

const getURL="http://localhost:3000/employees/5";
makPromiseCall("GET", getURL, true)
    .then(responseText => {
    console.log("Get User Data at: "+ showTime() + "data: "+ responseText);
    })
    .catch(error => console.log("Get Error Status: " + JSON.stringify(error)));

const deleteURL="http://localhost:49856/employees/4";
makPromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
    console.log("User Deleted Data at: "+ showTime() + "data: "+ responseText);
    })
    .catch(error => console.log("Delete Error Status: " + JSON.stringify(error)));

const postURL="http://localhost:3000/employees";
const emplData={"name": "Harry", "salary": "5000"};
makPromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
    console.log("User Added Data at: "+ showTime() + "data: "+ responseText);
    })
    .catch(error => console.log("Post Error Status: " + JSON.stringify(error)));