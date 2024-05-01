// Write your tests here
const request = require("supertest")
const db = require("../data/dbConfig")
const server = require("../api/server")

test('sanity', () => {
  expect(true).not.toBe(false)
})

const user1 = {username: "Adrian", password: "foobar"}
const user2 = {username: "Max", password: "barfoo"}
const userRepeat = {username: "Adrian", password: "foobar"}

beforeAll(async ()=> {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("users").truncate()
})

afterAll(async ()=>{
  await db.destroy()
})

describe("auth-router testing", () => {
  describe("post endpoint", () => {
    it("(1)register user", async ()=> {
      const res = await request(server).post('/api/auth/register').send(user1)
      const hashPassword = await db('users').where('username', 'Adrian').first()
      expect(res.body).toMatchObject({id: 1, username: "Adrian", password: hashPassword.password})
    })
    it("(2)username has to be unique", async () => {
      await request(server).post('/api/auth/register').send(user1)
      const res = await request(server).post('/api/auth/register').send(userRepeat)
      expect(res.body.message).toMatch(/Name already Exists/i)
    })
  })
})
