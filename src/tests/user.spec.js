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

  describe('me: User', () => {
    it('returns null when no user is signed in', async () => {
      const expectedResult = {
        data: {
          me: null
        }
      }

      const { data } = await userApi.me()

      expect(data).to.eql(expectedResult)
    })

    it('returns me when me is signed in', async () => {
      const expectedResult = {
        data: {
          me: {
            id: '1',
            username: 'kevinmmartins',
            email: 'kevinmmartins@gmail.com'
          }
        }
      }

      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'kevinmmartins',
        password: 'narutinho'
      })

      const { data } = await userApi.me(token)

      expect(data).to.eql(expectedResult)
    })
  })

  describe('signUp, updateUser, deleteUser', () => {
    it('signs up a user, updates a user and deletes the user as admin', async () => {
      const {
        data: {
          data: {
            signUp: { token }
          }
        }
      } = await userApi.signUp({
        username: 'Mark',
        email: 'mark@gmule.com',
        password: 'asdasdasd'
      })

      const {
        data: {
          data: { me }
        }
      } = await userApi.me(token)

      expect(me).to.eql({
        id: '3',
        username: 'Mark',
        email: 'mark@gmule.com'
      })

      // update as user

      const {
        data: {
          data: { updateUser }
        }
      } = await userApi.updateUser({ username: 'Mark' }, token)

      expect(updateUser.username).to.eql('Mark')

      const {
        data: {
          data: {
            signIn: { token: adminToken }
          }
        }
      } = await userApi.signIn({
        login: 'kevinmmartins',
        password: 'narutinho'
      })

      const {
        data: {
          data: { deleteUser }
        }
      } = await userApi.deleteUser({ id: me.id }, adminToken)

      expect(deleteUser).to.eql(true)
    })
  })

  describe('updateUser(username: String!): User!', () => {
    it('returns an error because only authenticated users can update a user', async () => {
      const {
        data: { errors }
      } = await userApi.updateUser({ username: 'Mark' })

      expect(errors[0].message).to.eql('Not authenticated as user.')
    })
  })

  describe('signIn(login: String!, password: String!): Token!', () => {
    it('returns a token when a user signs in with username', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'webster.lima',
        password: 'casado'
      })

      expect(token).to.be.a('string')
    })

    it('returns a token when a user signs in with email', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'webster.lima@gmail.com',
        password: 'casado'
      })

      expect(token).to.be.a('string')
    })

    it('returns an error when a user provides a wrong password', async () => {
      const {
        data: { errors }
      } = await userApi.signIn({
        login: 'webster.lima',
        password: 'dontknow'
      })

      expect(errors[0].message).to.eql('Invalid password.')
    })
  })

  it('returns an error when a user is not found', async () => {
    const {
      data: { errors }
    } = await userApi.signIn({
      login: 'dontknow',
      password: 'webster.lima'
    })

    expect(errors[0].message).to.eql(
      'No user found with this login credentials.'
    )
  })
})
