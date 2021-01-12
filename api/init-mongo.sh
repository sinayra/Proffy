#!/bin/bash
echo "========================================================================"
echo "MongoDB User: \"$MONGODB_USERNAME\""
echo "MongoDB Password: \"$MONGODB_PASSWORD\""
echo "MongoDB Database: \"$MONGODB_DATABASE\""
echo "MongoDB Test Database: \"$MONGODB_TEST_DATABASE\""
echo "========================================================================"

mongo <<EOF
use $MONGODB_DATABASE
db.createCollection('dummy');
db.dummy.insert({ foo: 'bar'});
db.createUser({
  user: '$MONGODB_USERNAME',
  pwd: '$MONGODB_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGODB_DATABASE'
  }]
});
db.dummy.drop();

use $MONGODB_TEST_DATABASE
db.createCollection('dummy');
db.dummy.insert({ foo: 'bar'});
db.createUser({
  user: '$MONGODB_USERNAME',
  pwd: '$MONGODB_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGODB_TEST_DATABASE'
  }]
});
db.dummy.drop();
EOF
