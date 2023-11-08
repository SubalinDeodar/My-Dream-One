import { Component, OnInit } from '@angular/core';
import { Product } from '../model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  color = 'black'
  products!: any;
  newProduct: Product = {
    name: '',
    category: '',
    code: 0,
    quantity: 0
  }
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getProductDetails();


  }

  getProductDetails(): void {
    this.httpClient.get('http://localhost:8081/product').subscribe(data => {
      this.products = data
      console.log(data)

    })
  }

  addNewProducts(): void {
    console.log(this.newProduct)
    this.httpClient.post('http://localhost:8081/product', this.newProduct).subscribe(data => {
      this.products.push(data)
      console.log(this.products)

    })
  }

  deleteProduct(id: any): void {
    console.log(id)
    this.httpClient.post('http://localhost:8081/product/delete', id).subscribe(data => {
      this.getProductDetails()
      console.log(this.products)

    })
  }
}
