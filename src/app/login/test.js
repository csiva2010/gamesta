const bluetooth = require('node-bluetooth');
var nmap = require('libnmap');
const find = require( 'local-devices');
 
// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

device.listPairedDevices(console.log);
// nmap.discover(function(err, report) {
//     if (err) throw new Error(err);
  
//     for (var item in report) {
//       console.log(JSON.stringify(report[item]));
//     }
//   });


  find().then(devices => {
    console.log('Devices ---> \n', devices );
    /*
    [
      { name: '?', ip: '192.168.0.10', mac: '...' },
      { name: '...', ip: '192.168.0.17', mac: '...' },
      { name: '...', ip: '192.168.0.21', mac: '...' },
      { name: '...', ip: '192.168.0.22', mac: '...' }
    ]
    */
  })
   