# Log mongodb queries in real time
I wrote this because I wanted a live stream of mongodb queries.



## TO MAKE IT WORK READ THIS!

First, you need to tell mongo to log all your queries.
To do this, open up a mongo shell (usually by typing 'mongo' into the command line), and run the following commands
```
use YOUR_DB_NAME
db.setProfilingLevel(2)
```

Second clone the repo, and then install dependencies:
```
git clone https://github.com/dtruel/mongo-live-logger
cd mongo-live-logger
npm install
```

Third, YOU NEED TO EDIT THE CONNECTION URL IN INDEX.JS TO POINT TO YOUR DATABASE.

To run, just cd into the directory and do

```
node index.js
```

I just whipped this up pretty quickly so there may be bugs.  Please let me know (by the way, I this does not work with node 7 on windows as of right now)

## Additional prerequisite:(my experience)

need to run this under administrator mode power shell window:
npm install --global --production windows-build-tools
which will install python 2.7 among other things, which is neede by node-gyp.

also for node-gyp to build, you need to use vs installer to install the "Visual C++ build tools" Workload matching your latest visual studio version installed.

then finally you are abel to run "npm install" and "node index.js"
