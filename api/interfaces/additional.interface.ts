export interface Additionals { //exportando uma interface
    id?: Number;
    image: String;
    name: String;
    price: Number;
    description: String;
    status: Boolean;
    IDchoice: Number;
}

/*Interface nada mais é do que os atributos da tabela do banco,
ele meio que prepara a API, pra quais dados ela vai receber, 
e se for diferente ela da um erro*/

/*Só existem atributos: 
String
Number 
Date 
Boolean*/