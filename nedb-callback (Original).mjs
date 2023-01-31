
import nedb from "nedb";
const db = new nedb({ filename: "nedb.db", autoload: true });
//db.insert({planet: 'Jupiter', system: 'solar'});

db.find({system: 'solar'}, (err, data) => {
    console.log(data);
});

db.find({system: 'andromeda'}, (err, data) => {
    console.log(data);
});