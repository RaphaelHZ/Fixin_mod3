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

  myForm = new FormGroup({
    entNome : new FormControl('', Validators.required),
    entCPF : new FormControl('', Validators.required),
   });


  submitted = false;
  public errorMessage: any = '';

  constructor(private modalCrtl: ModalController, public formBuilder: FormBuilder) { }

  fecharLogin(){
    this.modalCrtl.dismiss();
  }

  salvarLogin(){
    /* let novoLogin = {"novoNome": this.myForm.entNome.value, "novoCPF": this.entCPF.value}; */
/*     this.modalCrtl.dismiss(novoLogin); */
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


/*
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  myForm: FormGroup;
  
  submitted = false;

  public errorMessage: any = '';

  public books: any = [];

  constructor(public http: HttpClient, public formBuilder: FormBuilder) {}

  prepareDataRequest() {
    let dataUrl = "https://hpbtec-app1.herokuapp.com/books";
    this.http.get(dataUrl).subscribe(data => {
      console.log(data);
      this.books = data;
    });
  }

  get errorCtr() {
    return this.myForm.controls;
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

  cleanBooks() {
    this.books = [];
  }

  loadBooks() {
    this.prepareDataRequest();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
    })    
    console.log('prepareDataRequest...');
    this.prepareDataRequest();
  }

}
*/