import { Context } from '../../context'

const resolvers = {
  UserRole: {
    roles: async (_, __, ctx: Context) => {
      return await ctx.prisma.userRole.findMany({
        include: {
          Role: true
        }
      })
    },
    users: async (_, __, ctx: Context) => {
      return await ctx.prisma.userRole.findMany({
        include: {
          User: true
        }
      })
    }
  },
  Query: {
    getUserRoles: async (_, __, ctx: Context) => {
      return await ctx.prisma.userRole.findMany()
    },
    getUserRole: async (_, { id }, ctx: Context) => {
      const userRole = await ctx.prisma.userRole.findOne({
        where: { id: +id }
        // include: {
        //   Token: true
        // }
      })
      return userRole
    }
  },
  Mutation: {
    createUserRole: async (_, { data }, ctx: Context) => {
      const existingUserRole = await ctx.prisma.userRole.findFirst({
        where: { userId: +data.userId, roleId: +data.roleId }
      })
      if (existingUserRole) throw new Error('Role exists already.')
      const userRole = await ctx.prisma.userRole.create({
        data: {
          User: {
            connect: { id: +data.userId }
          },
          Role: {
            connect: { id: +data.roleId }
          }
        }
      })
      return userRole
    },
    updateUserRole: async (_, { id, data }, ctx: Context) => {
      return await ctx.prisma.userRole.update({
        where: { id: +id },
        data: {
          User: {
            connect: { id: +data.userId }
          },
          Role: {
            connect: { id: +data.roleId }
          }
        }
      })
    },
    deleteUserRole: async (_, { id }, ctx: Context) => {
      return await ctx.prisma.userRole.delete({
        where: { id: +id }
      })
    }
  }
}
export default resolvers
