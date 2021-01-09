const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://hgqctivglctrdu:c23a0b028a91e3dea13d1ec4c724e93902600984e86b26238e485a753db93311@ec2-34-192-122-0.compute-1.amazonaws.com:5432/d66imi1ctsjt9j',
    ssl: {
        rejectUnauthorized: false
    }
});


client.connect();

const dbQuery = async () => {
    const result = await client.query('select * from score ORDER BY score DESC LIMIT 5');
    return JSON.stringify(result.rows);
}

// const insertQuery =  "INSERT INTO score (id, name, score) VALUES(nextval('score_id_seq'), 'Lena', 5)";
//     client.query(insertQuery, (err, result) => {
//     if (err) throw err;
//     });
    

const insertDB = async (inputName, inputScore) => {
    await client.query({
        text: "INSERT INTO score (id, name, score) VALUES(nextval('score_id_seq'), $1, $2);",
        values: [inputName, inputScore]
    });
}

exports.client = client;
exports.dbQuery = dbQuery;
exports.insertDB = insertDB;


