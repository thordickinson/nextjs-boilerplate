import { Auth } from "aws-amplify";


export interface User {
    raw: any
    username: string
    picture: string
}

export async function getUser(): Promise<User | undefined> {
    try {
        const cognito = await Auth.currentAuthenticatedUser()
        return { raw: cognito, username: cognito.username, picture: "/img/icons/user.svg" }
    } catch (ex) {
        if("The user is not authenticated" == ex){
            return undefined
        }
        throw ex
    }
}

export async function logOut(){
    await Auth.signOut()
}