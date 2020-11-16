"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const resolvers = {
  Role: {
    permissions: async (parent, __, ctx) => {
      const permissions = await ctx.prisma.permission.findMany({
        where: {
          RolePermission: {
            some: {
              roleId: +parent.id
            }
          }
        }
      });
      return permissions;
    },
    users: async (_, __, ctx) => {
      return await ctx.prisma.user.findMany();
    }
  },
  Query: {
    getRoles: async (_, __, ctx) => {
      return await ctx.prisma.role.findMany();
    },
    getRole: async (_, {
      id
    }, ctx) => {
      const Role = await ctx.prisma.role.findOne({
        where: {
          id: +id
        } // include: {
        //   Token: true
        // }

      });
      return Role;
    }
  },
  Mutation: {
    createRole: async (_, {
      data
    }, ctx) => {
      const existingRole = await ctx.prisma.role.findFirst({
        where: {
          name: data.name
        }
      });
      if (existingRole) throw new Error('Role exists already.');
      const role = await ctx.prisma.role.create({
        data
      });
      return role;
    },
    updateRole: async (_, {
      id,
      data
    }, ctx) => {
      return await ctx.prisma.role.update({
        where: {
          id: +id
        },
        data
      });
    },
    deleteRole: async (_, {
      id
    }, ctx) => {
      return await ctx.prisma.role.delete({
        where: {
          id: +id
        }
      });
    }
  }
};
var _default = resolvers;
exports.default = _default;