import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'nexa',

    // Para otimizar perfomance e vitar erros
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;