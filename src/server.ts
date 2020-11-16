import path from 'path'

import { ApolloServer } from 'apollo-server'
import { createContext } from './context'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, 'modules'), { recursive: true, extensions: ['gql'] }))
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, 'modules'), { recursive: true, extensions: ['ts'] }))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext
})

server.listen().then(({ url }) => {
  console.log(`\n🚀  Server ready at ${url}`)
})
