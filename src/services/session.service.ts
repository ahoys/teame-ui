import request from 'superagent';

export const requestSession = (
  username: string,
  password: string,
  cb: (username: string, token: string) => void
): void => {
  request
    .get('/login')
    .auth(username, password)
    .end((err, res) => {
      if (!err && res && res.status === 200) {
        cb(username, res.body.teameToken);
      }
    });
};
