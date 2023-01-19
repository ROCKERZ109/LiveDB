const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:T971H562EDlRx04c@db-mongodb-blr1-77748-8be691c1.mongo.ondigitalocean.com/passenger?authSource=admin&replicaSet=db-mongodb-blr1-77748&tls=true';
const client = new MongoClient(url);

async function passengers() {
  let result = await client.connect();
  let db = result.db('passenger');
  return db.collection('passengers');
}
passengers().then((resp) => {
  resp.find({}).toArray().then((data) => {
    console.warn(data);
  });
})
console.log('Data base is successfully setup');

module.exports = passengers;