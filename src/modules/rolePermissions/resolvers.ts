import { Context } from '../../context'

const resolvers = {
  // RolePermission: {
  //   roles: async (_, __, ctx: Context) => {
  //     return await ctx.prisma.role.findMany()
  //   }
  // },
  Query: {
    getRolePermissions: async (_, __, ctx: Context) => {
      return await ctx.prisma.rolePermission.findMany()
    },
    getRolePermission: async (_, { id }, ctx: Context) => {
      const rolePermission = await ctx.prisma.rolePermission.findOne({
        where: { id: +id }
        // include: {
        //   Token: true
        // }
      })
      return rolePermission
    }
  },
  Mutation: {
    createRolePermission: async (_, { data }, ctx: Context) => {
      const existingrolePermission = await ctx.prisma.rolePermission.findFirst({
        where: { roleId: +data.roleId, permissionId: +data.permissionId }
      })
      if (existingrolePermission) throw new Error('Role/Permission exists already.')
      const rolePermission = await ctx.prisma.rolePermission.create({
        data: {
          Role: {
            connect: { id: +data.roleId }
          },
          Permission: {
            connect: { id: +data.permissionId }
          }
        }
      })
      return rolePermission
    },
    updateRolePermission: async (_, { id, data }, ctx: Context) => {
      return await ctx.prisma.rolePermission.update({
        where: { id: +id },
        data: {
          Role: {
            connect: { id: +data.roleId }
          },
          Permission: {
            connect: { id: +data.permissionId }
          }
        }
      })
    },
    deleteRolePermission: async (_, { id }, ctx: Context) => {
      return await ctx.prisma.rolePermission.delete({
        where: { id: +id }
      })
    }
  }
}
export default resolvers
