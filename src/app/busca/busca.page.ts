import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {
  private local;
  private servico;
  constructor(public router: Router) {
    
  }
  dados: any;
  locais: any = ["Rolândia","Londrina","Cambé","Ibiporã","Maringá"];
  servicos: any = ["Acabamentos","Arquiteto(a)","Automação Residencial","Azulejista","Carpintaria",
                  "Decoração","Elétrica","Engenheiro(a) Civil","Gesso e Dry Wall","Hidráulica",
                  "Infraestrutura","Jardinagem","Marmoraria","Movelaria","Pintura",
                  "Revestimentos","Serralheria","Vidraçaria"
                  ];


  ngOnInit() {
  }

  buscar() {
    var parametros: any = {escolhaLocal: this.local, escolhaServico: this.servico};
    this.router.navigate(['./result'], {queryParams: parametros});
  }
  
}
