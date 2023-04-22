const form = document.querySelector('.sign__form')
const id = document.querySelector('.form__id')
const pw = document.querySelector('.form__pw')

form.addEventListener('submit',onSubmit)

function onSubmit(e){
  e.preventDefault();

  axios.post('/signin',{
    email : id.value.trim(),
    password : pw.value.trim()
  })
  .then((res)=>{
    sessionStorage.setItem("token",res.data)
  })
  .catch((err)=>{
    alert(err)
  })
}