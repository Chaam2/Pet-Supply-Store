const form = document.querySelector('.sign__form');
const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  axios
    .post('/api/signin', {
      email: id.value.trim(),
      password: pw.value.trim(),
    })
    .then((res) => {
      if (res.info === 200) {
        localStorage.setItem('userToken', res.data);
      }
    });
});
