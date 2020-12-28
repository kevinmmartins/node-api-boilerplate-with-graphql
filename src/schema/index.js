import { gql } from 'apollo-server-express'

import userSchema from './user'

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }
`

export default [linkSchema, userSchema]
