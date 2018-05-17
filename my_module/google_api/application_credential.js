var config = {
  projectId: 'mybasball',
  keyFilename: '/path/to/keyfile.json'
};

var datastore = require('@google-cloud/datastore')(config);
var storage = require('@google-cloud/storage')(config);
