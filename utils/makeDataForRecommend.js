const PRICE_MAP = {
  "I'm pretty new to all this": 13,
  "I'm at an intermediate stage": 17,
  "I'm pretty advanced": 20,
  "I'm a total coffee nerd": 25,
}

const makeDataForRecommend = ({ price, roast_level, taste }) => {
  return {
    price: PRICE_MAP[price],
    coffees: {
      roast_level,
      taste,
    },
  }
}

module.exports = makeDataForRecommend
