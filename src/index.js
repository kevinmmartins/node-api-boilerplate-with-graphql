import 'dotenv/config'
import http from 'http'

import cors from 'cors'
import morgan from 'morgan'
import DataLoader from 'dataloader'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import loaders from './loaders'

const app = express()

app.use(cors())

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Node api boilerplate is working!')
})

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message
    }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader((keys) =>
            loaders.user.batchUsers(keys, models))
        }
      }
    }

    if (req) {
      return {
        models,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader((keys) =>
            loaders.user.batchUsers(keys, models))
        }
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)

const isTest = !!process.env.TEST_DATABASE
const isProduction = !!process.env.DATABASE_URL
const port = process.env.PORT || 8000

const createUsers = async () => {
  await models.User.create(
    {
      username: 'kevinmmartins',
      email: 'kevinmmartins@gmail.com',
      password: 'narutinho',
      role: 'ADMIN'
    }
  )

  await models.User.create(
    {
      username: 'webster.lima',
      email: 'webster.lima@gmail.com',
      password: 'casado',
      role: 'ADMIN'
    }
  )
}

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest || isProduction) {
    createUsers()
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`)
  })
})

