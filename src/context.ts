import { PrismaClient } from '@prisma/client'
import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { verify } from 'jsonwebtoken'
import { parse } from 'graphql'

const prisma = new PrismaClient()

interface Token {
  userId: string
  permissions: any
}

export interface Context {
  prisma: PrismaClient
  ip?: string
  user?: any
}
// params
// prisma.$use(async (params, next) => {
//   console.log(params)
//   const result = await next(params)
//   return result
// })

function userAuth(ctx) {
  const Authorization = ctx.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, JSON.stringify(process.env.SECRET_KEY)) as Token
    return verifiedToken && verifiedToken
  }
}

export function createContext(ctx): Context {
  const ip = (ctx.req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
  ctx.req.connection.remoteAddress ||
  ctx.req.socket.remoteAddress ||
  ctx.req.connection.socket.remoteAddress

  const parseQuery = parse(ctx.req.body.query, { allowLegacySDLEmptyFields: false })

  // @ts-ignore
  const queryName = parseQuery.definitions[0].selectionSet.selections[0].name.value

  // eslint-disable-next-line no-unused-vars
  let [method] = queryName.split(/(?=[A-Z])/)
  if (method === 'get') method = 'read'

  if (queryName === 'login' || queryName === 'logout' || queryName === '__schema') {
    return { prisma, ip }
  } else {
    const user = userAuth(ctx)
    if (!user) throw new AuthenticationError('You must be logged in!')
    const hasPermission = user.permissions.filter(item => item.permissions.includes(method))
    if (hasPermission.length === 0) throw new ForbiddenError('You not have permission!')
    return { prisma, user }
  }
}
