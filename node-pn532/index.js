// pn532 using i2c
var pn532 = require('pn532');
var i2c = require('i2c');

const address = 0x24;
//const wire = new i2c(pn532.I2C_ADDRESS, { device: '/dev/i2c-1' });
var wire = new i2c(address, { device: '/dev/i2c-1', debug: false });
//const bus = i2c.openSync(1);
var rfid = new pn532.PN532(wire);

rfid.on('ready', function () {
  console.log('Listening for a tag scan...');

  rfid.on('tag', function (tag) {
    if (tag) {
      console.log('tag : ', tag.uid);

      console.log('Authenticating...');
      rfid.authenticateBlock(tag.uid).then(function () {
        console.log('Reading tag data...');
        rfid.readData().then(function (data) {
          console.log('Tag data:', data);

          var records = ndef.decodeMessage(data.toJSON());
          console.log(records);
        });
      });
    }
  })
});
