//Edit this url and db name to point to your mongo db!
var mongoUrl = 'mongodb://localhost:27017/';
var db = 'testdb';



var MongoClient = require("mongodb").MongoClient;
var async = require('asyncawait/async');
var await = require('asyncawait/await');


async(function () {
    try {
        console.log("using connection URL: " + mongoUrl);
        console.log("If this is wrong, change it in index.js.  If your not seeing anything probaly need to change it")
        var dbCon = await(MongoClient.connect(mongoUrl));
        process.on('SIGINT', function () { 
            dbCon.close();
            console.log('Closed Database Connection');
            process.exit();
        })
        var Profile = dbCon.db(db).collection('system.profile');
        var items;
        var lastTime = new Date();
        while (true) { 
            items = await(Profile.find({ ts: { $gte: lastTime }, junkField: { $ne: "SDLKJFJ" } }).toArray());  // this query itself with junkField
            lastTime = new Date();
            items.forEach((item) => {
 		      // console.log(JSON.stringify(item, null, "  "));  // for debug
                if (item.query && item.query.filter && !item.query.filter.junkField ||  
					item.command && (!item.command.filter || (item.command.filter && !item.command.filter.junkField))
				) { 	//support query and aggregate command 
						console.log("collection:" + item.ns + "\nop:" + item.op + "\ncontent: ", item.query ? JSON.stringify(item.query, null, "  ") : JSON.stringify(item.command, null, "  ") + "\n");
				  }
			});
            await(pause());
        }
    } catch (e) {
        console.trace(e);
    }
    dbCon.close();
})();

function pause(time) {
    time = time || 1000;
    return new Promise((resolve) => {
        setTimeout(_ => resolve(), time);
    })
}
