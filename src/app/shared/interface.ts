export interface Post {
    id?:string
    title:string
    text:string
    date:Date
}

export interface User {
    email:string
    password:string
    returnSecureToken?:boolean
}

export interface FbAuthResponse {
    idToken:string
    expiresIn:string
}

export interface fbCreateResponse {
    name:string
}