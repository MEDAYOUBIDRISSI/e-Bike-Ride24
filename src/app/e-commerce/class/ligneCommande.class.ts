import { Commande } from "./commande.class";
import { Produit } from "./produit.class";

export interface LigneCommande{

    _id?:string;
    qte?:number;
    product?:Produit;
    commande?:Commande;
}