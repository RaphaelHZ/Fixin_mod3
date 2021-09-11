import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  @Input() antNome: String;
  @Input() antCpf: Number;

  formLogin = new FormGroup({
    logCpf : new FormControl('', Validators.required),
    logId : new FormControl('', Validators.required),
   });


  submitted = false;
  public errorMessage: any = '';

  constructor(private modalCrtl: ModalController, public formBuilder: FormBuilder) { }

  fecharLogin(){
    this.modalCrtl.dismiss();
  }

  salvarLogin(){
    let novoLogin = {"cpf": this.formLogin.value, "id": this.formLogin.value};
    console.log(novoLogin);
    this.modalCrtl.dismiss(novoLogin);
  }
/* 
  onSubmit() {
    this.submitted = true;
    console.log(this.myForm.value);
    let dataUrl = "https://fixin-unifil.herokuapp.com/login";
    this.http.post(dataUrl, this.myForm.value).subscribe({
      next: data => {
        console.log(data);
        console.log('Login Criado!');
        let novoLogin = {"novoNome": this.entNome.value, "novoCPF": this.entCPF.value};
        this.modalCrtl.dismiss(novoLogin);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', this.errorMessage);
      }      
    });      
  } */
}