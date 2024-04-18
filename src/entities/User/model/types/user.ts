export interface User{
        _id: string
        name: string
        email: string
        emailActivate: boolean
}

export type UserResponse = {
    user: User
    refreshToken: string
    accessToken: string
}

export interface UserSchema {
    _inited: boolean;
    authData?:User;
    error?: string
    isLoading?: boolean;
}
