const User = require('./src/v1/models/User');


const test = (async () => {
    console.log(await User.isUnique({email:'hasnat@test.com', sAMAccountName: 'hali1', phoneNumber: '0320-2020200'}));
})();
