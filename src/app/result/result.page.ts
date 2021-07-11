import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  dados: any;
  escolhaLocal: any;
  escolhaServico: any;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let escolhaLocal = params["escolhaLocal"];
      let escolhaServico = params["escolhaServico"];
      console.log(escolhaLocal);
      console.log(escolhaServico);
    });
    fetch('./assets/db.json').then(res => res.json())
    .then(json => {
    this.dados = json;
    });
  }

}
