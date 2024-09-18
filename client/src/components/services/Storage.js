export const storeUserData = (data)=>{
    localStorage.setItem('idToken',data._id)
    localStorage.setItem('username',data.firstname)
    localStorage.setItem('useremail',data.email)

}

export const getUserData = ()=>{

    return localStorage.getItem('idToken');
}

export const getUserName = ()=>{

    return localStorage.getItem('username');
}

export const getUseremail = ()=>{
    
    return localStorage.getItem('useremail');
    
}

export const removeUserData = ()=>{
     localStorage.removeItem('idToken')
     localStorage.removeItem('username')
     localStorage.removeItem('userdetails')
}