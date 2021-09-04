import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  dados: any;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let dados = params["dados"];
      console.log(dados);
    });


    fetch(this.dados).then(res => res.json())
    .then(json => {
    this.dados = json;
    });
  }
}
