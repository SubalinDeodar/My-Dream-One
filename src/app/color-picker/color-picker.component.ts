import { Component, OnInit } from '@angular/core';
import { Product } from '../model';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  providers: [MessageService]
})
export class ColorPickerComponent implements OnInit {
  color = 'black'
  products!: any;
  editFlag: boolean = false
  newProduct: Product = {
    name: '',
    category: '',
    code: 0,
    quantity: 0
  }
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProductDetails();


  }

  getProductDetails(): void {
    this.httpClient.get('http://localhost:8082/product').subscribe(data => {
      this.products = data
      console.log(data)

    })
  }

  addNewProducts(): void {
    if(this.editFlag) {
      this.httpClient.put('http://localhost:8082/product', this.newProduct).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The product has been editted Successfully' });
      this.getProductDetails()
      console.log(this.products)
      this.editFlag = false;
      this.resetForm();
    })
    }
   else {
    this.httpClient.post('http://localhost:8082/product', this.newProduct).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The product has been added Successfully' });
      this.products.push(data)
      console.log(this.products)
      this.resetForm()

    })
  }
  }

  deleteProduct(id: any): void {
    console.log(id)
    this.httpClient.post('http://localhost:8082/product/delete', id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The product has been deleted Successfully' });
      this.getProductDetails()
      console.log(this.products)

    })
  }

  editProduct(product: Product): void {
    this.newProduct = {
      category: product.category,
      code: product.code,
      quantity: product.quantity,
      name: product.name
    }
    this.editFlag = true
    
  }

  resetForm(): void {
    this.newProduct = {
      category: '',
      code: 0,
      quantity: 0,
      name: ''
    }
  }
}
