import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { db } from '../../assets/db';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  dados: any = db.bddados;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let escolhaLocal = params["escolhaLocal"];
      let escolhaServico = params["escolhaServico"];
    });
  }
}
