# Black Package
## installation with npm:
```batch
$ npm install eric-black-package

## using
```javascript
const app = require("eric-black-package");

app.on('countrydata', (data) => {
    console.log(`country: ${data.country} | city: ${data.city} | index: ${data.index}`);
  })

app.readdata(".path/filename");

