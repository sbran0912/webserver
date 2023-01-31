
import Datastore from "nedb-promises";
const datastore = Datastore.create("nedb.db");


// mit  Toplevel-Await

let result = await datastore.insert({planet: 'r2d2', system: 'andromeda'});
console.log(result);

let data = await datastore.find({system: 'andromeda'})
console.log(data);
data.forEach(row => {
    console.log(row.planet, row.system);
});

let deleted = await datastore.deleteMany({planet: 'r2d2'});
console.log(deleted);