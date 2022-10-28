import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../core/interfaces/product';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {

@Input() products:any[]=[];

fields=["id","name","price","quantity_stock","quantity_sold","unit","discount"]
//last for btn

  constructor() { }

  ngOnInit(): void {
  }


  updateProduct(id:any){
    const product=this.products.filter(p=>p.id==id);
  }
}
