# Learning Lights

## Requirements

This set up has only been tested on unix machines.

* Node
* MongoDB

Navigate to the root directory of the application and run (from terminal):

* ```npm install```

You should see node dependencies start to be installed.

Now run:

* ``` bower install ```

Again dependencies should be installed.

The next step is to start running MongoDB, open a new terminal tab and run:

* ``` mongod```

Now in the previous tab run:

* ``` gulp ```

You should see project files start to be built with no errors.

Now open an additional tab and run:

* ``` npm start ```

You should see the following:

* ``` Express server listening on port 3000 ```
* ``` We are connected ```

In the browser navigate to:

* ```localhost:3000```

You should see the learning lights home page.















