const numberRgx = /^\d+(\.\d+)?$/

const castIfInt = (string) => {
  return numberRgx.test(string) ? Number(string) : string
}

module.exports = { castIfInt }
