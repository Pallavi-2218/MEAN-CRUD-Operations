import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
   constructor(private ser:ProductService,){}
product:any;

  ngOnInit(){
    this.ser.getProduct().subscribe((re)=>{
      this.product = re;
      console.log(re);
    })
  }

  productEdit:any;
  newProduct:any;
  title:any;
  company:any;
  price:any;
  addProduct(){
    this.newProduct={
      productCompany:this.company,
      productName:this.title,
      productPrice:this.price
    };
    this.ser.addProduct(this.newProduct).subscribe((r)=>{

    });
    this.ser.getProduct().subscribe((res)=>{
      this.product=res;
    })
    this.title = ''
    this.company = ''
    this.price = ''
  }
  del(p:any){
    this.ser.deleteProduct(p).subscribe((res)=>{})
    this.ser.getProduct().subscribe((res)=>{
      this.product=res;
    })
  }
  filtervalue=""
  f=false;
  filteredproducts:any =[];
  l:any;
  filter(){
  
    this.f=true;
    console.log("f="+this.f)
    this.ser.getProduct().subscribe(
      
      (res)=>{this.product=res}
      )
  
      console.log("all products ="+this.product)
  
      this.filteredproducts=this.product.filter((item:any)=>{
        //return item.pgenre.toLowerCase().includes(this.filtervalue.toLowerCase()) ||
  
        return  item.productCompany.toLowerCase().includes(this.filtervalue.toLowerCase()) ||
  
        item.productName.toLowerCase().includes(this.filtervalue.toLowerCase()) ||
  
        item.productPrice.toLowerCase().includes(this.filtervalue.toLowerCase()) 
  
  
      })
      
      this.l=this.filteredproducts.length
      
      console.log("filtered products ="+this.filteredproducts)
  }
  

}
