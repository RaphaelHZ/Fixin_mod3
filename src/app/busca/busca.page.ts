import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {

  constructor(public router: Router) { }
  dados: any;
  local: String;
  servico: String;

  ngOnInit() {
  }

  buscar() {
    var parametros: any = {escolhaLocal: this.local, escolhaServico: this.servico};
    this.router.navigate(['/ResultPage'], {queryParams: parametros})
  }  

}
