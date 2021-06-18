import { User } from "./user.class";


export interface Commande
{ 
    _id ?: string;
    etat?:boolean;
    user?:User;
}