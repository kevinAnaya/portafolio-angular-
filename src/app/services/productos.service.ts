import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

private cargarProductos(){

  return new Promise( (resolve, reject) => {

    this.http.get('https://angular-html-bb577-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp:Producto[]) => {

      this.productos = resp;
      this.cargando = false;
      resolve();
      
    });
  });

}

getProductos( id: string ){

  return this.http.get(`https://angular-html-bb577-default-rtdb.firebaseio.com/productos/${ id }.json`);
        
}

 buscarProducto( termino: string){
  
  if ( this.productos.length === 0 ){
    //cargar productos
    this.cargarProductos().then( () => {
      //ejecutar despues de terner los productos
      //aplicar filtro
      this.filtrarProductos( termino );
    } )
  }else{
    //aplicar el filtro
    this.filtrarProductos( termino );
  }

 }

 private filtrarProductos( termino : string ){

//   this.productosFiltrados = this.productos.filter( producto => {
//     return true;
//  });.

  
  this.productosFiltrados = [];
  termino = termino.toLocaleLowerCase();


  this.productos.forEach( prod => {
    const tituloMayu = prod.titulo.toLocaleLowerCase();
     if( prod.categoria.indexOf( termino ) >= 0 || tituloMayu.indexOf( termino ) >= 0 ){
       this.productosFiltrados.push( prod );
     }
  });

 
 }


}
