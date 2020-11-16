"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const resolvers = {
  Permission: {
    roles: async (_, __, ctx) => {
      return await ctx.prisma.role.findMany();
    }
  },
  Query: {
    getPermissions: async (_, __, ctx) => {
      return await ctx.prisma.permission.findMany();
    },
    getPermission: async (_, {
      id
    }, ctx) => {
      const Permission = await ctx.prisma.permission.findOne({
        where: {
          id: +id
        } // include: {
        //   Token: true
        // }

      });
      return Permission;
    }
  },
  Mutation: {
    createPermission: async (_, {
      data
    }, ctx) => {
      const existingPermission = await ctx.prisma.permission.findFirst({
        where: {
          name: data.name
        }
      });
      if (existingPermission) throw new Error('Permission exists already.');
      const Permission = await ctx.prisma.permission.create({
        data
      });
      return Permission;
    },
    updatePermission: async (_, {
      id,
      data
    }, ctx) => {
      return await ctx.prisma.permission.update({
        where: {
          id: +id
        },
        data
      });
    },
    deletePermission: async (_, {
      id
    }, ctx) => {
      return await ctx.prisma.permission.delete({
        where: {
          id: +id
        }
      });
    }
  }
};
var _default = resolvers;
exports.default = _default;