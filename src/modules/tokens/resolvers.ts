import { Context } from '../../context'

const resolvers = {
  Token: {
    user: async (token, __, ctx: Context) => {
      const user = await ctx.prisma.user.findOne({
        where: { id: token.userId }
      })
      return user
    }
  },
  Query: {
    getTokens: async (_, __, { prisma }) => {
      return await prisma.token.findMany()
    },
    getToken: async (_, { id }, context) => {
      return await context.prisma.token.findOne({
        where: { id: +id },
        include: {
          User: true
        }
      })
    }
  },
  Mutation: {
    createToken: async (_, { data }, context) => {
      const existingToken = await context.prisma.token.findOne({
        where: { token: data.token }
      })
      if (existingToken) throw new Error('Token exists already.')
      const token = await context.prisma.token.create({ data })
      return token
    },
    deleteToken: async (_, { token }, context) => {
      return await context.prisma.token.delete({
        where: { token: token }
      })
    },
    deleteTokens: async (_, { id }, context) => {
      return await context.prisma.token.deleteMany({
        where: { id: +id }
      })
    }
  }
}
export default resolvers
