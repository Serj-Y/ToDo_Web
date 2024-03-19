export interface User{
    user:{
        _id: string
        name: string
        email: string
        emailActivate: boolean
        updatedAt: string
    },
    refreshToken: string
    accessToken: string

}

export interface UserSchema {
    authData?:User;
    _inited: boolean;
}
