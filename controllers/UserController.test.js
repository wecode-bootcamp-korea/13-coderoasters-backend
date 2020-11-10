const prisma = require('../prisma')
const axios = require('axios')
const { patch } = require('../routes/CartRouter')

const baseUrl = 'http://127.0.0.1:8000'
const createFromBaseAndPath = baseUrl => path => baseUrl + path
const createUrl = createFromBaseAndPath(baseUrl)

describe('회원가입 테스트', () => {
  afterAll(async (done) => {
    await prisma.users.delete({
      where: { email: "test1234@test.com" }
    })
    done()
  })

  test('회원가입 성공 테스트', async done => {
    const signUpUrl = createUrl('/users/signup')
    const userInfo = {
      "email": "test1234@test.com",
      "password": "12345678",
      "first_name": "kim",
      "last_name": "testname",
      "mobile_number": "010-1111-1111"
    }
    await axios.post(signUpUrl, userInfo)
      .then(res => {
        expect(res.status).toEqual(201)
        expect(res.data.message).toEqual('user created')
        done()
      })
  }, 10000)

  test('이메일 validation 테스트', async done => {
    const signUpUrl = createUrl('/users/signup')
    const userInfo = {
      "email": "test1234test.com",
      "password": "12345678",
      "first_name": "kim",
      "last_name": "testname",
      "mobile_number": "010-1111-1111"
    }
    try {
      await axios.post(signUpUrl, userInfo)

    } catch (err) {
      expect(err.response.status).toEqual(400)
      expect(err.response.data.message).toEqual('Please enter the correct email format')
      done()
    }
  }, 10000)

  test('비밀번호 validation 테스트', async done => {
    const signUpUrl = createUrl('/users/signup')
    const userInfo = {
      "email": "test1234@test.com",
      "password": "1234567",
      "first_name": "kim",
      "last_name": "testname",
      "mobile_number": "010-1111-1111"
    }
    try {
      await axios.post(signUpUrl, userInfo)

    } catch (err) {
      expect(err.response.status).toEqual(400)
      expect(err.response.data.message).toEqual('Please enter at least 8 digits')
      done()
    }
  }, 10000)

  test('duplicate 테스트', async done => {
    const signUpUrl = createUrl('/users/signup')
    const userInfo = {
      "email": "test1234@test.com",
      "password": "12345678",
      "first_name": "kim",
      "last_name": "testname",
      "mobile_number": "010-1111-1111"
    }
    try {
      await axios.post(signUpUrl, userInfo)

    } catch (err) {
      expect(err.response.status).toEqual(409)
      expect(err.response.data.message).toEqual('duplicated')
      done()
    }
  }, 10000)
})

describe('로그인 테스트', () => {
  beforeAll(async (done) => {
    const signUpUrl = createUrl('/users/signup')
    const userInfo = {
      "email": "test1234@test.com",
      "password": "12345678",
      "first_name": "kim",
      "last_name": "testname",
      "mobile_number": "010-1111-1111"
    }
    await axios.post(signUpUrl, userInfo)
    done()
  })

  afterAll(async (done) => {
    await prisma.users.delete({
      where: { email: "test1234@test.com" }
    })
    done()
  }, 10000)

  test('로그인 성공 테스트', async (done) => {
    const logInUrl = createUrl('/users/login')
    const userInfo = {
      "email": "test1234@test.com",
      "password": "12345678",
    }
    await axios.post(logInUrl, userInfo)
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.data.message).toEqual('login success!')
      })
    done()
  }, 10000)

  test('email invalid  테스트', async done => {
    const logInUrl = createUrl('/users/login')
    const userInfo = {
      "email": "testAAtecom",
      "password": "12345678",
    }
    try {
      await axios.post(logInUrl, userInfo)

    } catch (err) {
      expect(err.response.status).toEqual(400)
      expect(err.response.data.message).toEqual('client input invalid')
      done()
    }
  }, 10000)

  test('password invalid  테스트', async done => {
    const logInUrl = createUrl('/users/login')
    const userInfo = {
      "email": "test1234@test.com",
      "password": "12345678999",
    }
    try {
      await axios.post(logInUrl, userInfo)

    } catch (err) {
      expect(err.response.status).toEqual(400)
      expect(err.response.data.message).toEqual('client input invalid')
      done()
    }
  }, 10000)
})
