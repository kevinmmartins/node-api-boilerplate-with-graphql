import { expect } from 'chai'

import * as userApi from './api'

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'kevinmmartins',
            email: 'kevinmmartins@gmail.com',
            role: 'ADMIN'
          }
        }
      }

      const result = await userApi.user({ id: '1' })

      expect(result.data).to.eql(expectedResult)
    })

    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null
        }
      }

      const result = await userApi.user({ id: '42' })

      expect(result.data).to.eql(expectedResult)
    })
  })

  describe('users: [User!]', () => {
    it('returns a list of users', async () => {
      const expectedResult = {
        data: {
          users: [
            {
              id: '1',
              username: 'kevinmmartins',
              email: 'kevinmmartins@gmail.com',
              role: 'ADMIN'
            },
            {
              id: '2',
              username: 'webster.lima',
              email: 'webster.lima@gmail.com',
              role: 'ADMIN'
            }
          ]
        }
      }

      const result = await userApi.users()

      expect(result.data).to.eql(expectedResult)
    })
  })
})
