const { faker } = require('@faker-js/faker');
// import User from "../models/User";

function createRandomUser() {
    // for(var i=0; i<5; i++) {
    //     var user = new User({
    //         username: faker.internet.userName(),
    //         email: faker.internet.email(),
    //         password: faker.internet.password(),
    //         firstName: faker.name.firstName(),
    //         lastName: faker.name.lastName(),
    //         token: []
    //     })
    //     user.save();
    //     console.log(user);
    // }
    const username = faker.internet.userName();
    console.log(username)
}

createRandomUser()

