import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cadastro } from '../models/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
    
  url = 'http://localhost:3000/cadastros'; // api rest fake

  // injetando o HttpClient

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os cadastros
  getCadastros(): Observable<Cadastro[]> {
    return this.httpClient.get<Cadastro[]>(
      this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um cadastro pelo cpf
  getCadastroByCpf(cpf: number): Observable<Cadastro> {
    return this.httpClient.get<Cadastro>(
      this.url + '/' + cpf)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um cadastro
  saveCadastro(cadastro: Cadastro): Observable<Cadastro> {
    console.log(cadastro);
    return this.httpClient.post<Cadastro>(
      this.url, 
      JSON.stringify(cadastro), 
      this.httpOptions)
      .pipe(
        retry(4),
        catchError(this.handleError)
      )
  }

  // atualiza um cadastro
  updateCadastro(cadastro: Cadastro): Observable<Cadastro> {
    console.log(cadastro);
    return this.httpClient.put<Cadastro>(
      this.url + '/' + cadastro.cpf, 
      JSON.stringify(cadastro), 
      this.httpOptions)
      .pipe(
        retry(4),
        catchError(this.handleError)
      )
  }

  // deleta um cadastro
  deleteCadastro(cadastro: Cadastro) {
    return this.httpClient.delete<Cadastro>(
      this.url + '/' + cadastro.cpf, 
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

/* 
Uso do client
this.httpClient.get<Cadastro[]>(this.url)
this.httpClient.post<Cadastro>(this.url, JSON.stringify(cadastro), this.httpOptions)
this.httpClient.put<Cadastro>(this.url + '/' + cadastro.cpf, JSON.stringify(cadastro), this.httpOptions)
this.httpClient.delete<Cadastro>(this.url + '/' + cadastro.cpf, this.httpOptions) 

Server Json
D:\...\FixIn_mod3\src\assets>json-server --watch cadastros.json

Rodando a pagina
D:\...\FixIn_mod3>ng serve --open

http://localhost:3000/cadastros
*/