import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() antNome: String;
  @Input() antCpf: Number;

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

  onSubmit() {
    this.submitted = true;
    console.log(this.myForm.value);
    let dataUrl = "https://fixin-unifil.herokuapp.com/login";
    this.http.post(dataUrl, this.myForm.value).subscribe({
      next: data => {
        console.log(data);
        console.log('Login Criado!');
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', this.errorMessage);
      }      
    });      
  }
}
