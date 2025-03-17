import { faker } from '@faker-js/faker';

export const correctUserLoginDetails = {
    email: "ruby.glenn@waterbaby.co.uk",
    password: "red^adl4"
};

export const userLoginDetailsWithWrongPassword = {
    email: 'ruby.glenn@waterbaby.co.uk',
    password: faker.internet.password(),
};

export const userLoginDetailsWithWrongEmail = {
    email: faker.internet.email(),
    password: 'red^adl4',
};

export const updateUserLastNameOnly = {
    lastName: faker.person.lastName(),
};

export const updateUserFirstNameOnly = {
    firstName: faker.person.firstName(),
};

export const updateUserCompanyOnly = {
    company: faker.company.name(),
};

export const updateUserAddressOnly = {
    address: faker.location.streetAddress(),
};

export const updateUserPhoneOnly = {
    phone: "+1 (800) 433-0000",
};
export const updateUserAllDetails = {
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    phone: "+1 (700) 433-0000",
};

export const inActiveUserLoginDetails = {
    email: "boyd.small@endipine.biz",
    password: "_4rhododfj",
};