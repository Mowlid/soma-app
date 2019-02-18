const Mongodb = require('mongodb');
const MongoClient = Mongodb.MongoClient;

let _db;
const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://overtimes:lkPSVcDT8XOoSvQU@cluster0-lbr9c.mongodb.net/overtime?retryWrites=true')
        .then(client => {
            console.log('connected')
            _db = client.db();
            callback();
        })
        .catch(error => {
            console.log(error)
        })
}
const getDB = () => {
    if(_db){
        return _db
    }

    throw "No database connection found"
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;