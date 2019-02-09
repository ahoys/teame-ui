import request from 'superagent';

export const requestSession = (username: string, password: string, cb) => {
  return request
    .get('/login')
    .auth(username, password)
    .end((err, res) => {
      if (!err && res && res.status === 200) {
        cb(null, res.body.teameToken);
      } else {
        cb(err, null);
      }
    });
};
