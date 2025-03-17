const baseUserDetails = {
  _id: '_id',
  email: 'email',
  picture: 'picture',
};

export const userDetails = [
  ...Object.values(baseUserDetails),
  'company',
  'phone',
  'age',
  'address',
  'eyeColor',
  'isActive',
  'balance',
];

export const updateUserDetails = [
  ...Object.values(baseUserDetails),
  'company',
  'phone',
  'address',
];