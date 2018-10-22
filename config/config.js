let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3900;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/users';
    process.env.BCRYPT_AUTH_ROUNDS = 11;
  } else if (env === 'test') {
    process.env.PORT = 5555;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/usersTest';
    process.env.BCRYPT_AUTH_ROUNDS = 11;
  } else if (env == 'prod' || env == 'production') {
    process.env.PORT = 5555;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/usersTest';
    process.env.BCRYPT_AUTH_ROUNDS = 12;
  }
  