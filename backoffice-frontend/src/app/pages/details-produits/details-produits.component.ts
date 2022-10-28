import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css']
})

export class DetailsProduitsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Nom', 'Prix', 'Prix en promo','En promotion','% Promo','Saisie Promo','Quantité en stock', 'Saisie Stock', 'Nb Article Vendu','Commentaire']; 
  listeProduits: Product[] = [];
  dataSource0: Product[] = [];
  dataSource1: Product[] = [];
  dataSource2: Product[] = [];
  unproduit: any;
  listePoissons: Product[] = [];
  listeFruitsMer: Product[] = [];
  listeCrustaces: Product[] = [];
  show0: boolean = false;
  show1: boolean = false;
  show2: boolean = false;
  inputStockValue: any;
  inputPromoValue: any;
  

 


  constructor(private router : Router, public productsService : ProductsService) { 
  }

  getProducts(){
    this.productsService.getProducts().subscribe((res:any) => {
      this.listeProduits = res;
      for (let p of this.listeProduits) {

        if (p.category==0) {
          this.listePoissons.push(p);
        }
        if (p.category==1) {
          this.listeFruitsMer.push(p);
        }
        if (p.category==2) {
          this.listeCrustaces.push(p);
        }
      }
      this.dataSource0 = this.listePoissons;
      this.dataSource1 = this.listeFruitsMer;
      this.dataSource2 = this.listeCrustaces;
    },
    (err) => {
      alert('failed loading json data');
    });
  }

  getProduct(id: number) {
    this.productsService.getProductsFromJson().subscribe((res: Product[]) => {
      this.listeProduits = res;
      for (let p of this.listeProduits) {
        if (id == p.tig_id) {
          this.unproduit = p;
          console.log(this.unproduit);
          break;
        }
      }
    },
      (err) => {
        console.log()
        alert('failed loading json data');
      }
    );
  }

  getCategorie(cat: number){
    this.productsService.getProductsFromJson().subscribe((res: Product[]) => {
      this.listeProduits = res;
      for (let p of this.listeProduits) {
        if (cat == p.category) {
          this.unproduit = p;
          break;
        }
  
      }
    },
      (err) => {
        console.log()
        alert('failed loading json data');
      }
    );
  }

  addQuantityStock(produit: Product){
    if(this.inputStockValue){
      this.productsService.addProductInStock(produit.tig_id,this.inputStockValue).subscribe(res => {
        this.unproduit = res;
        this.unproduit.quantityInStock += this.inputStockValue;
      })
    }
  }

  subQuantityStock(produit: Product){
    if(this.inputStockValue){
      this.productsService.removeProductInStock(produit.tig_id,this.inputStockValue).subscribe(res => {
        this.unproduit = res;
        this.unproduit.quantityInStock -= this.inputStockValue;
      })
    }
  }

  modifyPromotion(produit: Product){
    if(this.inputPromoValue){
      this.productsService.modifyPromotion(produit.tig_id,this.inputPromoValue).subscribe(res => {
        this.unproduit = res;
        this.unproduit.discount = this.inputPromoValue;
      })
    }
  }

onKeyPromo(event : any)
  {const inputPromoValue = event.target.value;
    if (inputPromoValue > 100 ) {
      event.target.style.background = 'red';
      return alert("le pourcentage doit etre inférieur à 100");
    }
    if (inputPromoValue<0){
      event.target.style.background = 'red';
      return alert("le pourcentage doit être supérieur a 0")
    }
  }

  onKeyStock(event : any)
  {const inputStockValue = event.target.value;
    if (inputStockValue > 500 ) {
      event.target.style.background = 'red';
      return alert("la quantité maximale est limité à 500");
    }
    if (inputStockValue<0){
      event.target.style.background = 'red';
      return alert("La quantité de stock ne peut pas être négatif")
    }
  }





  ngOnInit(): void {
    this.getProducts();
  }
}
