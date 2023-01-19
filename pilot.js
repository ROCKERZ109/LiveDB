const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:T971H562EDlRx04c@db-mongodb-blr1-77748-8be691c1.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-blr1-77748';
const client = new MongoClient(url);

async function dbConnection() {
  let result = await client.connect();
  let db = result.db('admin');
  return db.collection('pilots');
}
// dbConnection().then((resp) => {
//   resp.find({'name':'Ayusshi Joshi'}).toArray().then((data) => {
//     console.warn(data);
//   });
// })
console.log('Data base is successfully setup');

module.exports = dbConnection;