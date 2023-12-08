// /* eslint-disable */

// const YeeDiscovery = require('..').Discovery

// let discoveryService = new YeeDiscovery()

// discoveryService.on('started', () => {
//   console.log('** Discovery Started **')
// })

// discoveryService.on('didDiscoverDevice', (device) => {
//   console.log(device)
// })

// discoveryService.listen()

// /*
//     {
//         Location: 'yeelight://192.168.x.x:55443',
//         id: '0x000000000xxxxx',
//         model: 'bslamp1',
//         support:
//         'get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name',
//         power: 'off',
//         bright: '1',
//         color_mode: '1',
//         ct: '2752',
//         rgb: '16750592',
//         hue: '36',
//         sat: '100'
//     }
// */

const { YeeLight, YeeDiscovery } = require('yeelight');

// Morse code representation of "Happy Holidays"
const morseCodeMessage = {
  'H': '....',
  'A': '.-',
  'P': '.--.',
  'Y': '-.--',
  ' ': ' ',
  'O': '---',
  'L': '.-..',
  'I': '..',
  'D': '-..',
  'S': '...',
  'E': '.'
};

// Function to control the Yeelight bulb based on Morse code
async function writeInMorseCode(message) {
  const discovery = new YeeDiscovery();
  const devices = await discovery.discover(1000); // Discover devices within 1 second

  if (devices.length === 0) {
    console.log('No Yeelight bulbs found on the network.');
    return;
  }

  const bulb = new YeeLight(devices[0]);

  for (let i = 0; i < message.length; i++) {
    const character = message.charAt(i).toUpperCase();
    const morseSymbol = morseCodeMessage[character];

    if (morseSymbol) {
      await blinkMorseSymbol(bulb, morseSymbol);
    } else {
      await delay(1000); // Wait for 1 second for space between words
    }
  }

  // Close connection or perform cleanup tasks if needed
}

// Function to blink Morse code symbol
async function blinkMorseSymbol(bulb, symbol) {
  for (let i = 0; i < symbol.length; i++) {
    const duration = (symbol[i] === '.') ? 200 : 600; // Dot duration: 200ms, Dash duration: 600ms

    await bulb.toggle(); // Turn on/off the bulb to represent dot or dash
    await delay(duration);
    await bulb.toggle();
    await delay(200); // Pause between dots/dashes within a character
  }

  await delay(600); // Pause between characters
}

// Function for delaying execution
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the Morse code function
writeInMorseCode('Happy Holidays');