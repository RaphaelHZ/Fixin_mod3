import { Http } from '@angular/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { CadastroService } from '../services/cadastro.service';
import { Cadastro } from '../models/cadastro';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(
    private ModalCtrl: ModalController, 
    private http: Http, 
    public router: Router, 
    public formBuilder: FormBuilder,
    private cadastroService: CadastroService) {}

  @NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule
    ],
  })


  //Variáveis para "login"
  cpf="0";
  id: number;
  nome="Usuário não logado";
  dados: any; //não sei se irei utilizar ainda


  //Variáveis para busca
  formBusca = new FormGroup({
    local: new FormControl(),
    servico: new FormControl(),
    pagto: new FormControl()
  });
  public errorMessage: any = '';
  infobd: any[] = [];
  baseDados: any;


  //Variáveis para cadastro
  formCadastro = new FormGroup({
    bdNome: new FormControl(),
    bdNomeF: new FormControl(),
    bdFone: new FormControl(),
    bdRua: new FormControl(),
    bdNumero: new FormControl(),
    bdCidade: new FormControl()
  });

  bdNome: String;
  bdNomeF: String;
  bdFone: String;
  bdRua: String;
  bdNumero: String;
  bdCidade: String;
  bdPagto: any = [
    {pagto: 'Cartão Crédito', isChecked: false },
    {pagto: 'Cartão Débito', isChecked: false },
    {pagto: 'Transferência', isChecked: false },
    {pagto: 'Cheque', isChecked: false },
    {pagto: 'PIX', isChecked: false },
    {pagto: 'Boleto', isChecked: false },
    {pagto: 'Dinheiro', isChecked: false }
  ];
  bdServ: any = [
    {serv: 'Acabamentos', isChecked: false },
    {serv: 'Arquiteto(a)', isChecked: false },
    {serv: 'Automação Residencial', isChecked: false },
    {serv: 'Azulejista', isChecked: false },
    {serv: 'Carpintaria', isChecked: false },
    {serv: 'Decoração', isChecked: false },
    {serv: 'Elétrica', isChecked: false },
    {serv: 'Engenheiro(a) Civil', isChecked: false },
    {serv: 'Gesso e Dry Wall', isChecked: false },
    {serv: 'Hidráulica', isChecked: false },
    {serv: 'Infraestrutura', isChecked: false },
    {serv: 'Jardinagem', isChecked: false },
    {serv: 'Marmoraria', isChecked: false },
    {serv: 'Movelaria', isChecked: false },
    {serv: 'Pintura', isChecked: false },
    {serv: 'Revestimentos', isChecked: false },
    {serv: 'Serralheria', isChecked: false },
    {serv: 'Vidraçaria', isChecked: false }
  ];


  //Variáveis para acesso ao bd
  cadastro = {} as Cadastro;
  cadastros: Cadastro[] = [];


  ngOnInit(){
/*     this.formBusca = this.formBuilder.group({
      local: ['Selecione'],
      servico: ['Selecione'],
      pagto: ['Selecione']
    }),
    this.formCadastro = this.formBuilder.group({
      bdNome: "",
      bdNomeF: "",
      bdFone: "",
      bdRua: "",
      bdNumero: "",
      bdCidade: ""
    }) */
  }

  async login() {
    const modal = await this.ModalCtrl.create({
      component: LoginComponent,
      componentProps: {antNome: this.nome, antCpf: this.cpf }
    });
    await modal.present();
    modal.onWillDismiss().then((novoLogin: any) => {
      this.cpf = novoLogin.data.cpf;
      this.id = novoLogin.data.id;
    });
  };

  //Funções da tela de busca
  async buscar() {
    this.divResultShow();
    console.log(this.http.get('https://fixin-unifil.herokuapp.com/londrina')
      .toPromise()
      .then(response => this.dados = response.json()));
      await console.log(this.dados);
      /*       let dataUrl = "https://fixin-unifil.herokuapp.com/londrina";
    this.http.get(dataUrl).subscribe({
      next: data => {
        console.log(data);
        this.baseDados = data;
        console.log('Busca executada!');
        fetch(this.baseDados).then(res => res.json())
          .then(json => {
          this.dados = json;
        });
        var parametros: any = {dados: data};
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('Houve um erro!', this.errorMessage);
      }      
    });   */
  }

  //Funções da tela de cadastro
  salvar(){
    console.log(this.formCadastro);
    console.log(this.bdServ);
    console.log(this.bdPagto)
  }


  //Funções genéricas

  //Ainda em testes
  //Define se um cadastro será criado ou atualizado
  saveCadastro(form: NgForm) {
    if (this.cadastro.cpf !== undefined) {
      this.cadastroService.updateCadastro(this.cadastro).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.cadastroService.saveCadastro(this.cadastro).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obter todos os cadastros
  getCadastros() {
    this.cadastroService.getCadastros().subscribe((cadastros: Cadastro[]) => {
      this.cadastros = cadastros;
    });
  }

  // deleta o cadastro
  deleteCadastro(cadastro: Cadastro) {
    this.cadastroService.deleteCadastro(cadastro).subscribe(() => {
      this.getCadastros();
    });
  }

  // copia os dados para ser editado.
  editCadastro(cadastro: Cadastro) {
    this.cadastro = { ...cadastro };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getCadastros();
    form.resetForm();
    this.cadastro = {} as Cadastro;
  }


  //Funções para alternar entre divs
  divHomeShow() {
    document.getElementById("divCadastro").setAttribute("hidden",""); //esconde div cadastro
    document.getElementById("divBusca").setAttribute("hidden",""); //esconde div busca
    document.getElementById("divResult").setAttribute("hidden",""); //esconde div resultado
    document.getElementById("divHome").removeAttribute("hidden"); //mostra div home
  }

  divCadastroShow() {
    document.getElementById("divHome").setAttribute("hidden",""); //esconde div home
    document.getElementById("divBusca").setAttribute("hidden",""); //esconde div busca
    document.getElementById("divResult").setAttribute("hidden",""); //esconde div resultado
    document.getElementById("divCadastro").removeAttribute("hidden"); //mostra div cadastro
  }

  divBuscaShow() {
    document.getElementById("divHome").setAttribute("hidden",""); //esconde div home
    document.getElementById("divCadastro").setAttribute("hidden",""); //esconde div cadastro
    document.getElementById("divResult").setAttribute("hidden",""); //esconde div resultado
    document.getElementById("divBusca").removeAttribute("hidden"); //mostra div busca
  }

  divResultShow() {
    document.getElementById("divHome").setAttribute("hidden",""); //esconde div home
    document.getElementById("divBusca").setAttribute("hidden",""); //esconde div busca
    document.getElementById("divCadastro").setAttribute("hidden",""); //esconde div cadastro
    document.getElementById("divResult").removeAttribute("hidden"); //mostra div resultado
  }
}


//LIXEIRA
/*   locais: any = ["Rolandia","Londrina","Cambe","Ibipora","Maringa"];
  servicos: any = ["servacab","servarqt","servautr","servazul","servcarp","servdeco",
                   "servelet","servenge","servgess","servhidr","servinfr","servjard",
                   "servmarm","servmovl","servpint","servrevs","servserr","servvidr",];
  servicos: any = ["Acabamentos","Arquiteto(a)","Automação Residencial","Azulejista","Carpintaria",
                  "Decoração","Elétrica","Engenheiro(a) Civil","Gesso e Dry Wall","Hidráulica",
                  "Infraestrutura","Jardinagem","Marmoraria","Movelaria","Pintura",
                  "Revestimentos","Serralheria","Vidraçaria"
                  ];
  pagtos: any = ["pagtocc","pagtocd","pagtotr","pagtocq","pagtopx","pagtobt","pagtodn"]; */   