import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

const client = Stitch.initializeDefaultAppClient('6452de56baad5f66b9515b52');

client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`Logged in as anonymous user with ID: ${user.id}`);
}).catch(err => {
  console.error(`Failed to log in anonymously: ${err}`);
});


const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('myDatabase');
const collection = db.collection('myCollection');


collection.insertOne({ name: 'John', age: 30 }).then(result => {
    console.log(`Inserted document with _id: ${result.insertedId}`);
  }).catch(err => {
    console.error(`Failed to insert document: ${err}`);
  });
  
  collection.find({}).toArray().then(docs => {
    console.log(`Found documents: ${docs}`);
  }).catch(err => {
    console.error(`Failed to find documents: ${err}`);
  });
  