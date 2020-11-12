const PRICE_MAP = {
  "I'm pretty new to all this": 13,
  "I'm at an intermediate stage": 17,
  "I'm pretty advanced": 20,
  "I'm a total coffee nerd": 25,
}

const makeDataForRecommend = (answers) => {
  return {
    price: PRICE_MAP[answers[0]],
    coffees: {
      roast_level: answers[1],
      taste: answers[2],
    },
  }
}

module.exports = makeDataForRecommend
