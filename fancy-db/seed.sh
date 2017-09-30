mongoimport --host localhost --port 27017 --db fancy --collection currencies --file ./seed-collections/currencies.json --jsonArray
mongoimport --host localhost --port 27017 --db fancy --collection languages --file ./seed-collections/languages.json --jsonArray
mongoimport --host localhost --port 27017 --db fancy --collection timeZones --file ./seed-collections/timeZones.json --jsonArray