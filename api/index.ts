import { App } from './app'; //Importando App
import { connect } from './database';


//É a main do projeto, ele vai abrir uma função asyncrona do App que ta importando, na porta 5000
async function main() {
    const app = new App(5000); 
    await app.listen();
}

main(); 