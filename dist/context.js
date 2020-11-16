"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;

var _client = require("@prisma/client");

var _apolloServer = require("apollo-server");

var _jsonwebtoken = require("jsonwebtoken");

var _graphql = require("graphql");

const prisma = new _client.PrismaClient();

// params
// prisma.$use(async (params, next) => {
//   console.log(params)
//   const result = await next(params)
//   return result
// })
function userAuth(ctx) {
  const Authorization = ctx.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = (0, _jsonwebtoken.verify)(token, JSON.stringify(process.env.SECRET_KEY));
    return verifiedToken && verifiedToken;
  }
}

function createContext(ctx) {
  const ip = (ctx.req.headers['x-forwarded-for'] || '').split(',').pop().trim() || ctx.req.connection.remoteAddress || ctx.req.socket.remoteAddress || ctx.req.connection.socket.remoteAddress;
  const parseQuery = (0, _graphql.parse)(ctx.req.body.query, {
    allowLegacySDLEmptyFields: false
  }); // @ts-ignore

  const queryName = parseQuery.definitions[0].selectionSet.selections[0].name.value; // eslint-disable-next-line no-unused-vars

  let [method] = queryName.split(/(?=[A-Z])/);
  if (method === 'get') method = 'read';

  if (queryName === 'login' || queryName === 'logout' || queryName === '__schema') {
    return {
      prisma,
      ip
    };
  } else {
    const user = userAuth(ctx);
    if (!user) throw new _apolloServer.AuthenticationError('You must be logged in!');
    const hasPermission = user.permissions.filter(item => item.permissions.includes(method));
    if (hasPermission.length === 0) throw new _apolloServer.ForbiddenError('You not have permission!');
    return {
      prisma,
      user
    };
  }
}