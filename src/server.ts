import path from 'path'

import { ApolloServer } from 'apollo-server'
import { createContext } from './context'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, 'modules'), { recursive: true, extensions: ['gql'] }))

const fileTypeJS = process.env.NODE_ENV === 'dev' ? 'ts' : 'js'

const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, 'modules'), { recursive: true, extensions: [fileTypeJS] }))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  introspection: true,
  playground: true
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`\n🚀  Server ready at ${url}`)
})
