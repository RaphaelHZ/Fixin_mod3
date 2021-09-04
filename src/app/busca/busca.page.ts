import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage {
  private local;
  private servico;
  private pagto;


  constructor(public http: HttpClient, public router: Router, public formBuilder: FormBuilder) {
    
  }

  @NgModule({
    imports: [
      FormsModule,    //import here
      ReactiveFormsModule //import here
    ],
  })

  myForm = new FormGroup({
    local: new FormControl(),
    servico: new FormControl(),
    pagto: new FormControl()
  });
  /* myForm: FormGroup; */

  public errorMessage: any = '';
  dados: any;
  locais: any = ["Rolandia","Londrina","Cambe","Ibipora","Maringa"];
  servicos: any = ["servacab","servarqt","servautr","servazul","servcarp","servdeco",
                   "servelet","servenge","servgess","servhidr","servinfr","servjard",
                   "servmarm","servmovl","servpint","servrevs","servserr","servvidr",];
/*   servicos: any = ["Acabamentos","Arquiteto(a)","Automação Residencial","Azulejista","Carpintaria",
                  "Decoração","Elétrica","Engenheiro(a) Civil","Gesso e Dry Wall","Hidráulica",
                  "Infraestrutura","Jardinagem","Marmoraria","Movelaria","Pintura",
                  "Revestimentos","Serralheria","Vidraçaria"
                  ]; */
  pagtos: any = ["pagtocc","pagtocd","pagtotr","pagtocq","pagtopx","pagtobt","pagtodn"];                



  ngOnInit() {
    this.myForm = this.formBuilder.group({
      local: ['Selecione'],
      servico: ['Selecione'],
      pagto: ['Selecione']
    })}

  submit() {
      console.log(this.myForm.value);
      /* let dataUrl = "http://localhost:5000/resultado";
      this.http.get(dataUrl, this.myForm.value).subscribe({
        next: data => {
          console.log(data);
          console.log('Busca executada!');
          var parametros: any = {dados: data};
          this.router.navigate(['./result'], {queryParams: parametros});
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('Houve um erro!', this.errorMessage);
        }      
      });   */    
  }
}
