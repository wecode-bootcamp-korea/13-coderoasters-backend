const COFFEE_MAP = {
  Light: 0,
  'Light-Medium': 1,
  Medium: 2,
  'Medium-Dark': 3,
  Dark: 4,
  'Extra-Dark': 5,
  'Roasty & Smoky': 0,
  'Comforting & Rich': 1,
  'Subtle & Delicate': 2,
  'Sweet & Tart': 3,
  'Sweet & Smooth': 4,
  'Balanced & Fruity': 5,
}

const CENTROIDS = [
  [16.116808510638297, 3.8146808510638297, 2.7226595744680853],
  [17.84358490566038, 3.5679245283018868, 1.6594339622641505],
  [19.276043956043956, 3.6134065934065935, 2.374945054945055],
  [16.055681818181817, 3.071818181818182, 3.0111363636363637],
  [16.415454545454544, 3.767272727272727, 3.419090909090909],
  [18.82359375, 3.46578125, 2.984375],
  [16.422931034482758, 3.1212068965517243, 2.276206896551724],
  [15.04904761904762, 3.7246031746031747, 2.258888888888889],
]

const mapCoffee = ({ price, coffees }) => {
  return [price, COFFEE_MAP[coffees.roast_level], COFFEE_MAP[coffees.taste]]
}

const calcDistance = (coffeeArray, centroid) => {
  const reducer = (sum, el, index) => {
    return sum + Math.pow(coffeeArray[index] - centroid[index], 2)
  }
  return Math.sqrt(coffeeArray.reduce(reducer, 0))
}

const getClusterId = (productObj) => {
  const coffeeArray = mapCoffee(productObj)
  const closestCentroid = {
    id: 0,
    distance: Infinity,
  }
  const reducer = (closestCentroid, centroid, index) => {
    const distance = calcDistance(coffeeArray, centroid)

    if (distance < closestCentroid.distance) {
      closestCentroid.id = index
      closestCentroid.distance = distance
    }

    return closestCentroid
  }
  return CENTROIDS.reduce(reducer, closestCentroid).id
}

module.exports = { getClusterId }
