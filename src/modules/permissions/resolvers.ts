import { Context } from '../../context'

const resolvers = {
  Permission: {
    roles: async (_, __, ctx: Context) => {
      return await ctx.prisma.role.findMany()
    }
  },
  Query: {
    getPermissions: async (_, __, ctx: Context) => {
      return await ctx.prisma.permission.findMany()
    },
    getPermission: async (_, { id }, ctx: Context) => {
      const Permission = await ctx.prisma.permission.findOne({
        where: { id: +id }
        // include: {
        //   Token: true
        // }
      })
      return Permission
    }
  },
  Mutation: {
    createPermission: async (_, { data }, ctx: Context) => {
      const existingPermission = await ctx.prisma.permission.findFirst({
        where: { name: data.name }
      })
      if (existingPermission) throw new Error('Permission exists already.')
      const Permission = await ctx.prisma.permission.create({ data })
      return Permission
    },
    updatePermission: async (_, { id, data }, ctx: Context) => {
      return await ctx.prisma.permission.update({
        where: { id: +id },
        data
      })
    },
    deletePermission: async (_, { id }, ctx: Context) => {
      return await ctx.prisma.permission.delete({
        where: { id: +id }
      })
    }
  }
}
export default resolvers
