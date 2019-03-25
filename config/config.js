let env = process.env.NODE_ENV || 'development';

process.env.PORT = 3900;
process.env.MONGODB_URI = 'mongodb://localhost:27017/chatty';
process.env.BCRYPT_AUTH_ROUNDS = 12;
process.env.JWT_PRIVATE_KEY = '5834utfde&%$dasdas';
process.env.APP_URL='http://localhost:3900/'
