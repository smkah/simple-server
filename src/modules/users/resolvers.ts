import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Context } from '../../context'

const resolvers = {
  User: {
    tokens: async (_, __, ctx: Context) => {
      return await ctx.prisma.token.findMany()
    },
    roles: async (parent, __, ctx: Context) => {
      const roles = await ctx.prisma.role.findMany({
        where: {
          UserRole: {
            some: {
              userId: +parent.id
            }
          }
        }
      })
      return roles
    }
  },
  Query: {
    getUsers: async (_, __, ctx: Context) => {
      return await ctx.prisma.user.findMany()
    },
    getUser: async (_, { id }, ctx: Context) => {
      const user = await ctx.prisma.user.findOne({
        where: { id: +id }
      })
      return user
    }
  },
  Mutation: {
    login: async (_, { email, password }, ctx) => {
      const user = await ctx.prisma.user.findOne({
        where: { email: email },
        include: {
          UserRole: {
            select: {
              Role: {
                select: {
                  name: true,
                  RolePermission: {
                    select: {
                      Permission: {
                        select: {
                          name: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
      if (!user) throw new Error('User does not exist!')
      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) throw new Error('Password is incorrect!')

      const rolesPermissions = user.UserRole.map(({ Role }) => {
        const name = Role.name
        const permissions = Role.RolePermission.map(({ Permission }) => Permission.name)
        return { name, permissions }
      })

      const token = jwt.sign(
        { userId: user.id, permissions: rolesPermissions },
        JSON.stringify(process.env.SECRET_KEY)
      )

      await ctx.prisma.token.create({
        data: {
          token: token,
          ip: ctx.ip,
          User: {
            connect: { email: user.email }
          }
        }
      })

      return { userId: user.id, token: token }
    },
    logout: async (parent, { userId }, ctx) => {
      await ctx.prisma.token.deleteMany({
        where: { userId: +userId, ip: ctx.ip }
      })
      return true
    },
    createUser: async (_, { data }, ctx: Context) => {
      const existingUser = await ctx.prisma.user.findOne({
        where: { email: data.email }
      })
      if (existingUser) throw new Error(`User with e-mail '${data.email}' exists already.`)
      data.password = await bcrypt.hash(data.password, 12)
      data.createdAt = new Date()
      const user = await ctx.prisma.user.create({
        data: {
          ...data,
          UserRole: {
            create: {
              Role: {
                connect: { id: 1 }
              }
            }
          }
        }
      })
      return user
    },
    updateUser: async (_, { id, data }, ctx: Context) => {
      data.updatedAt = new Date()
      return await ctx.prisma.user.update({
        where: { id: +id }, data
      })
    },
    deleteUser: async (_, { id }, ctx: Context) => {
      return await ctx.prisma.user.delete({
        where: { id: +id }
      })
    }
  }
}
export default resolvers
