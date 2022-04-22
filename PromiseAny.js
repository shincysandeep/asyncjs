const first = new Promise((resolve, reject) => {
    setTimeout(reject, 500, 'first')
  })
  const second = new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'second')
  })
  
  Promise.any([first, second]).catch(error => {
    console.log(error) // AggregateError
  })
  