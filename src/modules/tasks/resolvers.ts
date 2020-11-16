const resolvers = {
  Query: {
    getTasks: async (_, __, context) => {
      return await context.prisma.task.findMany()
    }
  }
}
export default resolvers
