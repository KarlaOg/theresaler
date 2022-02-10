import axios from 'axios';

export function sendEmailRegister(email, firstname) {
  console.log('email', email, 'firstname', firstname);
  return axios
    .post('http://localhost:3000', {
      email,
      firstname,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
