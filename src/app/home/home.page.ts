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
  }

  async login() {
    const modal = await this.ModalCtrl.create({
      component: LoginComponent,
      componentProps: {antNome: this.nome, antCpf: this.cpf }
    });
    await modal.present();
    modal.onWillDismiss().then((novoLogin: any) => {
      this.nome = novoLogin.data.nome;
      this.cpf = novoLogin.data.cpf;
      this.id = novoLogin.data.id;
    });
  };

  //Função da tela de busca
  async btnBuscar() {
    //SELECT * FROM tblAnun WHERE anuPreco BETWEEN menorPreco AND maiorPreco AND anuSerId = $; 
    //acho que faz a chamada do sql da API e envia os 3 valores, na API q é montado o SQL
    //depois trata o retorno aqui
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

  //Função para gerar o orçamento e ligar para o prestador
  btnLigar(){
    //INSERT INTO tblOrcam VALUES ($,$,$,$,$,1)
    //INSERT INTO tblAval VALUES ($,$,$,$)
    //Usar o número do contato para ligar para o prestador
  }

  //Funções da salvar os dados pessoais
  btnSalvarUsu(){
    //UPDATE tblUsu SET usuNome = $, usuEmail = $, usuCelular = $, usuCEP = $ WHERE usuId = $
    console.log(this.formCadastro);
    console.log(this.bdServ);
    console.log(this.bdPagto)
  }

  //Função para ajustar valores do slider
  btnPreco(){
    //SELECT MIN(anuPreco) AS menorPreco FROM tblAnunc WHERE anuSerId = $;
    //SELECT MAX(anuPreco) As maiorPreco FROM tblAnunc WHERE anuSerId = $;
  }
  
  //Função para salvar os dados profissionais
  btnSalvarPro(){
    //INSERT INTO tblPrest VALUES ($,$,$,1)
  }

  //Função para salvar o anúncio
  btnSalvarAnu(){
    //INSERT INTO tblAnunc VALUES ($,$,$,$,$,$,1)
  }

  //Função para excluir o anúncio
  btnExcluirAnu(){
    //UPDATE tblAnunc SET anuStatus = 0, anuTimestamp = $ WHERE anuId = $
  }

  btnSalvarAva(){
    //UPDATE tblAval SET avaNota = $, avaTimestamp = $ WHERE avaOrcId = $ 
  }

  //Funções genéricas

  //Ainda em testes
  //Define se um cadastro será criado ou atualizado
/*   saveCadastro(form: NgForm) {
    if (this.cadastro.cpf !== undefined) {
      this.cadastroService.updateCadastro(this.cadastro).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.cadastroService.saveCadastro(this.cadastro).subscribe(() => {
        this.cleanForm(form);
      });
    }
  } */

  // Chama o serviço para obter todos os cadastros
/*   getCadastros() {
    this.cadastroService.getCadastros().subscribe((cadastros: Cadastro[]) => {
      this.cadastros = cadastros;
    });
  } */

  // deleta o cadastro
/*   deleteCadastro(cadastro: Cadastro) {
    this.cadastroService.deleteCadastro(cadastro).subscribe(() => {
      this.getCadastros();
    });
  } */

  // copia os dados para ser editado.
/*   editCadastro(cadastro: Cadastro) {
    this.cadastro = { ...cadastro };
  } */

  // limpa o formulario
/*   cleanForm(form: NgForm) {
    this.getCadastros();
    form.resetForm();
    this.cadastro = {} as Cadastro;
  } */


  //Funções para alternar entre divs
  divHide() {
    document.getElementById("divHome").setAttribute("hidden",""); //esconde div Home
    document.getElementById("divBusca").setAttribute("hidden",""); //esconde div Busca
    document.getElementById("divResult").setAttribute("hidden",""); //esconde div Resultados
    document.getElementById("divOrcam").setAttribute("hidden",""); //esconde div Orcamento
    document.getElementById("divCadUsu").setAttribute("hidden",""); //esconde div Cadastro Usuario
    document.getElementById("divMOrc").setAttribute("hidden",""); //esconde div Meus Orçamentos
    document.getElementById("divAva").setAttribute("hidden",""); //esconde div Avaliaçao
    document.getElementById("divCadPro").setAttribute("hidden",""); //esconde div Cadastro Profissional
    document.getElementById("divAnu").setAttribute("hidden",""); //esconde div Meus Anuncios
    document.getElementById("divCadAnu").setAttribute("hidden",""); //esconde div Cadastro Anuncio
  }

  divHomeShow() {
    this.divHide();
    document.getElementById("divHome").removeAttribute("hidden"); //mostra div home
  }

  divBuscaShow() {
    this.divHide();
    document.getElementById("divBusca").removeAttribute("hidden"); //mostra div busca
  }

  divResultShow() {
    this.divHide();
    // SELECT * FROM tblAnunc WHERE anuSerId = $ AND 
    /* CRIAR LISTA COM O RESULTADO DA CONSULTA NA TABELA tblAnunc */
    document.getElementById("divResult").removeAttribute("hidden"); //mostra div resultado
  }

  divOrcamShow() {
    this.divHide();
    /* VINCULAR DADOS DO REGISTRO DA TABELA tblAnunc AOS CAMPOS*/
    document.getElementById("divOrcam").removeAttribute("hidden"); //mostra div Orcamento
  }

  divCadUsuShow() {
    this.divHide();
    /* CARREGAR DADOS DA TABELA tblUsu DO BD */
    document.getElementById("divCadUsu").removeAttribute("hidden"); //mostra div Cadastro Usuario
  }

  divMOrcShow() {
    this.divHide();
    /* CARREGAR DADOS DOS ORCAMENTOS DO USUARIO DO BD (SELECT by ID)*/
    document.getElementById("divMOrc").removeAttribute("hidden"); //mostra div Meus Orcamentos
  }

  divAvaShow() {
    this.divHide();
    /* CARREGAR DADOS DA TABELA tblAval DO ORCAMENTO DO BD */
    /* SQL SELECT FROM tblAval WHERE avaOrcId = ? */
    document.getElementById("divAva").removeAttribute("hidden"); //mostra div Avaliacao
  }

  divCadProShow() {
    this.divHide();
    /* CARREGAR DADOS PROFISSIONAIS DO USUARIO DO BD */
    /* SQL SELECT FROM tblPrest WHERE preId = ? */
    document.getElementById("divCadPro").removeAttribute("hidden"); //mostra div Cadastro Profissional
  }

  divAnuShow() {
    this.divHide();
    /* CARREGAR DADOS DOS ANUNCIOS DO USUARIO DO BD */
    document.getElementById("divAnu").removeAttribute("hidden"); //mostra div Meus Anuncios
  }

  divCadAnuShow() {
    this.divHide();
    /* INICIA EM BRANCO */
    document.getElementById("divCadAnu").removeAttribute("hidden"); //mostra div Cadastro Anuncio
  }

} 