import { Context } from '../../context'

const resolvers = {
  Role: {
    permissions: async (parent, __, ctx: Context) => {
      const permissions = await ctx.prisma.permission.findMany({
        where: {
          RolePermission: {
            some: {
              roleId: +parent.id
            }
          }
        }
      })
      return permissions
    },
    users: async (_, __, ctx: Context) => {
      return await ctx.prisma.user.findMany()
    }
  },
  Query: {
    getRoles: async (_, __, ctx: Context) => {
      return await ctx.prisma.role.findMany()
    },
    getRole: async (_, { id }, ctx: Context) => {
      const Role = await ctx.prisma.role.findOne({
        where: { id: +id }
        // include: {
        //   Token: true
        // }
      })
      return Role
    }
  },
  Mutation: {
    createRole: async (_, { data }, ctx: Context) => {
      const existingRole = await ctx.prisma.role.findFirst({
        where: { name: data.name }
      })
      if (existingRole) throw new Error('Role exists already.')
      const role = await ctx.prisma.role.create({ data })
      return role
    },
    updateRole: async (_, { id, data }, ctx: Context) => {
      return await ctx.prisma.role.update({
        where: { id: +id },
        data
      })
    },
    deleteRole: async (_, { id }, ctx: Context) => {
      return await ctx.prisma.role.delete({
        where: { id: +id }
      })
    }
  }
}
export default resolvers
