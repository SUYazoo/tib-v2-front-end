import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlServ = "http://localhost:8000"

  constructor( private http : HttpClient) { }

  getProductsFromJson(){
    return this.http.get<Product[]>("../assets/data/Products.json");
  }

  getProducts(){
    return this.http.get(this.urlServ + "/infoproducts/");
  }

  addProductInStock(tig_id : number, quantity: number){
    return this.http.get(this.urlServ + "/incrementStock/"+tig_id+"/"+quantity)
  } 

  removeProductInStock(tig_id : number, quantity: number){
    return this.http.get(this.urlServ + "/decrementStock/"+tig_id+"/"+quantity)
  } 

  modifyPromotion(tig_id :number, percent : number) {
    return this.http.get(this.urlServ + "/setDiscount/"+tig_id+"/"+percent)
  }
  
}


