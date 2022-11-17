async function asyncPromise(par1) {
  return new Promise((resolve, reject) => {
    if (typeof par1 !== 'number' && (par1 < 0 || par1 > 50000)) {
      reject(new Error('Par1 is invalid'))
    }
    setTimeout(() => {
      if (par1 > 25000) {
        reject(new Error('Server Timeout'))
      } else {
        resolve(par1 * 2)
      }
    }, 1000 + par1)
  })
}

function asyncCB(par1, cb) {
  runAsyncParalells(par1)
  asyncPromise(par1)
    .then((result) => {
      cb(null, result)
      return asyncCB(result, cb)
    })
    .catch((err) => {
      cb(err)
    })
}
  
function myCallback(err, result) {
  if (err) {
      console.log(`ERR: ${err.message}`);
  } else {
		console.log(`SUCCESS: ${result}`);
  }
}

async function asyncParalel1(par1) {
  return new Promise((resolve, reject) => {
    if (typeof par1 !== 'number' && (par1 < 0 || par1 > 50000)) {
      reject(new Error('Par1 is invalid'))
    }
    setTimeout(() => {
      if (par1 / 2 > 10000) {
        reject(new Error('Parallel #1 timed out!'))
      } else {
        resolve(true)
      }
    }, par1 / 2)
  })
}

function asyncParalel2(par1) {
  return new Promise((resolve, reject) => {
    if (typeof par1 !== 'number' && (par1 < 0 || par1 > 50000)) {
      reject(new Error('Par1 is invalid'))
    }
    setTimeout(() => {
      if (par1 / 3 > 10000) {
        reject(new Error('Parallel #2 timed out!'))
      } else {
        resolve(true)
      }
    }, par1 / 3)
  })
}

function asyncParalel3(par1) {
  return new Promise((resolve, reject) => {
    if (typeof par1 !== 'number' && (par1 < 0 || par1 > 50000)) {
      reject(new Error('Par1 is invalid'))
    }
    setTimeout(() => {
      if (par1 / 4 > 10000) {
        reject(new Error('Parallel #3 timed out!'))
      } else {
        resolve(true)
      }
    }, par1 / 4)
  })
}

async function runAsyncParalells(par1) {
  Promise.allSettled([asyncParalel1(par1), asyncParalel2(par1), asyncParalel3(par1)])
    .then((results) => {
      console.log('all parallel calls completed')
      results.forEach((val) => {
        if (val.reason) {
          console.log(val.reason.toString())
        } else {
          console.log(val.value)
        }
      })
    })
}

asyncCB(30, myCallback)
