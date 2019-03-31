# Tensorflow.js Playground

A basic project scaffold to tryout [Tensorflow.js](https://js.tensorflow.org/) in Node.js and in the browser.

## Installation

    npm install
    
__Make sure it works__

    node lib-tensorflow/basic-example.js
    node lib-tensorflow/polynomial-fit.js
    

## Start Server

    npm start
    
which is same as

    node ./bin/www
    

A browser UI with links to run experiments can be found at [http://localhost:3000](http://localhost:3000)

## Adding new examples

### Node (server side) examples

- Add new "experiment" in  `lib-tensorflow/`
- (optional) Link a route to it in `routes/node-examples.js`
- (optional) Add a link to the hompage `routes/index.js`

## Known Issues

For some reason, the error below suddenly started to appear, when starting the server. 
It has no discernable effect on the functionality though.

Can safely be ignored.


```bash
Registration of backend tensorflow failed
Error: dlopen(FULL_PATH_TO_FOLDER_HERE/tensorflow-nodejs-playground/node_modules/@tensorflow/tfjs-node-gpu/build/Release/tfjs_binding.node, 1): Library not loaded: @rpath/libtensorflow_framework.so
  Referenced from: /Users/anders/WebstormProjects/tensorflow-nodejs-playground/node_modules/@tensorflow/tfjs-node-gpu/build/Release/libtensorflow.so
  Reason: image not found
    at Object.Module._extensions..node (module.js:664:18)
    at Module.load (module.js:554:32)
    at tryModuleLoad (module.js:497:12)
    at Function.Module._load (module.js:489:3)
    at Module.require (module.js:579:17)
    at require (internal/module.js:11:18)
    at bindings (/Users/anders/WebstormProjects/tensorflow-nodejs-playground/node_modules/bindings/bindings.js:84:48)
    at /Users/anders/WebstormProjects/tensorflow-nodejs-playground/node_modules/@tensorflow/tfjs-node-gpu/dist/index.js:46:60
    at Environment.registerBackend (/Users/anders/WebstormProjects/tensorflow-nodejs-playground/node_modules/@tensorflow/tfjs-core/dist/environment.js:234:27)
    at Object.<anonymous> (/Users/anders/WebstormProjects/tensorflow-nodejs-playground/node_modules/@tensorflow/tfjs-node-gpu/dist/index.js:45:8)
```

## Screenshot of basic example

![Screenshot of basic example](notes/assets/basic-example-screenshot.png?s=640)