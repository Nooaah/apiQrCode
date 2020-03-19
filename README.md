# apiQrCode

In order to avoid complicated and insecure passwords in the future, I made an Open-Source web application in node.js that works with a QR code system : You have to flash the code with your phone, then, you are connected and your website is unlocked. In the future, an application in react-native will be developed. This will allow you to have all your accounts on your android and iOS smartphone, and unlock it simply by flashing the QR code.

## Installation

Use [Node.js](https://nodejs.org/en/) to install apiQrCode.

```bash
npm i #for install all dependencies
node index.js #run server
```

Create a database and tables as defined in the code and modify the port according to your operating system.

## Usage

You have to install my other repo : [callApiQrCode](https://github.com/Nooaah/callApiQrCode)

```git
git clone https://github.com/Nooaah/callApiQrCode
```

Replace your IP Address in [script.js](https://github.com/Nooaah/callApiQrCode/blob/master/script/script.js)
 to be able to connect to the server you just launched

Now, open index.html from the other repository, and flash to unlock !

## Contributing

[Nooaah](https://github.com/nooaah)

Please make sure to update tests as appropriate.
