import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultadosComponent } from '../resultados/resultados.component';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {

  constructor(private ModalCtrl: ModalController) { }
  dados: any;
  local: String;
  servico: String;

  ngOnInit() {
  }

  async buscar() {
    const modal = await this.ModalCtrl.create({
      component: ResultadosComponent,
      componentProps: {escolhaLocal: this.local, escolhaServico: this.servico, escolhaDados: this.dados }
    });

    await modal.present();
  };

}
