import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(private ser:ProductService){}
  product:any;
  ngOnInit(){
    this.ser.getProduct().subscribe((res)=>{
      this.product = res;
      console.log(this.product);
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
    }
    this.ser.addProduct(this.newProduct).subscribe((r)=>{

    });
    this.ser.getProduct().subscribe((res)=>{
      this.product=res;
    })

  }
  deleteProduct(p:any){
    this.ser.deleteProduct(p).subscribe((res)=>{})
    this.ser.getProduct().subscribe((res)=>{
      this.product = res;

    })
  }

proId:any;
proName:any;
proPrice:any;
proCompany:any;
msg:any;
edit(p:any){
console.log(p);
  this.productEdit = p;
  //console.log(`this.productEdit}`)
  this.proId = this.productEdit._id;
  this.proCompany = this.productEdit.productCompany;
  this.proName = this.productEdit.productName;
  this.proPrice = this.productEdit.productPrice;
  

}


save(){
  this.productEdit = {
    _id :this.proId,
    productCompany : this.proCompany,
    productName:this.proName,
    productPrice: this.proPrice
    
  };
  this.ser.updateProduct(this.productEdit).subscribe((res)=>{
    this.msg = res;
    
  
  });
  this.ser.getProduct().subscribe((re)=>{
    this.product = re;
    
  })

}

checkList:any[]=[];
addto(a:any){
  this.checkList.push(a);
}
delcheck(){
  console.log(this.checkList);
  for(let i =0;i<this.checkList.length;i++){
    this.ser.deleteProduct(this.checkList[i]).subscribe((res)=>{});
  };
  this.ser.getProduct().subscribe((res)=>{
    this.product =res;
  });
}
}
