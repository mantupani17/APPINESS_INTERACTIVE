const Events = require('events')
const fs = require('fs')

// creating object of EventEmitter
const eventsEmitter = new Events.EventEmitter()
let readval = 'Fuck you'
// Handler method
var readFileData = function(){
    const fileName = './user.txt'
    
    const readStream = fs.createReadStream(fileName)

    readStream.on('error', function(err){
        console.log(err)
    })

    readStream.on('data', function(data){
        readval = ', Fuck you '+data.toString();
        console.log(data.toString())
    })

    readStream.on('end', function(){
        console.log('End File Reading...')
        eventsEmitter.emit('writeData');
    })
    
}

// another handler to create a file and copy
const writeFileData = function(){
    try {
        const writeStream = fs.createWriteStream('test.txt', {flags:'a'})
        writeStream.on('error', function(err){
            console.log(err)
        })
        writeStream.write(readval)
    } catch (error) {
        console.log(error)
    }
}

eventsEmitter.on('writeData', writeFileData)


// Binding Event to Handler here event is readData
eventsEmitter.on('readData' , readFileData)

// triggering the event by event name
eventsEmitter.emit('readData');