import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getProduct(){
    return this.http.get('http://localhost:2323/',({responseType:'json'}));
  }
  addProduct(p:any){
    return this.http.post('http://localhost:2323/add',p,({responseType:'text'}));

  }
  updateProduct(pro:any){
    let res=pro._id;
    return this.http.put(`http://localhost:2323/update/${res}`,pro,({responseType:'text'}));
  }
  deleteProduct(pro:any){
    let res=pro._id;
    return this.http.delete(`http://localhost:2323/delete/${res}`,({responseType:'text'}));
  }
  deleteMultipleProducts(ids: string[]) {
    return this.http.delete(`http://localhost:2323/products`, { body: { ids } });
  }
}
