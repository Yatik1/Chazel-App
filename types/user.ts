export default interface UserType {
    name:string,
    email:string,
    pic?:string, 
    token:string,
    _id:string
}

export interface ChatUserType {
    _id:string,
    name:string, 
    email:string,
    pic:string | null,
    isAdmin:boolean
}

export type SenderProps = {
    chatName:string,
    groupAdmin:ChatUserType,
    isGroupChat:boolean,
    users:ChatUserType[],
    _id:string

}