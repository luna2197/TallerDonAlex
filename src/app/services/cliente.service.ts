import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Traer los datos de firebase
  clienteList: AngularFireList<any>;
  
  // Una variable temporal, para guardar los datos seleccionados, del tipo Cliente
  selectedCliente: Cliente = new Cliente();

  constructor(private firebase: AngularFireDatabase) { }

  // Traer todos los productos desde firebase 
  getClientes() { // guarda los elementos en la varible 'clientes'
  
    return this.clienteList = this.firebase.list('clientes');
  }
  
  // crear un nuevo cliente  , recibiendo un parametro de tipo cliente
  insertCliente(cliente: Cliente) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo cliente , puede acceder a sus propiedades
    this.clienteList.push({
      nombre: cliente.nombre,
      dui: cliente.dui,
      mascota: cliente.mascota,
      tratamiento: cliente.tratamiento,
      medicamento: cliente.medicamento,      
      costo: cliente.costo
    });
  }

  // Actualiza un cliente, recibiendo un parametro de tipo Cliente
  updateCliente(cliente: Cliente) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.clienteList.update(cliente.$key, {
      nombre: cliente.nombre,
      dui: cliente.dui,
      mascota: cliente.mascota,
      tratamiento: cliente.tratamiento,
      medicamento: cliente.medicamento,      
      costo: cliente.costo
    });
  }

  // Elimina un cliente, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deleteCliente($key: string) {
    this.clienteList.remove($key);
  }
}
