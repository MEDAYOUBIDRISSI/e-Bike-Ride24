import { User } from "./user.class";


export interface Commande
{ 
    _id ?: number;
    etat?:boolean;
    user?:User;
}