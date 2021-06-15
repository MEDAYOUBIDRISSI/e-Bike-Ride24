import { Commande } from "./commande.class";
import { Produit } from "./produit.class";

export interface LigneCommande{

    qte?:number;
    product?:Produit;
    commande?:Commande;
}