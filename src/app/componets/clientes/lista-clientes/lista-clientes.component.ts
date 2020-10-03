import { Component, OnInit } from '@angular/core';

// model
import { Cliente } from '../../../models/cliente';

// service
import { ClienteService } from '../../../services/cliente.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clienteList: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {}

    /* 
    Cuando cargue la aplicación, que reciba toda la información con el método 'getProducts' del servicio de firebase
     pero ademas que utilice el metodo 'snapshotChanges' para estar atento a los cambios que tengas los datos en la
     base de datos de firebase, para recorrerlo con forEach. 
  
     Cada dato lo obtengo 'payload' y lo convierto en formato JSON y lo asigno a la variable 'x'
     let x = element.payload.toJSON();
  
     Se le asigna por cada elemento la llave de cada registro, en una propiedad llamada '$key'
     por que se necesita para luego eliminar el registro
     x["$key"] = element.key;
  
     Cuando ya se tiene el elemento se asigna a mi arreglo 'clienteList' para ser mostrado en mi pantalla list
     this.cleinteList.push(x as Cliente);
  */
 ngOnInit() {
  return this.clienteService.getClientes()
    .snapshotChanges().subscribe(item => {
      this.clienteList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.clienteList.push(x as Cliente);
      });
    });
}

/* 
 Recibe una varible de tipo 'Cliente' para invocar el servicio de firebase, para actualizarlo
 Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, cliente)'  
*/
onEdit(cliente: Cliente) {
  this.clienteService.selectedCliente = Object.assign({}, cliente);
}

/* 
 Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deleteProduct' del servicio de firebase
 ademas muestra un 'warning' con toastr
*/
onDelete($key: string) {
  if (confirm('Are you sure you want to delete it?')) {
    this.clienteService.deleteCliente($key);
    this.toastr.warning('Deleted Successfully', 'Client Removed');
  }
}


}
