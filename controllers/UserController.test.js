const { PrismaClient } = require('@prisma/client')
const axios = require('axios')

const baseUrl = 'http://127.0.0.1:8000'
const createFromBaseAndPath = baseUrl => path => baseUrl + path
const createUrl = createFromBaseAndPath(baseUrl)

const prisma = new PrismaClient()

describe('', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('회원가입 테스트', () => {
    afterAll(async () => {
      await prisma.users.delete({
        where: { email: "test1234@test.com" }
      })
    })
  
    test('회원가입 성공 테스트', async () => {
      const signUpUrl = createUrl('/users/signup')
      const userInfo = {
        "email": "test1234@test.com",
        "password": "12345678",
        "first_name": "kim",
        "last_name": "testname",
        "mobile_number": "010-1111-1111"
      }
      const result = await axios.post(signUpUrl, userInfo)
  
      expect(result.status).toEqual(201)
      expect(result.data.message).toEqual('user created')
    }, 10000)
  
    test('이메일 validation 테스트', async () => {
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
      }
    }, 10000)
  
    test('비밀번호 validation 테스트', async () => {
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
      }
    }, 10000)
  
    test('duplicate 테스트', async () => {
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
  
    afterAll(async () => {
      await prisma.users.delete({
        where: { email: "test1234@test.com" }
      })
    }, 10000)
  
    test('로그인 성공 테스트', async () => {
      const logInUrl = createUrl('/users/login')
      const userInfo = {
        "email": "test1234@test.com",
        "password": "12345678",
      }
      const result = await axios.post(logInUrl, userInfo)
  
      expect(result.status).toEqual(200)
      expect(result.data.message).toEqual('login success!')
    }, 10000)
  
    test('email invalid  테스트', async () => {
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
      }
    }, 10000)
  
    test('password invalid  테스트', async () => {
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
      }
    }, 10000)
  })
  
})

