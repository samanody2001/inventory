require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { mongoClient } = require('./mongo');
const mongodb = require('mongodb').MongoClient;
const app = express();
const csvtojson = require('csvtojson');
let url = 'mongodb://Samanody:%40Y145145@localhost:27017/';
csvtojson()
  .fromFile('inventory.csv')
  .then((csvData) => {
    console.log(csvData);
    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;
        client
          .db('SE')
          .collection('category')
          .insertMany(csvData, (err, res) => {
            if (err) throw err;
            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });
