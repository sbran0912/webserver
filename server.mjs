import fs from 'node:fs';
import express from 'express';
import { stringify } from 'csv-stringify/sync';
import Datastore from "nedb-promises";

const app = express();
app.use(express.json());

//Statisches Verzeichnis setzen
app.use(express.static("public"));

app.use((req, res, next) => {
    console.log(`Zugriff am: ${new Date().toLocaleString()}`);
    next();
});

app.get('/api', (req, res, next) => {
    res.send({ status: "Get auf Server bearbeitet.", user: "Stefan Brandner" });
});

app.post('/api', (req, res, next) => {
    console.log('Post empfangen: ', req.body);
    res.send({ status: "Post auf Server empfangen. ", user: "Stefan Brandner", erhalten: req.body });
});

app.post('/apicsv', (req, res, next) => {
    let data = stringify(req.body);
    console.log('Anfrage empfangen nach stringify: ', data);
    fs.writeFileSync('public/daten.txt', data);
    res.send({ status: "Post auf Server empfangen.", user: "Stefan Brandner", erhalten: req.body });
});

app.get('/apicsv', (req, res, next) => {
    console.log('CSV lesen mit Bordmitteln ...');
    let output = fs.readFileSync('public/daten.txt','utf-8');
    let rows = output.split('\n');  
    let data = [];
    rows.forEach((row) => {
        let cols = row.split(',');
        data.push(cols);
    })
    
    console.log(data);
    res.send({ status: "Get auf Server bearbeitet.", user: "Stefan Brandner", antwort: data });
});

app.get('/apidb', async (req, res, next) => {
    console.log('DB auslesen ...');
    const datastore = Datastore.create("nedb.db");

    let data = await datastore.find({system: 'andromeda'})
    data.forEach(row => {
        console.log(row.planet, row.system);
    });
    console.log(data);
    res.send({ status: "Get auf Server bearbeitet.", user: "Stefan Brandner", antwort: data });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080')
});
