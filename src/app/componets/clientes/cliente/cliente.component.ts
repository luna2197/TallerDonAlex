import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

//  Service 
import { ClienteService } from '../../../services/cliente.service';
// Class
import { Cliente } from '../../../models/cliente';
// toastr
import { ToastrService } from 'ngx-toastr';

//Service
import { AuthService } from "../../../services/auth.service";

import { from } from 'rxjs';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    public clienteService: ClienteService,
    public toastr: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes();
    this.resetForm();
  }

  onSubmit(clienteForm: NgForm){
    if(clienteForm.value.$key == null){
      this.clienteService.insertCliente(clienteForm.value);
    }
    else{
      this.clienteService.updateCliente(clienteForm.value);
      this.toastr.success('Sucessful Operation', 'No reconoce la llave');
    }

    this.resetForm(clienteForm);
    this.toastr.success('Sucessful Operation', 'Product Registered');
  }
  // Para limpiar el formulario
  resetForm(clienteForm?: NgForm) {
    if (clienteForm != null)
      clienteForm.reset();
    this.clienteService.selectedCliente = new Cliente();
  }
}
