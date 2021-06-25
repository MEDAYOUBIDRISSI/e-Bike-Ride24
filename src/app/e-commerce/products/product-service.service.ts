import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produit } from '../../e-commerce/class/produit.class';
import { LigneCommande } from '../../e-commerce/class/ligneCommande.class';
import { Commande } from '../../e-commerce/class/commande.class';
import { Categorie } from '../../e-commerce/class/categorie.class';
import { Univer } from '../../e-commerce/class/univer.class';
import { Marque } from '../../e-commerce/class/marque.class';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseURL = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<Produit[]>{
    return this.httpClient.get<Produit[]>(`${this.baseURL}/product/all`);
  }

  getBicycletteById(_id: number): Observable<Produit>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/${_id}`);
  }

  createCommande(Commande: Commande): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/commande/create`, Commande);
  }

  updateCommande(_id: any, Commande: Commande): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/commande/update?CommandeID=${_id}`, Commande);
  }

  createLigneCommande(ligneCommande: LigneCommande): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/lignecommande/create`, ligneCommande);
  }

  getCommandeByUser(_id: any): Observable<LigneCommande[]>{
    return this.httpClient.get<LigneCommande[]>(`${this.baseURL}/commande/byuser/${_id}`);
  }

  getCommandeByCommande(_id: any): Observable<LigneCommande[]>{
    return this.httpClient.get<LigneCommande[]>(`${this.baseURL}/lignecommande/bycommande/${_id}`);
  }

  deleteLigneCommande(_id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/lignecommande/delete?ligneCommandeID=${_id}`);
  }

  LigneCommandeAddQte(_id: number, ligneCommande: LigneCommande): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/lignecommande/addqte?ligneCommandeID=${_id}`, ligneCommande);
  }
  LigneCommandeMinusQte(_id: number, ligneCommande: LigneCommande): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/lignecommande/minusqte?ligneCommandeID=${_id}`, ligneCommande);
  }


  /* Categories of Products */

  getCategoriesList(): Observable<Categorie[]>{
    return this.httpClient.get<Categorie[]>(`${this.baseURL}/categorie/all`);
  }

  /* Univers of Products */

  getUniversList(): Observable<Univer[]>{
    return this.httpClient.get<Univer[]>(`${this.baseURL}/univer/all`);
  }

   /* Brands of Products */

   getMarquesList(): Observable<Marque[]>{
    return this.httpClient.get<Marque[]>(`${this.baseURL}/marque/all`);
  }

  /* Get Products By Categorie */

  getBicycletteByCategorie(_id: number): Observable<Produit>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/bikes/byCategorie/${_id}`);
  }

 

}
