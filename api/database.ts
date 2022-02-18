// Esse aqui é o conecta banco, ele é bem parecido com o do Rafael em PHP na ETEC 

import { createPool, Pool } from 'mysql2/promise'; //Aqui ta pegando o CreatePool (novo banco), do mysql nodejs

export async function connect(): Promise<Pool> {
    const connection = await createPool({ //criar conexão 
        host: 'localhost', //ip
        user: 'root', //nome do usuário
        // password: , //senha (se tiver)
        database: 'db_wm', //nome do banco
        connectionLimit: 10
    });
    return connection; //retorna a conexão 
}

