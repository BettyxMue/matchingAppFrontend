// @ts-nocheck

import { getToken, storeToken, storeUser } from "../resources/InternalStorage"

//let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI3NzM1NTcsInN1YiI6MiwidXNlciI6Mn0.kFcTJT-YRVCBmRbWdknOpYDIT8TC6Nx1OAY0TJo1oQn6ktNDIISKW2c5kkGHjFOVKbsI5H1KJs90NYujdOCtU_9Rg6QW-h-INGaw02LCXmvSMY-DkGAVSyyT56PSISvKZ6KJPTkVA31h12iYZQ9PhNy6DfyCKu6AEXcE3VRPqGk"
let ip4v = "192.168.0.207"

async function SignUp(username, email, city, plz, street, houseNumber){
    if (username == "" || email == "" || city == "" || plz == "" || street == "" || houseNumber == "") {
        return
    }
    var plzNumber = parseInt(plz)
    if (isNaN(plzNumber)){
        return "PLZ is not valid!"
    }
    var query = "http://" + ip4v + ":8080/signUp"
    var user = {
        "username": username,
        "email": email,
        "street": street,
        "houseNumber": houseNumber,
        "city": {
            "plz": plzNumber,
            "place": city
        }
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}

async function ActivateAccount(userid, code){
    if (userid == "" || code == ""){
        return
    }
    var codeDTO = {
        "Code": code
    }
    let query = "http://" + ip4v + ":8080/activate/" + userid;
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(codeDTO)
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    token = resultData.token
    if (token != null) {
        storeToken(token)
    }else{
        console.log("No token received!")
    }
    return true;
}

async function UpdateUser(user){
    if (user == null) {
        return
    }
    getToken().then(token => {
        sendActivationQuery(user, token).then(result => {
            return result
        })
    })
}

async function loginUser(loginObject){
    if (loginObject == null){
        return "No Login Data provided!"
    }
    let query = "http://"+ ipv4 +":8080/login"
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(loginObject)
    })
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    let token = resultData.token;
    let user = resultData.user
    if (token == null){
        return "No token provided!"
    }
    if (user == null){
        console.log("No user provided!")
    }
    storeUser(user);
    storeToken(token).then(() => {
        return true;
    });
    return true;   
}

export {SignUp,ActivateAccount,UpdateUser}

/*async function GetProfileById (userId, token) {
    if (userId == "") {
        return
    }
    let query = "http://" + ip4v + ":8080/profile/" + userId;
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;

}
export {GetProfileById}*/

async function getUserFromId(userid){
    if (userid == null){
        return "No Id given!"
    }
    const query = "http://" + ip4v + ":8080/profile/" + userid
    let token = await getToken()
    let request = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    this.response = await this.request.json();

    if(this.request.status != 200){
        console.log("Error when querying user")
        return this.request.statusText
    }

    return this.response
}


// Helper

async function sendActivationQuery(user, token){
    let query = "http://" + ip4v + ":8080/profile/" + user.id;
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return true;
}

export {SignUp,ActivateAccount,UpdateUser,loginUser,getUserFromId}
