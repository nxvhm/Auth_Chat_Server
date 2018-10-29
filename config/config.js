let env = process.env.NODE_ENV || 'development';

process.env.PORT = 5555;
process.env.MONGODB_URI = 'mongodb://localhost:27017/usersTest';
process.env.BCRYPT_AUTH_ROUNDS = 12;
process.env.JWT_PRIVATE_KEY = '5834utfde&%$dasdas';
  