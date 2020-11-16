"use strict";

var _path = _interopRequireDefault(require("path"));

var _apolloServer = require("apollo-server");

var _context = require("./context");

var _loadFiles = require("@graphql-tools/load-files");

var _merge = require("@graphql-tools/merge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const typeDefs = (0, _merge.mergeTypeDefs)((0, _loadFiles.loadFilesSync)(_path.default.join(__dirname, 'modules'), {
  recursive: true,
  extensions: ['gql']
}));
const fileTypeJS = process.env.NODE_ENV === 'dev' ? 'ts' : 'js';
const resolvers = (0, _merge.mergeResolvers)((0, _loadFiles.loadFilesSync)(_path.default.join(__dirname, 'modules'), {
  recursive: true,
  extensions: [fileTypeJS]
}));
const server = new _apolloServer.ApolloServer({
  typeDefs,
  resolvers,
  context: _context.createContext,
  introspection: true,
  playground: true
});
server.listen({
  port: process.env.PORT || 4000
}).then(({
  url
}) => {
  console.log(`\n🚀  Server ready at ${url}`);
});