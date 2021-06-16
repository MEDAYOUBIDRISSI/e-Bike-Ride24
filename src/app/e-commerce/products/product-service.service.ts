import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produit } from '../../e-commerce/class/produit.class';
import { LigneCommande } from '../../e-commerce/class/ligneCommande.class';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseURL = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  getBicyclettesList(): Observable<Produit[]>{
    return this.httpClient.get<Produit[]>(`${this.baseURL}/product/all`);
  }

  getBicycletteById(_id: number): Observable<Produit>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/${_id}`);
  }

  createCommande(Commande: Commande): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/commande/create`, Commande);
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


}
