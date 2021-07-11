import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  listaServicos: any = [
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

  listaPagto: any = [
    {pagto: 'Cartão Crédito', isChecked: false },
    {pagto: 'Cartão Débito', isChecked: false },
    {pagto: 'Transferência', isChecked: false },
    {pagto: 'Cheque', isChecked: false },
    {pagto: 'PIX', isChecked: false },
    {pagto: 'Boleto', isChecked: false },
    {pagto: 'Dinheiro', isChecked: false }
  ];

  antNome: String;
  antNomeFantasia: String;
  antTelefone: String;
  antNomeCadastroEndereco: String;    
  antNumeroCep: String;
  antNomeRua: String;
  antNumeroEndereco: String;
  antBairro: String;
  antCidade: String;
  antEstado: String;

  constructor() { }

  ngOnInit() {

  }

  salvar(){

  }
}
