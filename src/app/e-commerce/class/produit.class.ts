import { Categorie } from "../class/categorie.class";
import { Univer } from "../class/univer.class";
//import { Remise } from "src/feature/remise/schemas/remise.schema";
//import { Tage } from "src/feature/tage/schemas/tage.schema";
import { Marque } from "../class/marque.class";

export interface Produit
{ 
    _id?:string;
    codeBare?:string;
    libelle?:string;
    hideline?:string;
    description?:string;
    prixAchat?:number;
    prixVent?:number;
    qteStock?:number;
    anneModel?:string;
    etat?:boolean;
    typeProduct?:string;
    tailleRue?:string;
    nombreDengrenages?:string;
    materiau_du_cadre?:string;
    materiau_de_lafourche?:string;
    freins?:string;
    categorie?:Categorie;
    // Tage?:Tage[];
    // Remise?:Remise;
    Marque?:Marque;
    Univer?:Univer;
    Image?:string[];
}