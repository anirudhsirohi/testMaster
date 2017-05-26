

var mongo = require('mongodb');



var Server = mongo.Server,

    Db = mongo.Db,

    BSON = mongo.BSONPure;



var server = new Server('localhost', 27017, {auto_reconnect: true});

db = new Db('fwmanagedb', server);



db.open(function(err, db) {

    if(!err) {

        console.log("Connected to 'fwmanagedb' database");

        db.collection('rules', {strict:true}, function(err, collection) {

            if (err) {

                console.log("The 'Rules' collection doesn't exist. Creating it with sample data...");

                populateDB();

            }

        });

    }

});

exports.getRules = function(req, res) {
    console.log("Getting 'Rules' collection data");

    db.collection('rules', function(err, collection) {

        collection.find().toArray(function(err, items) {
    console.log("Got 'Rules' collection data");
            res.send(items);
        });
    });

};

exports.searchRules= function(req, res) {

    res.send([{Id:1, name:"rule1", Source:"Server1", Destination:"Server2", Port:443}, {Id:2, name:"rule2", Source:"Server3src", Destination:"Server24dest", Port:443}]);

};


exports.findById = function(req, res) {

    var id = parseInt(req.params.id);

    console.log('Retrieving rules: ' + id);

    db.collection('rules', function(err, collection) {

        collection.findOne({Id:id}, function(err, item) {

            res.send(item);

        });

    });

};


exports.addRule = function(req, res) {

    var wine = req.body;

    console.log('Adding rule: ' + JSON.stringify(rule));

    db.collection('rules', function(err, collection) {

        collection.insert(rule, {safe:true}, function(err, result) {

            if (err) {

                res.send({'error':'An error has occurred while adding rule'});

            } else {

                console.log('Success: ' + JSON.stringify(result[0]));

                res.send(result[0]);

            }

        });

    });

}


exports.updateRule = function(req, res) {

    var id = req.params.id;

    var wine = req.body;

    console.log('Updating Rule: ' + id);

    console.log(JSON.stringify(rule));

    db.collection('wines', function(err, collection) {

        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {

            if (err) {

                console.log('Error updating rule: ' + err);

                res.send({'error':'An error has occurred'});

            } else {

                console.log('' + result + ' document(s) updated');

                res.send(rule);

            }

        });

    });

}


exports.deleteRule = function(req, res) {

    var id = parseInt(req.params.id);

    console.log('Deleting rule: ' + id);

    db.collection('rules', function(err, collection) {

        //rule=collection.find({Id:id});
        //console.log(rule);
//collection.removeOne({Id:'id'}); 
 //res.send(req.body);

        collection.remove({Id:id}, {safe:true}, function(err, result) {

            if (err) {

                res.send({'error':'An error has occurred - ' + err});

            } else {
                console.log('' + result + ' document(s) deleted');

                res.send(req.body);

            }

        });

    });

}


var populateDB = function() {

    var rules = [

    {Id:1, name:"rule1", Source:"Server1", Destination:"Server2", Port:443 },
    {Id:2, name:"rule2", Source:"Server3src", Destination:"Server24dest", Port:443}];

    db.collection('rules', function(err, collection) {
    collection.insert(rules, {safe:true}, function(err, result) {});

    });



};


