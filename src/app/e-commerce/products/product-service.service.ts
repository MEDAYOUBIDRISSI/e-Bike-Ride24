import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produit } from '../../e-commerce/class/produit.class';
import { LigneCommande } from '../../e-commerce/class/ligneCommande.class';
import { Commande } from '../../e-commerce/class/commande.class';
import { Categorie } from '../../e-commerce/class/categorie.class';
import { Univer } from '../../e-commerce/class/univer.class';
import { Marque } from '../../e-commerce/class/marque.class';
import { Coupon } from '../../e-commerce/class/coupon.class';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseURL = "http://localhost:5000"; 

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<any>{
    return this.httpClient.get<Produit[]>(`${this.baseURL}/product/all`);
  }

  getBicycletteById(_id: number): Observable<any>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/${_id}`);
  }

  createCommande(Commande: Commande): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/commande/create`, Commande);
  }

  updateCommande(_id: any, Commande: Commande): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/commande/update?CommandeID=${_id}`, Commande);
  }

  createLigneCommande(ligneCommande: LigneCommande): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/lignecommande/create`, ligneCommande);
  }

  getCommandeByUser(_id: any): Observable<any>{
    return this.httpClient.get<LigneCommande[]>(`${this.baseURL}/commande/byuser/${_id}`);
  }

  getAllLigneCommandesByUser(_id: any): Observable<any>{
    return this.httpClient.get<any[]>(`${this.baseURL}/lignecommande/byuser/${_id}`);
  }

  getCommandeByCommande(_id: any): Observable<any>{
    return this.httpClient.get<LigneCommande[]>(`${this.baseURL}/lignecommande/bycommande/${_id}`);
  }

  deleteLigneCommande(_id: number): Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/lignecommande/delete?ligneCommandeID=${_id}`);
  }

  LigneCommandeAddQte(_id: number, ligneCommande: LigneCommande): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/lignecommande/addqte?ligneCommandeID=${_id}`, ligneCommande);
  }
  LigneCommandeMinusQte(_id: number, ligneCommande: LigneCommande): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/lignecommande/minusqte?ligneCommandeID=${_id}`, ligneCommande);
  }


  /* Categories of Products */

  getCategoriesList(): Observable<any>{
    return this.httpClient.get<Categorie[]>(`${this.baseURL}/categorie/all`);
  }

  /* Univers of Products */

  getUniversList(): Observable<any>{
    return this.httpClient.get<Univer[]>(`${this.baseURL}/univer/all`);
  }

   /* Brands of Products */

   getMarquesList(): Observable<any>{
    return this.httpClient.get<Marque[]>(`${this.baseURL}/marque/all`);
  }

  /* Get Products By Categorie */

  getBicycletteByCategorie(_id: number): Observable<any>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/bikes/byCategorie/${_id}`);
  }

   /* Get Products By Univer */

   getBicycletteByUniver(_id: number): Observable<any>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/bikes/byUniver/${_id}`);
  }

  // Get Coupon

  getCouponByCoudeCoupon(codeCoupon: string): Observable<any>{
    return this.httpClient.get<Coupon>(`${this.baseURL}/coupon/byCodeCoupon/${codeCoupon}`);
  }
 

  /* Categories of Bike */

  getCategoriesListOfBike(): Observable<any>{
    return this.httpClient.get<Categorie[]>(`${this.baseURL}/categorie/categorieOfBike/all`);
  }

  /* Categories of Accessoires Of Bike */

  getCategoriesListOfAccessoiresOfBike(): Observable<any>{
    return this.httpClient.get<Categorie[]>(`${this.baseURL}/categorie/categorieOfAccessoiresOfBike/all`);
  }

  /* Categories of Accessoires Of Bikers */

  getCategoriesListOfAccessoiresOfBikers(): Observable<any>{
    return this.httpClient.get<Categorie[]>(`${this.baseURL}/categorie/categorieOfAccessoiresOfBikers/all`);
  }

  /* Get Accessoires Cycliste By Categorie */

  getAccessoioreCyclisteByCategorie(_id: any): Observable<any>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/accessoirecycliste/byCategorie/${_id}`);
  }

  /* Get Accessoires Vello By Categorie */

  getAccessoioreVeloByCategorie(_id: any): Observable<any>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/accessoirevelo/byCategorie/${_id}`);
  }

  /* Marque of Bike */

  getMarquesListOfBike(): Observable<any>{
    return this.httpClient.get<Marque[]>(`${this.baseURL}/marque/marquesOfBike/all`);
  }

  /* Marques of Accessoire */

  getMarqueListOfAccessoires(): Observable<any>{
    return this.httpClient.get<Marque[]>(`${this.baseURL}/marque/marquesOfAccessoires/all`);
  }

  /* Get Accessoires By Marque */

  getAccessoioreByMaque(_id: any): Observable<any>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/accessoire/byMarque/${_id}`);
  }

   /* Get Accessoires By Marque */

   getBikeByMaque(_id: any): Observable<any>{
    return this.httpClient.get<Produit>(`${this.baseURL}/product/bikes/byMarque/${_id}`);
  }
  /* Get Products By Searche */
  getProductsListBySearch(_MotsCles:any,_Type:any): Observable<any>{
    return this.httpClient.get<Produit[]>(`${this.baseURL}/product/searche/${_MotsCles}/${_Type}`);
  }
}
