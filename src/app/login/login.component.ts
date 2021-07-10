import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  entNome = new FormControl('', Validators.required);
  entCPF = new FormControl('', Validators.required);
  constructor(private modalCrtl: ModalController) { }

  fecharLogin(){
    this.modalCrtl.dismiss();
  }

  salvarLogin(){
    let novoLogin = {"novoNome": this.entNome.value, "novoCPF": this.entCPF.value};
    this.modalCrtl.dismiss(novoLogin);
  }
}
