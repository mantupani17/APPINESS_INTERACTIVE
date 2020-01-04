const events = require('events')

const function1 = function(){
    console.log('function 1')
}


const function2 = function(){
    console.log('function 2')
}


const function3 = function(){
    console.log('function 3')
}

const eventEmitter = new events.EventEmitter()

eventEmitter.on('events' , function1)
eventEmitter.on('events' , function2)
eventEmitter.on('events' , function3)


eventEmitter.emit('events')
