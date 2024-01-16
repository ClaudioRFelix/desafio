export const login = (value) => {
  return new Promise( async (resolve, reject) => {
    await fetch(`http://localhost:3000/registration/${value}`)
    .then((response) => {
      resolve(response.json())
    })
    .catch((err) => {
      reject()
    })
  })
}

export const cadastrar = (payload) => {
  return new Promise( async (resolve, reject) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    await fetch(`http://localhost:3000/registration`, options)
    .then((response) => {
      resolve(response.json())
    })
    .catch((err) => {
      reject()
    })
  })
}

export default {
  login,
  cadastrar
}