export interface User
{
    _id ?: number;
    nom?:string;
    prenom?:string;
    cne?:string;
    tel?:string;
    dateNaissance?:Date;
    adresse?:string;
    email?:string;
    password?:string;
    typeUser?:string;
    salaire?:number;
    dateEmbouche?:Date;
    etat?:boolean;
    imgProfile?:string;
}