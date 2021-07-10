import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @Input() escolhaLocal: String;
  @Input() escolhaServico: String;
  @Input() dados: any;

  /* entNome = new FormControl('', Validators.required);
  entCPF = new FormControl('', Validators.required); */


  constructor(private modalCrtl: ModalController) { }

  fecharResultados(){
    this.modalCrtl.dismiss();
  }

  salvarLogin(){
    /* let novobusca = {"novoLocal": this.escolhaLocal.valueOf, "novoServico": this.escolhaServico.valueOf};
    this.modalCrtl.dismiss(novobusca); */
  }

  ngOnInit() {}

}
