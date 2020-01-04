const events = require('events')
const fs = require('fs')

const eventEmitter = new events.EventEmitter()




// start bidding handler
const startBidding = function(){
    console.log('Bidding Started.....')
    let maxBid = arguments[0]
    for(let i=0;i<arguments.length;i++){
        if(maxBid > arguments[i]){
            maxBid = arguments[i]
        }
    }
    eventEmitter.emit('sendEmailsToBidderAndOwner', maxBid )
}

// start sending email to those bidder and owner
const sendMailToBidderAndWinner = function(){
    console.log('Sending emails to '+arguments[0])
    eventEmitter.emit('saveBidDetails', arguments[0] )
}

// add bid data into file
const writeBidDataintoFile = function(){
    console.log('Save bid details Bid no:'+arguments[0])
    try {
        const writeStream = fs.createWriteStream('bidDetails.txt' , {flags:'a'})
        writeStream.write('Bid No:'+arguments[0]+"\n")
    } catch (error) {
        console.log(error)
    }
}

// create an activity for bid

// Bid event
eventEmitter.on('startBid' , startBidding)
eventEmitter.on('sendEmailsToBidderAndOwner' , sendMailToBidderAndWinner)
eventEmitter.on('saveBidDetails' , writeBidDataintoFile)



// event fire

let count = 0 


const timeoutObj = setTimeout(() => {
    console.log('timeout beyond time '+count);
    clearInterval(intervalObj);
  }, 500+100);
  
  const immediateObj = setImmediate(() => {
    console.log('immediately executing immediate');
  });
  
  const intervalObj = setInterval(() => {
    console.log('interviewing the interval '+ count++);
    eventEmitter.emit('startBid', 5 , 10 , 1, -1, -5, 0, -10, -10.5)
  }, 100);
  
//   clearTimeout(timeoutObj);
//   clearImmediate(immediateObj);
//   clearInterval(intervalObj);