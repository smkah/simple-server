import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.11.0
 * Query Engine version: 58369335532e47bdcec77a2f1e7c1fb83a463918
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'


/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: ModelName
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): ProfileDelegate;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): TagDelegate;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): TaskDelegate;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): TokenDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): PermissionDelegate;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): RoleDelegate;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): RolePermissionDelegate;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): UserRoleDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ModelName: {
  Post: 'Post',
  Profile: 'Profile',
  Tag: 'Tag',
  Task: 'Task',
  Token: 'Token',
  User: 'User',
  Permission: 'Permission',
  Role: 'Role',
  RolePermission: 'RolePermission',
  UserRole: 'UserRole'
};

export declare type ModelName = (typeof ModelName)[keyof typeof ModelName]


export declare const PostDistinctFieldEnum: {
  id: 'id',
  title: 'title',
  createdAt: 'createdAt',
  content: 'content',
  published: 'published',
  authorId: 'authorId'
};

export declare type PostDistinctFieldEnum = (typeof PostDistinctFieldEnum)[keyof typeof PostDistinctFieldEnum]


export declare const ProfileDistinctFieldEnum: {
  id: 'id',
  bio: 'bio',
  userId: 'userId'
};

export declare type ProfileDistinctFieldEnum = (typeof ProfileDistinctFieldEnum)[keyof typeof ProfileDistinctFieldEnum]


export declare const TagDistinctFieldEnum: {
  id: 'id',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

export declare type TagDistinctFieldEnum = (typeof TagDistinctFieldEnum)[keyof typeof TagDistinctFieldEnum]


export declare const TaskDistinctFieldEnum: {
  id: 'id',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  userId: 'userId',
  status: 'status'
};

export declare type TaskDistinctFieldEnum = (typeof TaskDistinctFieldEnum)[keyof typeof TaskDistinctFieldEnum]


export declare const TokenDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  token: 'token',
  ip: 'ip'
};

export declare type TokenDistinctFieldEnum = (typeof TokenDistinctFieldEnum)[keyof typeof TokenDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  email: 'email',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  password: 'password',
  username: 'username'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const PermissionDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type PermissionDistinctFieldEnum = (typeof PermissionDistinctFieldEnum)[keyof typeof PermissionDistinctFieldEnum]


export declare const RoleDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type RoleDistinctFieldEnum = (typeof RoleDistinctFieldEnum)[keyof typeof RoleDistinctFieldEnum]


export declare const RolePermissionDistinctFieldEnum: {
  id: 'id',
  roleId: 'roleId',
  permissionId: 'permissionId'
};

export declare type RolePermissionDistinctFieldEnum = (typeof RolePermissionDistinctFieldEnum)[keyof typeof RolePermissionDistinctFieldEnum]


export declare const UserRoleDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  roleId: 'roleId'
};

export declare type UserRoleDistinctFieldEnum = (typeof UserRoleDistinctFieldEnum)[keyof typeof UserRoleDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model Post
 */

export type Post = {
  id: number
  title: string
  createdAt: Date
  content: string | null
  published: boolean
  authorId: number
}


export type AggregatePost = {
  count: number
  avg: PostAvgAggregateOutputType | null
  sum: PostSumAggregateOutputType | null
  min: PostMinAggregateOutputType | null
  max: PostMaxAggregateOutputType | null
}

export type PostAvgAggregateOutputType = {
  id: number
  authorId: number
}

export type PostSumAggregateOutputType = {
  id: number
  authorId: number
}

export type PostMinAggregateOutputType = {
  id: number
  authorId: number
}

export type PostMaxAggregateOutputType = {
  id: number
  authorId: number
}


export type PostAvgAggregateInputType = {
  id?: true
  authorId?: true
}

export type PostSumAggregateInputType = {
  id?: true
  authorId?: true
}

export type PostMinAggregateInputType = {
  id?: true
  authorId?: true
}

export type PostMaxAggregateInputType = {
  id?: true
  authorId?: true
}

export type AggregatePostArgs = {
  where?: PostWhereInput
  orderBy?: XOR<Enumerable<PostOrderByInput>, PostOrderByInput>
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
  count?: true
  avg?: PostAvgAggregateInputType
  sum?: PostSumAggregateInputType
  min?: PostMinAggregateInputType
  max?: PostMaxAggregateInputType
}

export type GetPostAggregateType<T extends AggregatePostArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPostAggregateScalarType<T[P]>
}

export type GetPostAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostAvgAggregateOutputType ? PostAvgAggregateOutputType[P] : never
}
    
    

export type PostSelect = {
  id?: boolean
  title?: boolean
  createdAt?: boolean
  content?: boolean
  published?: boolean
  authorId?: boolean
  User?: boolean | UserArgs
}

export type PostInclude = {
  User?: boolean | UserArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post that matches the filter.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find the first Post that matches the filter.
   * @param {FindFirstPostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstPostArgs>(
    args?: Subset<T, FindFirstPostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts that matches the filter.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const Post = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const Post = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostArgs>(args: Subset<T, AggregatePostArgs>): Promise<GetPostAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Post.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findFirst
 */
export type FindFirstPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
  /**
   * Filter, which Post to fetch.
  **/
  where?: PostWhereInput
  orderBy?: XOR<Enumerable<PostOrderByInput>, PostOrderByInput>
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: XOR<Enumerable<PostOrderByInput>, PostOrderByInput>
  /**
   * Sets the position for listing Posts.
  **/
  cursor?: PostWhereUniqueInput
  /**
   * The number of Posts to fetch. If negative number, it will take Posts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: XOR<PostSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PostInclude, null>
}



/**
 * Model Profile
 */

export type Profile = {
  id: number
  bio: string | null
  userId: number
}


export type AggregateProfile = {
  count: number
  avg: ProfileAvgAggregateOutputType | null
  sum: ProfileSumAggregateOutputType | null
  min: ProfileMinAggregateOutputType | null
  max: ProfileMaxAggregateOutputType | null
}

export type ProfileAvgAggregateOutputType = {
  id: number
  userId: number
}

export type ProfileSumAggregateOutputType = {
  id: number
  userId: number
}

export type ProfileMinAggregateOutputType = {
  id: number
  userId: number
}

export type ProfileMaxAggregateOutputType = {
  id: number
  userId: number
}


export type ProfileAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type ProfileSumAggregateInputType = {
  id?: true
  userId?: true
}

export type ProfileMinAggregateInputType = {
  id?: true
  userId?: true
}

export type ProfileMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateProfileArgs = {
  where?: ProfileWhereInput
  orderBy?: XOR<Enumerable<ProfileOrderByInput>, ProfileOrderByInput>
  cursor?: ProfileWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProfileDistinctFieldEnum>
  count?: true
  avg?: ProfileAvgAggregateInputType
  sum?: ProfileSumAggregateInputType
  min?: ProfileMinAggregateInputType
  max?: ProfileMaxAggregateInputType
}

export type GetProfileAggregateType<T extends AggregateProfileArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetProfileAggregateScalarType<T[P]>
}

export type GetProfileAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ProfileAvgAggregateOutputType ? ProfileAvgAggregateOutputType[P] : never
}
    
    

export type ProfileSelect = {
  id?: boolean
  bio?: boolean
  userId?: boolean
  User?: boolean | UserArgs
}

export type ProfileInclude = {
  User?: boolean | UserArgs
}

export type ProfileGetPayload<
  S extends boolean | null | undefined | ProfileArgs,
  U = keyof S
> = S extends true
  ? Profile
  : S extends undefined
  ? never
  : S extends ProfileArgs | FindManyProfileArgs
  ? 'include' extends U
    ? Profile  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Profile ? Profile[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Profile
: Profile


export interface ProfileDelegate {
  /**
   * Find zero or one Profile that matches the filter.
   * @param {FindOneProfileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProfileArgs>(
    args: Subset<T, FindOneProfileArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>
  /**
   * Find the first Profile that matches the filter.
   * @param {FindFirstProfileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstProfileArgs>(
    args?: Subset<T, FindFirstProfileArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>
  /**
   * Find zero or more Profiles that matches the filter.
   * @param {FindManyProfileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Profiles
   * const profiles = await prisma.profile.findMany()
   * 
   * // Get first 10 Profiles
   * const profiles = await prisma.profile.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyProfileArgs>(
    args?: Subset<T, FindManyProfileArgs>
  ): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>
  /**
   * Create a Profile.
   * @param {ProfileCreateArgs} args - Arguments to create a Profile.
   * @example
   * // Create one Profile
   * const Profile = await prisma.profile.create({
   *   data: {
   *     // ... data to create a Profile
   *   }
   * })
   * 
  **/
  create<T extends ProfileCreateArgs>(
    args: Subset<T, ProfileCreateArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete a Profile.
   * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
   * @example
   * // Delete one Profile
   * const Profile = await prisma.profile.delete({
   *   where: {
   *     // ... filter to delete one Profile
   *   }
   * })
   * 
  **/
  delete<T extends ProfileDeleteArgs>(
    args: Subset<T, ProfileDeleteArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Update one Profile.
   * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
   * @example
   * // Update one Profile
   * const profile = await prisma.profile.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProfileUpdateArgs>(
    args: Subset<T, ProfileUpdateArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete zero or more Profiles.
   * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
   * @example
   * // Delete a few Profiles
   * const { count } = await prisma.profile.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProfileDeleteManyArgs>(
    args: Subset<T, ProfileDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Profiles.
   * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Profiles
   * const profile = await prisma.profile.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProfileUpdateManyArgs>(
    args: Subset<T, ProfileUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Profile.
   * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
   * @example
   * // Update or create a Profile
   * const profile = await prisma.profile.upsert({
   *   create: {
   *     // ... data to create a Profile
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Profile we want to update
   *   }
   * })
  **/
  upsert<T extends ProfileUpsertArgs>(
    args: Subset<T, ProfileUpsertArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyProfileArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateProfileArgs>(args: Subset<T, AggregateProfileArgs>): Promise<GetProfileAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Profile.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ProfileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Profile findOne
 */
export type FindOneProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
  /**
   * Filter, which Profile to fetch.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile findFirst
 */
export type FindFirstProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
  /**
   * Filter, which Profile to fetch.
  **/
  where?: ProfileWhereInput
  orderBy?: XOR<Enumerable<ProfileOrderByInput>, ProfileOrderByInput>
  cursor?: ProfileWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProfileDistinctFieldEnum>
}


/**
 * Profile findMany
 */
export type FindManyProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
  /**
   * Filter, which Profiles to fetch.
  **/
  where?: ProfileWhereInput
  /**
   * Determine the order of the Profiles to fetch.
  **/
  orderBy?: XOR<Enumerable<ProfileOrderByInput>, ProfileOrderByInput>
  /**
   * Sets the position for listing Profiles.
  **/
  cursor?: ProfileWhereUniqueInput
  /**
   * The number of Profiles to fetch. If negative number, it will take Profiles before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Profiles.
  **/
  skip?: number
  distinct?: Enumerable<ProfileDistinctFieldEnum>
}


/**
 * Profile create
 */
export type ProfileCreateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
  /**
   * The data needed to create a Profile.
  **/
  data: ProfileCreateInput
}


/**
 * Profile update
 */
export type ProfileUpdateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
  /**
   * The data needed to update a Profile.
  **/
  data: ProfileUpdateInput
  /**
   * Choose, which Profile to update.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile updateMany
 */
export type ProfileUpdateManyArgs = {
  data: ProfileUpdateManyMutationInput
  where?: ProfileWhereInput
}


/**
 * Profile upsert
 */
export type ProfileUpsertArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
  /**
   * The filter to search for the Profile to update in case it exists.
  **/
  where: ProfileWhereUniqueInput
  /**
   * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
  **/
  create: ProfileCreateInput
  /**
   * In case the Profile was found with the provided `where` argument, update it with this data.
  **/
  update: ProfileUpdateInput
}


/**
 * Profile delete
 */
export type ProfileDeleteArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
  /**
   * Filter which Profile to delete.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile deleteMany
 */
export type ProfileDeleteManyArgs = {
  where?: ProfileWhereInput
}


/**
 * Profile without action
 */
export type ProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: XOR<ProfileSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ProfileInclude, null>
}



/**
 * Model Tag
 */

export type Tag = {
  id: number
  description: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}


export type AggregateTag = {
  count: number
  avg: TagAvgAggregateOutputType | null
  sum: TagSumAggregateOutputType | null
  min: TagMinAggregateOutputType | null
  max: TagMaxAggregateOutputType | null
}

export type TagAvgAggregateOutputType = {
  id: number
}

export type TagSumAggregateOutputType = {
  id: number
}

export type TagMinAggregateOutputType = {
  id: number
}

export type TagMaxAggregateOutputType = {
  id: number
}


export type TagAvgAggregateInputType = {
  id?: true
}

export type TagSumAggregateInputType = {
  id?: true
}

export type TagMinAggregateInputType = {
  id?: true
}

export type TagMaxAggregateInputType = {
  id?: true
}

export type AggregateTagArgs = {
  where?: TagWhereInput
  orderBy?: XOR<Enumerable<TagOrderByInput>, TagOrderByInput>
  cursor?: TagWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TagDistinctFieldEnum>
  count?: true
  avg?: TagAvgAggregateInputType
  sum?: TagSumAggregateInputType
  min?: TagMinAggregateInputType
  max?: TagMaxAggregateInputType
}

export type GetTagAggregateType<T extends AggregateTagArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetTagAggregateScalarType<T[P]>
}

export type GetTagAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof TagAvgAggregateOutputType ? TagAvgAggregateOutputType[P] : never
}
    
    

export type TagSelect = {
  id?: boolean
  description?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deletedAt?: boolean
}

export type TagGetPayload<
  S extends boolean | null | undefined | TagArgs,
  U = keyof S
> = S extends true
  ? Tag
  : S extends undefined
  ? never
  : S extends TagArgs | FindManyTagArgs
  ? 'include' extends U
    ? Tag 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Tag ? Tag[P]
: 
 never
    }
  : Tag
: Tag


export interface TagDelegate {
  /**
   * Find zero or one Tag that matches the filter.
   * @param {FindOneTagArgs} args - Arguments to find a Tag
   * @example
   * // Get one Tag
   * const tag = await prisma.tag.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTagArgs>(
    args: Subset<T, FindOneTagArgs>
  ): CheckSelect<T, Prisma__TagClient<Tag | null>, Prisma__TagClient<TagGetPayload<T> | null>>
  /**
   * Find the first Tag that matches the filter.
   * @param {FindFirstTagArgs} args - Arguments to find a Tag
   * @example
   * // Get one Tag
   * const tag = await prisma.tag.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstTagArgs>(
    args?: Subset<T, FindFirstTagArgs>
  ): CheckSelect<T, Prisma__TagClient<Tag | null>, Prisma__TagClient<TagGetPayload<T> | null>>
  /**
   * Find zero or more Tags that matches the filter.
   * @param {FindManyTagArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Tags
   * const tags = await prisma.tag.findMany()
   * 
   * // Get first 10 Tags
   * const tags = await prisma.tag.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTagArgs>(
    args?: Subset<T, FindManyTagArgs>
  ): CheckSelect<T, Promise<Array<Tag>>, Promise<Array<TagGetPayload<T>>>>
  /**
   * Create a Tag.
   * @param {TagCreateArgs} args - Arguments to create a Tag.
   * @example
   * // Create one Tag
   * const Tag = await prisma.tag.create({
   *   data: {
   *     // ... data to create a Tag
   *   }
   * })
   * 
  **/
  create<T extends TagCreateArgs>(
    args: Subset<T, TagCreateArgs>
  ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>
  /**
   * Delete a Tag.
   * @param {TagDeleteArgs} args - Arguments to delete one Tag.
   * @example
   * // Delete one Tag
   * const Tag = await prisma.tag.delete({
   *   where: {
   *     // ... filter to delete one Tag
   *   }
   * })
   * 
  **/
  delete<T extends TagDeleteArgs>(
    args: Subset<T, TagDeleteArgs>
  ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>
  /**
   * Update one Tag.
   * @param {TagUpdateArgs} args - Arguments to update one Tag.
   * @example
   * // Update one Tag
   * const tag = await prisma.tag.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TagUpdateArgs>(
    args: Subset<T, TagUpdateArgs>
  ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>
  /**
   * Delete zero or more Tags.
   * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
   * @example
   * // Delete a few Tags
   * const { count } = await prisma.tag.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TagDeleteManyArgs>(
    args: Subset<T, TagDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Tags.
   * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Tags
   * const tag = await prisma.tag.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TagUpdateManyArgs>(
    args: Subset<T, TagUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Tag.
   * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
   * @example
   * // Update or create a Tag
   * const tag = await prisma.tag.upsert({
   *   create: {
   *     // ... data to create a Tag
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Tag we want to update
   *   }
   * })
  **/
  upsert<T extends TagUpsertArgs>(
    args: Subset<T, TagUpsertArgs>
  ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyTagArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTagArgs>(args: Subset<T, AggregateTagArgs>): Promise<GetTagAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Tag.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TagClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Tag findOne
 */
export type FindOneTagArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
  /**
   * Filter, which Tag to fetch.
  **/
  where: TagWhereUniqueInput
}


/**
 * Tag findFirst
 */
export type FindFirstTagArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
  /**
   * Filter, which Tag to fetch.
  **/
  where?: TagWhereInput
  orderBy?: XOR<Enumerable<TagOrderByInput>, TagOrderByInput>
  cursor?: TagWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TagDistinctFieldEnum>
}


/**
 * Tag findMany
 */
export type FindManyTagArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
  /**
   * Filter, which Tags to fetch.
  **/
  where?: TagWhereInput
  /**
   * Determine the order of the Tags to fetch.
  **/
  orderBy?: XOR<Enumerable<TagOrderByInput>, TagOrderByInput>
  /**
   * Sets the position for listing Tags.
  **/
  cursor?: TagWhereUniqueInput
  /**
   * The number of Tags to fetch. If negative number, it will take Tags before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Tags.
  **/
  skip?: number
  distinct?: Enumerable<TagDistinctFieldEnum>
}


/**
 * Tag create
 */
export type TagCreateArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
  /**
   * The data needed to create a Tag.
  **/
  data: TagCreateInput
}


/**
 * Tag update
 */
export type TagUpdateArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
  /**
   * The data needed to update a Tag.
  **/
  data: TagUpdateInput
  /**
   * Choose, which Tag to update.
  **/
  where: TagWhereUniqueInput
}


/**
 * Tag updateMany
 */
export type TagUpdateManyArgs = {
  data: TagUpdateManyMutationInput
  where?: TagWhereInput
}


/**
 * Tag upsert
 */
export type TagUpsertArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
  /**
   * The filter to search for the Tag to update in case it exists.
  **/
  where: TagWhereUniqueInput
  /**
   * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
  **/
  create: TagCreateInput
  /**
   * In case the Tag was found with the provided `where` argument, update it with this data.
  **/
  update: TagUpdateInput
}


/**
 * Tag delete
 */
export type TagDeleteArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
  /**
   * Filter which Tag to delete.
  **/
  where: TagWhereUniqueInput
}


/**
 * Tag deleteMany
 */
export type TagDeleteManyArgs = {
  where?: TagWhereInput
}


/**
 * Tag without action
 */
export type TagArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: XOR<TagSelect, null>
}



/**
 * Model Task
 */

export type Task = {
  id: number
  description: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  userId: number
  status: boolean
}


export type AggregateTask = {
  count: number
  avg: TaskAvgAggregateOutputType | null
  sum: TaskSumAggregateOutputType | null
  min: TaskMinAggregateOutputType | null
  max: TaskMaxAggregateOutputType | null
}

export type TaskAvgAggregateOutputType = {
  id: number
  userId: number
}

export type TaskSumAggregateOutputType = {
  id: number
  userId: number
}

export type TaskMinAggregateOutputType = {
  id: number
  userId: number
}

export type TaskMaxAggregateOutputType = {
  id: number
  userId: number
}


export type TaskAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type TaskSumAggregateInputType = {
  id?: true
  userId?: true
}

export type TaskMinAggregateInputType = {
  id?: true
  userId?: true
}

export type TaskMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateTaskArgs = {
  where?: TaskWhereInput
  orderBy?: XOR<Enumerable<TaskOrderByInput>, TaskOrderByInput>
  cursor?: TaskWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TaskDistinctFieldEnum>
  count?: true
  avg?: TaskAvgAggregateInputType
  sum?: TaskSumAggregateInputType
  min?: TaskMinAggregateInputType
  max?: TaskMaxAggregateInputType
}

export type GetTaskAggregateType<T extends AggregateTaskArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetTaskAggregateScalarType<T[P]>
}

export type GetTaskAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof TaskAvgAggregateOutputType ? TaskAvgAggregateOutputType[P] : never
}
    
    

export type TaskSelect = {
  id?: boolean
  description?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deletedAt?: boolean
  userId?: boolean
  status?: boolean
  User?: boolean | UserArgs
}

export type TaskInclude = {
  User?: boolean | UserArgs
}

export type TaskGetPayload<
  S extends boolean | null | undefined | TaskArgs,
  U = keyof S
> = S extends true
  ? Task
  : S extends undefined
  ? never
  : S extends TaskArgs | FindManyTaskArgs
  ? 'include' extends U
    ? Task  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Task ? Task[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Task
: Task


export interface TaskDelegate {
  /**
   * Find zero or one Task that matches the filter.
   * @param {FindOneTaskArgs} args - Arguments to find a Task
   * @example
   * // Get one Task
   * const task = await prisma.task.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTaskArgs>(
    args: Subset<T, FindOneTaskArgs>
  ): CheckSelect<T, Prisma__TaskClient<Task | null>, Prisma__TaskClient<TaskGetPayload<T> | null>>
  /**
   * Find the first Task that matches the filter.
   * @param {FindFirstTaskArgs} args - Arguments to find a Task
   * @example
   * // Get one Task
   * const task = await prisma.task.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstTaskArgs>(
    args?: Subset<T, FindFirstTaskArgs>
  ): CheckSelect<T, Prisma__TaskClient<Task | null>, Prisma__TaskClient<TaskGetPayload<T> | null>>
  /**
   * Find zero or more Tasks that matches the filter.
   * @param {FindManyTaskArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Tasks
   * const tasks = await prisma.task.findMany()
   * 
   * // Get first 10 Tasks
   * const tasks = await prisma.task.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTaskArgs>(
    args?: Subset<T, FindManyTaskArgs>
  ): CheckSelect<T, Promise<Array<Task>>, Promise<Array<TaskGetPayload<T>>>>
  /**
   * Create a Task.
   * @param {TaskCreateArgs} args - Arguments to create a Task.
   * @example
   * // Create one Task
   * const Task = await prisma.task.create({
   *   data: {
   *     // ... data to create a Task
   *   }
   * })
   * 
  **/
  create<T extends TaskCreateArgs>(
    args: Subset<T, TaskCreateArgs>
  ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>
  /**
   * Delete a Task.
   * @param {TaskDeleteArgs} args - Arguments to delete one Task.
   * @example
   * // Delete one Task
   * const Task = await prisma.task.delete({
   *   where: {
   *     // ... filter to delete one Task
   *   }
   * })
   * 
  **/
  delete<T extends TaskDeleteArgs>(
    args: Subset<T, TaskDeleteArgs>
  ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>
  /**
   * Update one Task.
   * @param {TaskUpdateArgs} args - Arguments to update one Task.
   * @example
   * // Update one Task
   * const task = await prisma.task.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TaskUpdateArgs>(
    args: Subset<T, TaskUpdateArgs>
  ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>
  /**
   * Delete zero or more Tasks.
   * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
   * @example
   * // Delete a few Tasks
   * const { count } = await prisma.task.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TaskDeleteManyArgs>(
    args: Subset<T, TaskDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Tasks.
   * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Tasks
   * const task = await prisma.task.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TaskUpdateManyArgs>(
    args: Subset<T, TaskUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Task.
   * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
   * @example
   * // Update or create a Task
   * const task = await prisma.task.upsert({
   *   create: {
   *     // ... data to create a Task
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Task we want to update
   *   }
   * })
  **/
  upsert<T extends TaskUpsertArgs>(
    args: Subset<T, TaskUpsertArgs>
  ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyTaskArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTaskArgs>(args: Subset<T, AggregateTaskArgs>): Promise<GetTaskAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Task.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TaskClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Task findOne
 */
export type FindOneTaskArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
  /**
   * Filter, which Task to fetch.
  **/
  where: TaskWhereUniqueInput
}


/**
 * Task findFirst
 */
export type FindFirstTaskArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
  /**
   * Filter, which Task to fetch.
  **/
  where?: TaskWhereInput
  orderBy?: XOR<Enumerable<TaskOrderByInput>, TaskOrderByInput>
  cursor?: TaskWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TaskDistinctFieldEnum>
}


/**
 * Task findMany
 */
export type FindManyTaskArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
  /**
   * Filter, which Tasks to fetch.
  **/
  where?: TaskWhereInput
  /**
   * Determine the order of the Tasks to fetch.
  **/
  orderBy?: XOR<Enumerable<TaskOrderByInput>, TaskOrderByInput>
  /**
   * Sets the position for listing Tasks.
  **/
  cursor?: TaskWhereUniqueInput
  /**
   * The number of Tasks to fetch. If negative number, it will take Tasks before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Tasks.
  **/
  skip?: number
  distinct?: Enumerable<TaskDistinctFieldEnum>
}


/**
 * Task create
 */
export type TaskCreateArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
  /**
   * The data needed to create a Task.
  **/
  data: TaskCreateInput
}


/**
 * Task update
 */
export type TaskUpdateArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
  /**
   * The data needed to update a Task.
  **/
  data: TaskUpdateInput
  /**
   * Choose, which Task to update.
  **/
  where: TaskWhereUniqueInput
}


/**
 * Task updateMany
 */
export type TaskUpdateManyArgs = {
  data: TaskUpdateManyMutationInput
  where?: TaskWhereInput
}


/**
 * Task upsert
 */
export type TaskUpsertArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
  /**
   * The filter to search for the Task to update in case it exists.
  **/
  where: TaskWhereUniqueInput
  /**
   * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
  **/
  create: TaskCreateInput
  /**
   * In case the Task was found with the provided `where` argument, update it with this data.
  **/
  update: TaskUpdateInput
}


/**
 * Task delete
 */
export type TaskDeleteArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
  /**
   * Filter which Task to delete.
  **/
  where: TaskWhereUniqueInput
}


/**
 * Task deleteMany
 */
export type TaskDeleteManyArgs = {
  where?: TaskWhereInput
}


/**
 * Task without action
 */
export type TaskArgs = {
  /**
   * Select specific fields to fetch from the Task
  **/
  select?: XOR<TaskSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TaskInclude, null>
}



/**
 * Model Token
 */

export type Token = {
  id: number
  userId: number
  token: string
  ip: string | null
}


export type AggregateToken = {
  count: number
  avg: TokenAvgAggregateOutputType | null
  sum: TokenSumAggregateOutputType | null
  min: TokenMinAggregateOutputType | null
  max: TokenMaxAggregateOutputType | null
}

export type TokenAvgAggregateOutputType = {
  id: number
  userId: number
}

export type TokenSumAggregateOutputType = {
  id: number
  userId: number
}

export type TokenMinAggregateOutputType = {
  id: number
  userId: number
}

export type TokenMaxAggregateOutputType = {
  id: number
  userId: number
}


export type TokenAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type TokenSumAggregateInputType = {
  id?: true
  userId?: true
}

export type TokenMinAggregateInputType = {
  id?: true
  userId?: true
}

export type TokenMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateTokenArgs = {
  where?: TokenWhereInput
  orderBy?: XOR<Enumerable<TokenOrderByInput>, TokenOrderByInput>
  cursor?: TokenWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TokenDistinctFieldEnum>
  count?: true
  avg?: TokenAvgAggregateInputType
  sum?: TokenSumAggregateInputType
  min?: TokenMinAggregateInputType
  max?: TokenMaxAggregateInputType
}

export type GetTokenAggregateType<T extends AggregateTokenArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetTokenAggregateScalarType<T[P]>
}

export type GetTokenAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof TokenAvgAggregateOutputType ? TokenAvgAggregateOutputType[P] : never
}
    
    

export type TokenSelect = {
  id?: boolean
  userId?: boolean
  token?: boolean
  ip?: boolean
  User?: boolean | UserArgs
}

export type TokenInclude = {
  User?: boolean | UserArgs
}

export type TokenGetPayload<
  S extends boolean | null | undefined | TokenArgs,
  U = keyof S
> = S extends true
  ? Token
  : S extends undefined
  ? never
  : S extends TokenArgs | FindManyTokenArgs
  ? 'include' extends U
    ? Token  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Token ? Token[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Token
: Token


export interface TokenDelegate {
  /**
   * Find zero or one Token that matches the filter.
   * @param {FindOneTokenArgs} args - Arguments to find a Token
   * @example
   * // Get one Token
   * const token = await prisma.token.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTokenArgs>(
    args: Subset<T, FindOneTokenArgs>
  ): CheckSelect<T, Prisma__TokenClient<Token | null>, Prisma__TokenClient<TokenGetPayload<T> | null>>
  /**
   * Find the first Token that matches the filter.
   * @param {FindFirstTokenArgs} args - Arguments to find a Token
   * @example
   * // Get one Token
   * const token = await prisma.token.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstTokenArgs>(
    args?: Subset<T, FindFirstTokenArgs>
  ): CheckSelect<T, Prisma__TokenClient<Token | null>, Prisma__TokenClient<TokenGetPayload<T> | null>>
  /**
   * Find zero or more Tokens that matches the filter.
   * @param {FindManyTokenArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Tokens
   * const tokens = await prisma.token.findMany()
   * 
   * // Get first 10 Tokens
   * const tokens = await prisma.token.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTokenArgs>(
    args?: Subset<T, FindManyTokenArgs>
  ): CheckSelect<T, Promise<Array<Token>>, Promise<Array<TokenGetPayload<T>>>>
  /**
   * Create a Token.
   * @param {TokenCreateArgs} args - Arguments to create a Token.
   * @example
   * // Create one Token
   * const Token = await prisma.token.create({
   *   data: {
   *     // ... data to create a Token
   *   }
   * })
   * 
  **/
  create<T extends TokenCreateArgs>(
    args: Subset<T, TokenCreateArgs>
  ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>
  /**
   * Delete a Token.
   * @param {TokenDeleteArgs} args - Arguments to delete one Token.
   * @example
   * // Delete one Token
   * const Token = await prisma.token.delete({
   *   where: {
   *     // ... filter to delete one Token
   *   }
   * })
   * 
  **/
  delete<T extends TokenDeleteArgs>(
    args: Subset<T, TokenDeleteArgs>
  ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>
  /**
   * Update one Token.
   * @param {TokenUpdateArgs} args - Arguments to update one Token.
   * @example
   * // Update one Token
   * const token = await prisma.token.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TokenUpdateArgs>(
    args: Subset<T, TokenUpdateArgs>
  ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>
  /**
   * Delete zero or more Tokens.
   * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
   * @example
   * // Delete a few Tokens
   * const { count } = await prisma.token.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TokenDeleteManyArgs>(
    args: Subset<T, TokenDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Tokens.
   * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Tokens
   * const token = await prisma.token.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TokenUpdateManyArgs>(
    args: Subset<T, TokenUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Token.
   * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
   * @example
   * // Update or create a Token
   * const token = await prisma.token.upsert({
   *   create: {
   *     // ... data to create a Token
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Token we want to update
   *   }
   * })
  **/
  upsert<T extends TokenUpsertArgs>(
    args: Subset<T, TokenUpsertArgs>
  ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyTokenArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTokenArgs>(args: Subset<T, AggregateTokenArgs>): Promise<GetTokenAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Token.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TokenClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Token findOne
 */
export type FindOneTokenArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
  /**
   * Filter, which Token to fetch.
  **/
  where: TokenWhereUniqueInput
}


/**
 * Token findFirst
 */
export type FindFirstTokenArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
  /**
   * Filter, which Token to fetch.
  **/
  where?: TokenWhereInput
  orderBy?: XOR<Enumerable<TokenOrderByInput>, TokenOrderByInput>
  cursor?: TokenWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TokenDistinctFieldEnum>
}


/**
 * Token findMany
 */
export type FindManyTokenArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
  /**
   * Filter, which Tokens to fetch.
  **/
  where?: TokenWhereInput
  /**
   * Determine the order of the Tokens to fetch.
  **/
  orderBy?: XOR<Enumerable<TokenOrderByInput>, TokenOrderByInput>
  /**
   * Sets the position for listing Tokens.
  **/
  cursor?: TokenWhereUniqueInput
  /**
   * The number of Tokens to fetch. If negative number, it will take Tokens before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Tokens.
  **/
  skip?: number
  distinct?: Enumerable<TokenDistinctFieldEnum>
}


/**
 * Token create
 */
export type TokenCreateArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
  /**
   * The data needed to create a Token.
  **/
  data: TokenCreateInput
}


/**
 * Token update
 */
export type TokenUpdateArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
  /**
   * The data needed to update a Token.
  **/
  data: TokenUpdateInput
  /**
   * Choose, which Token to update.
  **/
  where: TokenWhereUniqueInput
}


/**
 * Token updateMany
 */
export type TokenUpdateManyArgs = {
  data: TokenUpdateManyMutationInput
  where?: TokenWhereInput
}


/**
 * Token upsert
 */
export type TokenUpsertArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
  /**
   * The filter to search for the Token to update in case it exists.
  **/
  where: TokenWhereUniqueInput
  /**
   * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
  **/
  create: TokenCreateInput
  /**
   * In case the Token was found with the provided `where` argument, update it with this data.
  **/
  update: TokenUpdateInput
}


/**
 * Token delete
 */
export type TokenDeleteArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
  /**
   * Filter which Token to delete.
  **/
  where: TokenWhereUniqueInput
}


/**
 * Token deleteMany
 */
export type TokenDeleteManyArgs = {
  where?: TokenWhereInput
}


/**
 * Token without action
 */
export type TokenArgs = {
  /**
   * Select specific fields to fetch from the Token
  **/
  select?: XOR<TokenSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<TokenInclude, null>
}



/**
 * Model User
 */

export type User = {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  password: string | null
  username: string | null
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  name?: boolean
  email?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deletedAt?: boolean
  password?: boolean
  username?: boolean
  Post?: boolean | FindManyPostArgs
  Profile?: boolean | ProfileArgs
  Task?: boolean | FindManyTaskArgs
  Token?: boolean | FindManyTokenArgs
  UserRole?: boolean | FindManyUserRoleArgs
}

export type UserInclude = {
  Post?: boolean | FindManyPostArgs
  Profile?: boolean | ProfileArgs
  Task?: boolean | FindManyTaskArgs
  Token?: boolean | FindManyTokenArgs
  UserRole?: boolean | FindManyUserRoleArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Post'
      ? Array<PostGetPayload<S['include'][P]>> :
      P extends 'Profile'
      ? ProfileGetPayload<S['include'][P]> | null :
      P extends 'Task'
      ? Array<TaskGetPayload<S['include'][P]>> :
      P extends 'Token'
      ? Array<TokenGetPayload<S['include'][P]>> :
      P extends 'UserRole'
      ? Array<UserRoleGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'Post'
      ? Array<PostGetPayload<S['select'][P]>> :
      P extends 'Profile'
      ? ProfileGetPayload<S['select'][P]> | null :
      P extends 'Task'
      ? Array<TaskGetPayload<S['select'][P]>> :
      P extends 'Token'
      ? Array<TokenGetPayload<S['select'][P]>> :
      P extends 'UserRole'
      ? Array<UserRoleGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Post<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  Profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>;

  Task<T extends FindManyTaskArgs = {}>(args?: Subset<T, FindManyTaskArgs>): CheckSelect<T, Promise<Array<Task>>, Promise<Array<TaskGetPayload<T>>>>;

  Token<T extends FindManyTokenArgs = {}>(args?: Subset<T, FindManyTokenArgs>): CheckSelect<T, Promise<Array<Token>>, Promise<Array<TokenGetPayload<T>>>>;

  UserRole<T extends FindManyUserRoleArgs = {}>(args?: Subset<T, FindManyUserRoleArgs>): CheckSelect<T, Promise<Array<UserRole>>, Promise<Array<UserRoleGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
}



/**
 * Model Permission
 */

export type Permission = {
  id: number
  name: string
}


export type AggregatePermission = {
  count: number
  avg: PermissionAvgAggregateOutputType | null
  sum: PermissionSumAggregateOutputType | null
  min: PermissionMinAggregateOutputType | null
  max: PermissionMaxAggregateOutputType | null
}

export type PermissionAvgAggregateOutputType = {
  id: number
}

export type PermissionSumAggregateOutputType = {
  id: number
}

export type PermissionMinAggregateOutputType = {
  id: number
}

export type PermissionMaxAggregateOutputType = {
  id: number
}


export type PermissionAvgAggregateInputType = {
  id?: true
}

export type PermissionSumAggregateInputType = {
  id?: true
}

export type PermissionMinAggregateInputType = {
  id?: true
}

export type PermissionMaxAggregateInputType = {
  id?: true
}

export type AggregatePermissionArgs = {
  where?: PermissionWhereInput
  orderBy?: XOR<Enumerable<PermissionOrderByInput>, PermissionOrderByInput>
  cursor?: PermissionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PermissionDistinctFieldEnum>
  count?: true
  avg?: PermissionAvgAggregateInputType
  sum?: PermissionSumAggregateInputType
  min?: PermissionMinAggregateInputType
  max?: PermissionMaxAggregateInputType
}

export type GetPermissionAggregateType<T extends AggregatePermissionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPermissionAggregateScalarType<T[P]>
}

export type GetPermissionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PermissionAvgAggregateOutputType ? PermissionAvgAggregateOutputType[P] : never
}
    
    

export type PermissionSelect = {
  id?: boolean
  name?: boolean
  RolePermission?: boolean | FindManyRolePermissionArgs
}

export type PermissionInclude = {
  RolePermission?: boolean | FindManyRolePermissionArgs
}

export type PermissionGetPayload<
  S extends boolean | null | undefined | PermissionArgs,
  U = keyof S
> = S extends true
  ? Permission
  : S extends undefined
  ? never
  : S extends PermissionArgs | FindManyPermissionArgs
  ? 'include' extends U
    ? Permission  & {
      [P in TrueKeys<S['include']>]:
      P extends 'RolePermission'
      ? Array<RolePermissionGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Permission ? Permission[P]
: 
      P extends 'RolePermission'
      ? Array<RolePermissionGetPayload<S['select'][P]>> : never
    }
  : Permission
: Permission


export interface PermissionDelegate {
  /**
   * Find zero or one Permission that matches the filter.
   * @param {FindOnePermissionArgs} args - Arguments to find a Permission
   * @example
   * // Get one Permission
   * const permission = await prisma.permission.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePermissionArgs>(
    args: Subset<T, FindOnePermissionArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission | null>, Prisma__PermissionClient<PermissionGetPayload<T> | null>>
  /**
   * Find the first Permission that matches the filter.
   * @param {FindFirstPermissionArgs} args - Arguments to find a Permission
   * @example
   * // Get one Permission
   * const permission = await prisma.permission.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstPermissionArgs>(
    args?: Subset<T, FindFirstPermissionArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission | null>, Prisma__PermissionClient<PermissionGetPayload<T> | null>>
  /**
   * Find zero or more Permissions that matches the filter.
   * @param {FindManyPermissionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Permissions
   * const permissions = await prisma.permission.findMany()
   * 
   * // Get first 10 Permissions
   * const permissions = await prisma.permission.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPermissionArgs>(
    args?: Subset<T, FindManyPermissionArgs>
  ): CheckSelect<T, Promise<Array<Permission>>, Promise<Array<PermissionGetPayload<T>>>>
  /**
   * Create a Permission.
   * @param {PermissionCreateArgs} args - Arguments to create a Permission.
   * @example
   * // Create one Permission
   * const Permission = await prisma.permission.create({
   *   data: {
   *     // ... data to create a Permission
   *   }
   * })
   * 
  **/
  create<T extends PermissionCreateArgs>(
    args: Subset<T, PermissionCreateArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Delete a Permission.
   * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
   * @example
   * // Delete one Permission
   * const Permission = await prisma.permission.delete({
   *   where: {
   *     // ... filter to delete one Permission
   *   }
   * })
   * 
  **/
  delete<T extends PermissionDeleteArgs>(
    args: Subset<T, PermissionDeleteArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Update one Permission.
   * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
   * @example
   * // Update one Permission
   * const permission = await prisma.permission.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PermissionUpdateArgs>(
    args: Subset<T, PermissionUpdateArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Delete zero or more Permissions.
   * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
   * @example
   * // Delete a few Permissions
   * const { count } = await prisma.permission.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PermissionDeleteManyArgs>(
    args: Subset<T, PermissionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Permissions.
   * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Permissions
   * const permission = await prisma.permission.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PermissionUpdateManyArgs>(
    args: Subset<T, PermissionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Permission.
   * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
   * @example
   * // Update or create a Permission
   * const permission = await prisma.permission.upsert({
   *   create: {
   *     // ... data to create a Permission
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Permission we want to update
   *   }
   * })
  **/
  upsert<T extends PermissionUpsertArgs>(
    args: Subset<T, PermissionUpsertArgs>
  ): CheckSelect<T, Prisma__PermissionClient<Permission>, Prisma__PermissionClient<PermissionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPermissionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePermissionArgs>(args: Subset<T, AggregatePermissionArgs>): Promise<GetPermissionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Permission.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PermissionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  RolePermission<T extends FindManyRolePermissionArgs = {}>(args?: Subset<T, FindManyRolePermissionArgs>): CheckSelect<T, Promise<Array<RolePermission>>, Promise<Array<RolePermissionGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Permission findOne
 */
export type FindOnePermissionArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
  /**
   * Filter, which Permission to fetch.
  **/
  where: PermissionWhereUniqueInput
}


/**
 * Permission findFirst
 */
export type FindFirstPermissionArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
  /**
   * Filter, which Permission to fetch.
  **/
  where?: PermissionWhereInput
  orderBy?: XOR<Enumerable<PermissionOrderByInput>, PermissionOrderByInput>
  cursor?: PermissionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PermissionDistinctFieldEnum>
}


/**
 * Permission findMany
 */
export type FindManyPermissionArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
  /**
   * Filter, which Permissions to fetch.
  **/
  where?: PermissionWhereInput
  /**
   * Determine the order of the Permissions to fetch.
  **/
  orderBy?: XOR<Enumerable<PermissionOrderByInput>, PermissionOrderByInput>
  /**
   * Sets the position for listing Permissions.
  **/
  cursor?: PermissionWhereUniqueInput
  /**
   * The number of Permissions to fetch. If negative number, it will take Permissions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Permissions.
  **/
  skip?: number
  distinct?: Enumerable<PermissionDistinctFieldEnum>
}


/**
 * Permission create
 */
export type PermissionCreateArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
  /**
   * The data needed to create a Permission.
  **/
  data: PermissionCreateInput
}


/**
 * Permission update
 */
export type PermissionUpdateArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
  /**
   * The data needed to update a Permission.
  **/
  data: PermissionUpdateInput
  /**
   * Choose, which Permission to update.
  **/
  where: PermissionWhereUniqueInput
}


/**
 * Permission updateMany
 */
export type PermissionUpdateManyArgs = {
  data: PermissionUpdateManyMutationInput
  where?: PermissionWhereInput
}


/**
 * Permission upsert
 */
export type PermissionUpsertArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
  /**
   * The filter to search for the Permission to update in case it exists.
  **/
  where: PermissionWhereUniqueInput
  /**
   * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
  **/
  create: PermissionCreateInput
  /**
   * In case the Permission was found with the provided `where` argument, update it with this data.
  **/
  update: PermissionUpdateInput
}


/**
 * Permission delete
 */
export type PermissionDeleteArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
  /**
   * Filter which Permission to delete.
  **/
  where: PermissionWhereUniqueInput
}


/**
 * Permission deleteMany
 */
export type PermissionDeleteManyArgs = {
  where?: PermissionWhereInput
}


/**
 * Permission without action
 */
export type PermissionArgs = {
  /**
   * Select specific fields to fetch from the Permission
  **/
  select?: XOR<PermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<PermissionInclude, null>
}



/**
 * Model Role
 */

export type Role = {
  id: number
  name: string
}


export type AggregateRole = {
  count: number
  avg: RoleAvgAggregateOutputType | null
  sum: RoleSumAggregateOutputType | null
  min: RoleMinAggregateOutputType | null
  max: RoleMaxAggregateOutputType | null
}

export type RoleAvgAggregateOutputType = {
  id: number
}

export type RoleSumAggregateOutputType = {
  id: number
}

export type RoleMinAggregateOutputType = {
  id: number
}

export type RoleMaxAggregateOutputType = {
  id: number
}


export type RoleAvgAggregateInputType = {
  id?: true
}

export type RoleSumAggregateInputType = {
  id?: true
}

export type RoleMinAggregateInputType = {
  id?: true
}

export type RoleMaxAggregateInputType = {
  id?: true
}

export type AggregateRoleArgs = {
  where?: RoleWhereInput
  orderBy?: XOR<Enumerable<RoleOrderByInput>, RoleOrderByInput>
  cursor?: RoleWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RoleDistinctFieldEnum>
  count?: true
  avg?: RoleAvgAggregateInputType
  sum?: RoleSumAggregateInputType
  min?: RoleMinAggregateInputType
  max?: RoleMaxAggregateInputType
}

export type GetRoleAggregateType<T extends AggregateRoleArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRoleAggregateScalarType<T[P]>
}

export type GetRoleAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RoleAvgAggregateOutputType ? RoleAvgAggregateOutputType[P] : never
}
    
    

export type RoleSelect = {
  id?: boolean
  name?: boolean
  RolePermission?: boolean | FindManyRolePermissionArgs
  UserRole?: boolean | FindManyUserRoleArgs
}

export type RoleInclude = {
  RolePermission?: boolean | FindManyRolePermissionArgs
  UserRole?: boolean | FindManyUserRoleArgs
}

export type RoleGetPayload<
  S extends boolean | null | undefined | RoleArgs,
  U = keyof S
> = S extends true
  ? Role
  : S extends undefined
  ? never
  : S extends RoleArgs | FindManyRoleArgs
  ? 'include' extends U
    ? Role  & {
      [P in TrueKeys<S['include']>]:
      P extends 'RolePermission'
      ? Array<RolePermissionGetPayload<S['include'][P]>> :
      P extends 'UserRole'
      ? Array<UserRoleGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Role ? Role[P]
: 
      P extends 'RolePermission'
      ? Array<RolePermissionGetPayload<S['select'][P]>> :
      P extends 'UserRole'
      ? Array<UserRoleGetPayload<S['select'][P]>> : never
    }
  : Role
: Role


export interface RoleDelegate {
  /**
   * Find zero or one Role that matches the filter.
   * @param {FindOneRoleArgs} args - Arguments to find a Role
   * @example
   * // Get one Role
   * const role = await prisma.role.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRoleArgs>(
    args: Subset<T, FindOneRoleArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role | null>, Prisma__RoleClient<RoleGetPayload<T> | null>>
  /**
   * Find the first Role that matches the filter.
   * @param {FindFirstRoleArgs} args - Arguments to find a Role
   * @example
   * // Get one Role
   * const role = await prisma.role.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstRoleArgs>(
    args?: Subset<T, FindFirstRoleArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role | null>, Prisma__RoleClient<RoleGetPayload<T> | null>>
  /**
   * Find zero or more Roles that matches the filter.
   * @param {FindManyRoleArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Roles
   * const roles = await prisma.role.findMany()
   * 
   * // Get first 10 Roles
   * const roles = await prisma.role.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRoleArgs>(
    args?: Subset<T, FindManyRoleArgs>
  ): CheckSelect<T, Promise<Array<Role>>, Promise<Array<RoleGetPayload<T>>>>
  /**
   * Create a Role.
   * @param {RoleCreateArgs} args - Arguments to create a Role.
   * @example
   * // Create one Role
   * const Role = await prisma.role.create({
   *   data: {
   *     // ... data to create a Role
   *   }
   * })
   * 
  **/
  create<T extends RoleCreateArgs>(
    args: Subset<T, RoleCreateArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Delete a Role.
   * @param {RoleDeleteArgs} args - Arguments to delete one Role.
   * @example
   * // Delete one Role
   * const Role = await prisma.role.delete({
   *   where: {
   *     // ... filter to delete one Role
   *   }
   * })
   * 
  **/
  delete<T extends RoleDeleteArgs>(
    args: Subset<T, RoleDeleteArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Update one Role.
   * @param {RoleUpdateArgs} args - Arguments to update one Role.
   * @example
   * // Update one Role
   * const role = await prisma.role.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RoleUpdateArgs>(
    args: Subset<T, RoleUpdateArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Delete zero or more Roles.
   * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
   * @example
   * // Delete a few Roles
   * const { count } = await prisma.role.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RoleDeleteManyArgs>(
    args: Subset<T, RoleDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Roles.
   * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Roles
   * const role = await prisma.role.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RoleUpdateManyArgs>(
    args: Subset<T, RoleUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Role.
   * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
   * @example
   * // Update or create a Role
   * const role = await prisma.role.upsert({
   *   create: {
   *     // ... data to create a Role
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Role we want to update
   *   }
   * })
  **/
  upsert<T extends RoleUpsertArgs>(
    args: Subset<T, RoleUpsertArgs>
  ): CheckSelect<T, Prisma__RoleClient<Role>, Prisma__RoleClient<RoleGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRoleArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRoleArgs>(args: Subset<T, AggregateRoleArgs>): Promise<GetRoleAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Role.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RoleClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  RolePermission<T extends FindManyRolePermissionArgs = {}>(args?: Subset<T, FindManyRolePermissionArgs>): CheckSelect<T, Promise<Array<RolePermission>>, Promise<Array<RolePermissionGetPayload<T>>>>;

  UserRole<T extends FindManyUserRoleArgs = {}>(args?: Subset<T, FindManyUserRoleArgs>): CheckSelect<T, Promise<Array<UserRole>>, Promise<Array<UserRoleGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Role findOne
 */
export type FindOneRoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
  /**
   * Filter, which Role to fetch.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role findFirst
 */
export type FindFirstRoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
  /**
   * Filter, which Role to fetch.
  **/
  where?: RoleWhereInput
  orderBy?: XOR<Enumerable<RoleOrderByInput>, RoleOrderByInput>
  cursor?: RoleWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RoleDistinctFieldEnum>
}


/**
 * Role findMany
 */
export type FindManyRoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
  /**
   * Filter, which Roles to fetch.
  **/
  where?: RoleWhereInput
  /**
   * Determine the order of the Roles to fetch.
  **/
  orderBy?: XOR<Enumerable<RoleOrderByInput>, RoleOrderByInput>
  /**
   * Sets the position for listing Roles.
  **/
  cursor?: RoleWhereUniqueInput
  /**
   * The number of Roles to fetch. If negative number, it will take Roles before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Roles.
  **/
  skip?: number
  distinct?: Enumerable<RoleDistinctFieldEnum>
}


/**
 * Role create
 */
export type RoleCreateArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
  /**
   * The data needed to create a Role.
  **/
  data: RoleCreateInput
}


/**
 * Role update
 */
export type RoleUpdateArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
  /**
   * The data needed to update a Role.
  **/
  data: RoleUpdateInput
  /**
   * Choose, which Role to update.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role updateMany
 */
export type RoleUpdateManyArgs = {
  data: RoleUpdateManyMutationInput
  where?: RoleWhereInput
}


/**
 * Role upsert
 */
export type RoleUpsertArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
  /**
   * The filter to search for the Role to update in case it exists.
  **/
  where: RoleWhereUniqueInput
  /**
   * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
  **/
  create: RoleCreateInput
  /**
   * In case the Role was found with the provided `where` argument, update it with this data.
  **/
  update: RoleUpdateInput
}


/**
 * Role delete
 */
export type RoleDeleteArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
  /**
   * Filter which Role to delete.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role deleteMany
 */
export type RoleDeleteManyArgs = {
  where?: RoleWhereInput
}


/**
 * Role without action
 */
export type RoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: XOR<RoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RoleInclude, null>
}



/**
 * Model RolePermission
 */

export type RolePermission = {
  id: number
  roleId: number
  permissionId: number
}


export type AggregateRolePermission = {
  count: number
  avg: RolePermissionAvgAggregateOutputType | null
  sum: RolePermissionSumAggregateOutputType | null
  min: RolePermissionMinAggregateOutputType | null
  max: RolePermissionMaxAggregateOutputType | null
}

export type RolePermissionAvgAggregateOutputType = {
  id: number
  roleId: number
  permissionId: number
}

export type RolePermissionSumAggregateOutputType = {
  id: number
  roleId: number
  permissionId: number
}

export type RolePermissionMinAggregateOutputType = {
  id: number
  roleId: number
  permissionId: number
}

export type RolePermissionMaxAggregateOutputType = {
  id: number
  roleId: number
  permissionId: number
}


export type RolePermissionAvgAggregateInputType = {
  id?: true
  roleId?: true
  permissionId?: true
}

export type RolePermissionSumAggregateInputType = {
  id?: true
  roleId?: true
  permissionId?: true
}

export type RolePermissionMinAggregateInputType = {
  id?: true
  roleId?: true
  permissionId?: true
}

export type RolePermissionMaxAggregateInputType = {
  id?: true
  roleId?: true
  permissionId?: true
}

export type AggregateRolePermissionArgs = {
  where?: RolePermissionWhereInput
  orderBy?: XOR<Enumerable<RolePermissionOrderByInput>, RolePermissionOrderByInput>
  cursor?: RolePermissionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RolePermissionDistinctFieldEnum>
  count?: true
  avg?: RolePermissionAvgAggregateInputType
  sum?: RolePermissionSumAggregateInputType
  min?: RolePermissionMinAggregateInputType
  max?: RolePermissionMaxAggregateInputType
}

export type GetRolePermissionAggregateType<T extends AggregateRolePermissionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRolePermissionAggregateScalarType<T[P]>
}

export type GetRolePermissionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RolePermissionAvgAggregateOutputType ? RolePermissionAvgAggregateOutputType[P] : never
}
    
    

export type RolePermissionSelect = {
  id?: boolean
  roleId?: boolean
  permissionId?: boolean
  Permission?: boolean | PermissionArgs
  Role?: boolean | RoleArgs
}

export type RolePermissionInclude = {
  Permission?: boolean | PermissionArgs
  Role?: boolean | RoleArgs
}

export type RolePermissionGetPayload<
  S extends boolean | null | undefined | RolePermissionArgs,
  U = keyof S
> = S extends true
  ? RolePermission
  : S extends undefined
  ? never
  : S extends RolePermissionArgs | FindManyRolePermissionArgs
  ? 'include' extends U
    ? RolePermission  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Permission'
      ? PermissionGetPayload<S['include'][P]> :
      P extends 'Role'
      ? RoleGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof RolePermission ? RolePermission[P]
: 
      P extends 'Permission'
      ? PermissionGetPayload<S['select'][P]> :
      P extends 'Role'
      ? RoleGetPayload<S['select'][P]> : never
    }
  : RolePermission
: RolePermission


export interface RolePermissionDelegate {
  /**
   * Find zero or one RolePermission that matches the filter.
   * @param {FindOneRolePermissionArgs} args - Arguments to find a RolePermission
   * @example
   * // Get one RolePermission
   * const rolePermission = await prisma.rolePermission.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRolePermissionArgs>(
    args: Subset<T, FindOneRolePermissionArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission | null>, Prisma__RolePermissionClient<RolePermissionGetPayload<T> | null>>
  /**
   * Find the first RolePermission that matches the filter.
   * @param {FindFirstRolePermissionArgs} args - Arguments to find a RolePermission
   * @example
   * // Get one RolePermission
   * const rolePermission = await prisma.rolePermission.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstRolePermissionArgs>(
    args?: Subset<T, FindFirstRolePermissionArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission | null>, Prisma__RolePermissionClient<RolePermissionGetPayload<T> | null>>
  /**
   * Find zero or more RolePermissions that matches the filter.
   * @param {FindManyRolePermissionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all RolePermissions
   * const rolePermissions = await prisma.rolePermission.findMany()
   * 
   * // Get first 10 RolePermissions
   * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const rolePermissionWithIdOnly = await prisma.rolePermission.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRolePermissionArgs>(
    args?: Subset<T, FindManyRolePermissionArgs>
  ): CheckSelect<T, Promise<Array<RolePermission>>, Promise<Array<RolePermissionGetPayload<T>>>>
  /**
   * Create a RolePermission.
   * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
   * @example
   * // Create one RolePermission
   * const RolePermission = await prisma.rolePermission.create({
   *   data: {
   *     // ... data to create a RolePermission
   *   }
   * })
   * 
  **/
  create<T extends RolePermissionCreateArgs>(
    args: Subset<T, RolePermissionCreateArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Delete a RolePermission.
   * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
   * @example
   * // Delete one RolePermission
   * const RolePermission = await prisma.rolePermission.delete({
   *   where: {
   *     // ... filter to delete one RolePermission
   *   }
   * })
   * 
  **/
  delete<T extends RolePermissionDeleteArgs>(
    args: Subset<T, RolePermissionDeleteArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Update one RolePermission.
   * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
   * @example
   * // Update one RolePermission
   * const rolePermission = await prisma.rolePermission.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RolePermissionUpdateArgs>(
    args: Subset<T, RolePermissionUpdateArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Delete zero or more RolePermissions.
   * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
   * @example
   * // Delete a few RolePermissions
   * const { count } = await prisma.rolePermission.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RolePermissionDeleteManyArgs>(
    args: Subset<T, RolePermissionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more RolePermissions.
   * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many RolePermissions
   * const rolePermission = await prisma.rolePermission.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RolePermissionUpdateManyArgs>(
    args: Subset<T, RolePermissionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one RolePermission.
   * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
   * @example
   * // Update or create a RolePermission
   * const rolePermission = await prisma.rolePermission.upsert({
   *   create: {
   *     // ... data to create a RolePermission
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the RolePermission we want to update
   *   }
   * })
  **/
  upsert<T extends RolePermissionUpsertArgs>(
    args: Subset<T, RolePermissionUpsertArgs>
  ): CheckSelect<T, Prisma__RolePermissionClient<RolePermission>, Prisma__RolePermissionClient<RolePermissionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRolePermissionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRolePermissionArgs>(args: Subset<T, AggregateRolePermissionArgs>): Promise<GetRolePermissionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for RolePermission.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RolePermissionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Permission<T extends PermissionArgs = {}>(args?: Subset<T, PermissionArgs>): CheckSelect<T, Prisma__PermissionClient<Permission | null>, Prisma__PermissionClient<PermissionGetPayload<T> | null>>;

  Role<T extends RoleArgs = {}>(args?: Subset<T, RoleArgs>): CheckSelect<T, Prisma__RoleClient<Role | null>, Prisma__RoleClient<RoleGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * RolePermission findOne
 */
export type FindOneRolePermissionArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
  /**
   * Filter, which RolePermission to fetch.
  **/
  where: RolePermissionWhereUniqueInput
}


/**
 * RolePermission findFirst
 */
export type FindFirstRolePermissionArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
  /**
   * Filter, which RolePermission to fetch.
  **/
  where?: RolePermissionWhereInput
  orderBy?: XOR<Enumerable<RolePermissionOrderByInput>, RolePermissionOrderByInput>
  cursor?: RolePermissionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RolePermissionDistinctFieldEnum>
}


/**
 * RolePermission findMany
 */
export type FindManyRolePermissionArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
  /**
   * Filter, which RolePermissions to fetch.
  **/
  where?: RolePermissionWhereInput
  /**
   * Determine the order of the RolePermissions to fetch.
  **/
  orderBy?: XOR<Enumerable<RolePermissionOrderByInput>, RolePermissionOrderByInput>
  /**
   * Sets the position for listing RolePermissions.
  **/
  cursor?: RolePermissionWhereUniqueInput
  /**
   * The number of RolePermissions to fetch. If negative number, it will take RolePermissions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` RolePermissions.
  **/
  skip?: number
  distinct?: Enumerable<RolePermissionDistinctFieldEnum>
}


/**
 * RolePermission create
 */
export type RolePermissionCreateArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
  /**
   * The data needed to create a RolePermission.
  **/
  data: RolePermissionCreateInput
}


/**
 * RolePermission update
 */
export type RolePermissionUpdateArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
  /**
   * The data needed to update a RolePermission.
  **/
  data: RolePermissionUpdateInput
  /**
   * Choose, which RolePermission to update.
  **/
  where: RolePermissionWhereUniqueInput
}


/**
 * RolePermission updateMany
 */
export type RolePermissionUpdateManyArgs = {
  data: RolePermissionUpdateManyMutationInput
  where?: RolePermissionWhereInput
}


/**
 * RolePermission upsert
 */
export type RolePermissionUpsertArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
  /**
   * The filter to search for the RolePermission to update in case it exists.
  **/
  where: RolePermissionWhereUniqueInput
  /**
   * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
  **/
  create: RolePermissionCreateInput
  /**
   * In case the RolePermission was found with the provided `where` argument, update it with this data.
  **/
  update: RolePermissionUpdateInput
}


/**
 * RolePermission delete
 */
export type RolePermissionDeleteArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
  /**
   * Filter which RolePermission to delete.
  **/
  where: RolePermissionWhereUniqueInput
}


/**
 * RolePermission deleteMany
 */
export type RolePermissionDeleteManyArgs = {
  where?: RolePermissionWhereInput
}


/**
 * RolePermission without action
 */
export type RolePermissionArgs = {
  /**
   * Select specific fields to fetch from the RolePermission
  **/
  select?: XOR<RolePermissionSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<RolePermissionInclude, null>
}



/**
 * Model UserRole
 */

export type UserRole = {
  id: number
  userId: number
  roleId: number
}


export type AggregateUserRole = {
  count: number
  avg: UserRoleAvgAggregateOutputType | null
  sum: UserRoleSumAggregateOutputType | null
  min: UserRoleMinAggregateOutputType | null
  max: UserRoleMaxAggregateOutputType | null
}

export type UserRoleAvgAggregateOutputType = {
  id: number
  userId: number
  roleId: number
}

export type UserRoleSumAggregateOutputType = {
  id: number
  userId: number
  roleId: number
}

export type UserRoleMinAggregateOutputType = {
  id: number
  userId: number
  roleId: number
}

export type UserRoleMaxAggregateOutputType = {
  id: number
  userId: number
  roleId: number
}


export type UserRoleAvgAggregateInputType = {
  id?: true
  userId?: true
  roleId?: true
}

export type UserRoleSumAggregateInputType = {
  id?: true
  userId?: true
  roleId?: true
}

export type UserRoleMinAggregateInputType = {
  id?: true
  userId?: true
  roleId?: true
}

export type UserRoleMaxAggregateInputType = {
  id?: true
  userId?: true
  roleId?: true
}

export type AggregateUserRoleArgs = {
  where?: UserRoleWhereInput
  orderBy?: XOR<Enumerable<UserRoleOrderByInput>, UserRoleOrderByInput>
  cursor?: UserRoleWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserRoleDistinctFieldEnum>
  count?: true
  avg?: UserRoleAvgAggregateInputType
  sum?: UserRoleSumAggregateInputType
  min?: UserRoleMinAggregateInputType
  max?: UserRoleMaxAggregateInputType
}

export type GetUserRoleAggregateType<T extends AggregateUserRoleArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserRoleAggregateScalarType<T[P]>
}

export type GetUserRoleAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserRoleAvgAggregateOutputType ? UserRoleAvgAggregateOutputType[P] : never
}
    
    

export type UserRoleSelect = {
  id?: boolean
  userId?: boolean
  roleId?: boolean
  Role?: boolean | RoleArgs
  User?: boolean | UserArgs
}

export type UserRoleInclude = {
  Role?: boolean | RoleArgs
  User?: boolean | UserArgs
}

export type UserRoleGetPayload<
  S extends boolean | null | undefined | UserRoleArgs,
  U = keyof S
> = S extends true
  ? UserRole
  : S extends undefined
  ? never
  : S extends UserRoleArgs | FindManyUserRoleArgs
  ? 'include' extends U
    ? UserRole  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Role'
      ? RoleGetPayload<S['include'][P]> :
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof UserRole ? UserRole[P]
: 
      P extends 'Role'
      ? RoleGetPayload<S['select'][P]> :
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : UserRole
: UserRole


export interface UserRoleDelegate {
  /**
   * Find zero or one UserRole that matches the filter.
   * @param {FindOneUserRoleArgs} args - Arguments to find a UserRole
   * @example
   * // Get one UserRole
   * const userRole = await prisma.userRole.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserRoleArgs>(
    args: Subset<T, FindOneUserRoleArgs>
  ): CheckSelect<T, Prisma__UserRoleClient<UserRole | null>, Prisma__UserRoleClient<UserRoleGetPayload<T> | null>>
  /**
   * Find the first UserRole that matches the filter.
   * @param {FindFirstUserRoleArgs} args - Arguments to find a UserRole
   * @example
   * // Get one UserRole
   * const userRole = await prisma.userRole.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserRoleArgs>(
    args?: Subset<T, FindFirstUserRoleArgs>
  ): CheckSelect<T, Prisma__UserRoleClient<UserRole | null>, Prisma__UserRoleClient<UserRoleGetPayload<T> | null>>
  /**
   * Find zero or more UserRoles that matches the filter.
   * @param {FindManyUserRoleArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all UserRoles
   * const userRoles = await prisma.userRole.findMany()
   * 
   * // Get first 10 UserRoles
   * const userRoles = await prisma.userRole.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userRoleWithIdOnly = await prisma.userRole.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserRoleArgs>(
    args?: Subset<T, FindManyUserRoleArgs>
  ): CheckSelect<T, Promise<Array<UserRole>>, Promise<Array<UserRoleGetPayload<T>>>>
  /**
   * Create a UserRole.
   * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
   * @example
   * // Create one UserRole
   * const UserRole = await prisma.userRole.create({
   *   data: {
   *     // ... data to create a UserRole
   *   }
   * })
   * 
  **/
  create<T extends UserRoleCreateArgs>(
    args: Subset<T, UserRoleCreateArgs>
  ): CheckSelect<T, Prisma__UserRoleClient<UserRole>, Prisma__UserRoleClient<UserRoleGetPayload<T>>>
  /**
   * Delete a UserRole.
   * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
   * @example
   * // Delete one UserRole
   * const UserRole = await prisma.userRole.delete({
   *   where: {
   *     // ... filter to delete one UserRole
   *   }
   * })
   * 
  **/
  delete<T extends UserRoleDeleteArgs>(
    args: Subset<T, UserRoleDeleteArgs>
  ): CheckSelect<T, Prisma__UserRoleClient<UserRole>, Prisma__UserRoleClient<UserRoleGetPayload<T>>>
  /**
   * Update one UserRole.
   * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
   * @example
   * // Update one UserRole
   * const userRole = await prisma.userRole.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserRoleUpdateArgs>(
    args: Subset<T, UserRoleUpdateArgs>
  ): CheckSelect<T, Prisma__UserRoleClient<UserRole>, Prisma__UserRoleClient<UserRoleGetPayload<T>>>
  /**
   * Delete zero or more UserRoles.
   * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
   * @example
   * // Delete a few UserRoles
   * const { count } = await prisma.userRole.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserRoleDeleteManyArgs>(
    args: Subset<T, UserRoleDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more UserRoles.
   * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many UserRoles
   * const userRole = await prisma.userRole.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserRoleUpdateManyArgs>(
    args: Subset<T, UserRoleUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one UserRole.
   * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
   * @example
   * // Update or create a UserRole
   * const userRole = await prisma.userRole.upsert({
   *   create: {
   *     // ... data to create a UserRole
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the UserRole we want to update
   *   }
   * })
  **/
  upsert<T extends UserRoleUpsertArgs>(
    args: Subset<T, UserRoleUpsertArgs>
  ): CheckSelect<T, Prisma__UserRoleClient<UserRole>, Prisma__UserRoleClient<UserRoleGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserRoleArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserRoleArgs>(args: Subset<T, AggregateUserRoleArgs>): Promise<GetUserRoleAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for UserRole.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserRoleClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Role<T extends RoleArgs = {}>(args?: Subset<T, RoleArgs>): CheckSelect<T, Prisma__RoleClient<Role | null>, Prisma__RoleClient<RoleGetPayload<T> | null>>;

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * UserRole findOne
 */
export type FindOneUserRoleArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
  /**
   * Filter, which UserRole to fetch.
  **/
  where: UserRoleWhereUniqueInput
}


/**
 * UserRole findFirst
 */
export type FindFirstUserRoleArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
  /**
   * Filter, which UserRole to fetch.
  **/
  where?: UserRoleWhereInput
  orderBy?: XOR<Enumerable<UserRoleOrderByInput>, UserRoleOrderByInput>
  cursor?: UserRoleWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserRoleDistinctFieldEnum>
}


/**
 * UserRole findMany
 */
export type FindManyUserRoleArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
  /**
   * Filter, which UserRoles to fetch.
  **/
  where?: UserRoleWhereInput
  /**
   * Determine the order of the UserRoles to fetch.
  **/
  orderBy?: XOR<Enumerable<UserRoleOrderByInput>, UserRoleOrderByInput>
  /**
   * Sets the position for listing UserRoles.
  **/
  cursor?: UserRoleWhereUniqueInput
  /**
   * The number of UserRoles to fetch. If negative number, it will take UserRoles before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` UserRoles.
  **/
  skip?: number
  distinct?: Enumerable<UserRoleDistinctFieldEnum>
}


/**
 * UserRole create
 */
export type UserRoleCreateArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
  /**
   * The data needed to create a UserRole.
  **/
  data: UserRoleCreateInput
}


/**
 * UserRole update
 */
export type UserRoleUpdateArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
  /**
   * The data needed to update a UserRole.
  **/
  data: UserRoleUpdateInput
  /**
   * Choose, which UserRole to update.
  **/
  where: UserRoleWhereUniqueInput
}


/**
 * UserRole updateMany
 */
export type UserRoleUpdateManyArgs = {
  data: UserRoleUpdateManyMutationInput
  where?: UserRoleWhereInput
}


/**
 * UserRole upsert
 */
export type UserRoleUpsertArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
  /**
   * The filter to search for the UserRole to update in case it exists.
  **/
  where: UserRoleWhereUniqueInput
  /**
   * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
  **/
  create: UserRoleCreateInput
  /**
   * In case the UserRole was found with the provided `where` argument, update it with this data.
  **/
  update: UserRoleUpdateInput
}


/**
 * UserRole delete
 */
export type UserRoleDeleteArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
  /**
   * Filter which UserRole to delete.
  **/
  where: UserRoleWhereUniqueInput
}


/**
 * UserRole deleteMany
 */
export type UserRoleDeleteManyArgs = {
  where?: UserRoleWhereInput
}


/**
 * UserRole without action
 */
export type UserRoleArgs = {
  /**
   * Select specific fields to fetch from the UserRole
  **/
  select?: XOR<UserRoleSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserRoleInclude, null>
}



/**
 * Deep Input Types
 */


export type PostWhereInput = {
  AND?: XOR<PostWhereInput, Enumerable<PostWhereInput>>
  OR?: XOR<PostWhereInput, Enumerable<PostWhereInput>>
  NOT?: XOR<PostWhereInput, Enumerable<PostWhereInput>>
  id?: XOR<IntFilter, number>
  title?: XOR<StringFilter, string>
  createdAt?: XOR<DateTimeFilter, Date | string>
  content?: StringNullableFilter | string | null
  published?: XOR<BoolFilter, boolean>
  authorId?: XOR<IntFilter, number>
  User?: XOR<UserRelationFilter, UserWhereInput>
}

export type PostOrderByInput = {
  id?: SortOrder
  title?: SortOrder
  createdAt?: SortOrder
  content?: SortOrder
  published?: SortOrder
  authorId?: SortOrder
}

export type PostWhereUniqueInput = {
  id?: number
}

export type ProfileWhereInput = {
  AND?: XOR<ProfileWhereInput, Enumerable<ProfileWhereInput>>
  OR?: XOR<ProfileWhereInput, Enumerable<ProfileWhereInput>>
  NOT?: XOR<ProfileWhereInput, Enumerable<ProfileWhereInput>>
  id?: XOR<IntFilter, number>
  bio?: StringNullableFilter | string | null
  userId?: XOR<IntFilter, number>
  User?: XOR<UserRelationFilter, UserWhereInput>
}

export type ProfileOrderByInput = {
  id?: SortOrder
  bio?: SortOrder
  userId?: SortOrder
}

export type ProfileWhereUniqueInput = {
  id?: number
  userId?: number
}

export type TagWhereInput = {
  AND?: XOR<TagWhereInput, Enumerable<TagWhereInput>>
  OR?: XOR<TagWhereInput, Enumerable<TagWhereInput>>
  NOT?: XOR<TagWhereInput, Enumerable<TagWhereInput>>
  id?: XOR<IntFilter, number>
  description?: XOR<StringFilter, string>
  createdAt?: XOR<DateTimeFilter, Date | string>
  updatedAt?: DateTimeNullableFilter | Date | string | null
  deletedAt?: DateTimeNullableFilter | Date | string | null
}

export type TagOrderByInput = {
  id?: SortOrder
  description?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  deletedAt?: SortOrder
}

export type TagWhereUniqueInput = {
  id?: number
}

export type TaskWhereInput = {
  AND?: XOR<TaskWhereInput, Enumerable<TaskWhereInput>>
  OR?: XOR<TaskWhereInput, Enumerable<TaskWhereInput>>
  NOT?: XOR<TaskWhereInput, Enumerable<TaskWhereInput>>
  id?: XOR<IntFilter, number>
  description?: XOR<StringFilter, string>
  createdAt?: XOR<DateTimeFilter, Date | string>
  updatedAt?: DateTimeNullableFilter | Date | string | null
  deletedAt?: DateTimeNullableFilter | Date | string | null
  userId?: XOR<IntFilter, number>
  status?: XOR<BoolFilter, boolean>
  User?: XOR<UserRelationFilter, UserWhereInput>
}

export type TaskOrderByInput = {
  id?: SortOrder
  description?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  deletedAt?: SortOrder
  userId?: SortOrder
  status?: SortOrder
}

export type TaskWhereUniqueInput = {
  id?: number
}

export type TokenWhereInput = {
  AND?: XOR<TokenWhereInput, Enumerable<TokenWhereInput>>
  OR?: XOR<TokenWhereInput, Enumerable<TokenWhereInput>>
  NOT?: XOR<TokenWhereInput, Enumerable<TokenWhereInput>>
  id?: XOR<IntFilter, number>
  userId?: XOR<IntFilter, number>
  token?: XOR<StringFilter, string>
  ip?: StringNullableFilter | string | null
  User?: XOR<UserRelationFilter, UserWhereInput>
}

export type TokenOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  token?: SortOrder
  ip?: SortOrder
}

export type TokenWhereUniqueInput = {
  id?: number
}

export type UserWhereInput = {
  AND?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  OR?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  NOT?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  id?: XOR<IntFilter, number>
  name?: XOR<StringFilter, string>
  email?: XOR<StringFilter, string>
  createdAt?: XOR<DateTimeFilter, Date | string>
  updatedAt?: DateTimeNullableFilter | Date | string | null
  deletedAt?: DateTimeNullableFilter | Date | string | null
  password?: StringNullableFilter | string | null
  username?: StringNullableFilter | string | null
  Post?: PostListRelationFilter
  Profile?: ProfileRelationFilter | ProfileWhereInput | null
  Task?: TaskListRelationFilter
  Token?: TokenListRelationFilter
  UserRole?: UserRoleListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  email?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  deletedAt?: SortOrder
  password?: SortOrder
  username?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type PermissionWhereInput = {
  AND?: XOR<PermissionWhereInput, Enumerable<PermissionWhereInput>>
  OR?: XOR<PermissionWhereInput, Enumerable<PermissionWhereInput>>
  NOT?: XOR<PermissionWhereInput, Enumerable<PermissionWhereInput>>
  id?: XOR<IntFilter, number>
  name?: XOR<StringFilter, string>
  RolePermission?: RolePermissionListRelationFilter
}

export type PermissionOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type PermissionWhereUniqueInput = {
  id?: number
}

export type RoleWhereInput = {
  AND?: XOR<RoleWhereInput, Enumerable<RoleWhereInput>>
  OR?: XOR<RoleWhereInput, Enumerable<RoleWhereInput>>
  NOT?: XOR<RoleWhereInput, Enumerable<RoleWhereInput>>
  id?: XOR<IntFilter, number>
  name?: XOR<StringFilter, string>
  RolePermission?: RolePermissionListRelationFilter
  UserRole?: UserRoleListRelationFilter
}

export type RoleOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type RoleWhereUniqueInput = {
  id?: number
}

export type RolePermissionWhereInput = {
  AND?: XOR<RolePermissionWhereInput, Enumerable<RolePermissionWhereInput>>
  OR?: XOR<RolePermissionWhereInput, Enumerable<RolePermissionWhereInput>>
  NOT?: XOR<RolePermissionWhereInput, Enumerable<RolePermissionWhereInput>>
  id?: XOR<IntFilter, number>
  roleId?: XOR<IntFilter, number>
  permissionId?: XOR<IntFilter, number>
  Permission?: XOR<PermissionRelationFilter, PermissionWhereInput>
  Role?: XOR<RoleRelationFilter, RoleWhereInput>
}

export type RolePermissionOrderByInput = {
  id?: SortOrder
  roleId?: SortOrder
  permissionId?: SortOrder
}

export type RolePermissionWhereUniqueInput = {
  id?: number
}

export type UserRoleWhereInput = {
  AND?: XOR<UserRoleWhereInput, Enumerable<UserRoleWhereInput>>
  OR?: XOR<UserRoleWhereInput, Enumerable<UserRoleWhereInput>>
  NOT?: XOR<UserRoleWhereInput, Enumerable<UserRoleWhereInput>>
  id?: XOR<IntFilter, number>
  userId?: XOR<IntFilter, number>
  roleId?: XOR<IntFilter, number>
  Role?: XOR<RoleRelationFilter, RoleWhereInput>
  User?: XOR<UserRelationFilter, UserWhereInput>
}

export type UserRoleOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  roleId?: SortOrder
}

export type UserRoleWhereUniqueInput = {
  id?: number
}

export type PostCreateInput = {
  title: string
  createdAt?: Date | string
  content?: XOR<string, null>
  published?: boolean
  User: UserCreateOneWithoutPostInput
}

export type PostUpdateInput = {
  title?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  content?: string | NullableStringFieldUpdateOperationsInput | null
  published?: XOR<boolean, BoolFieldUpdateOperationsInput>
  User?: UserUpdateOneRequiredWithoutPostInput
}

export type PostUpdateManyMutationInput = {
  title?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  content?: string | NullableStringFieldUpdateOperationsInput | null
  published?: XOR<boolean, BoolFieldUpdateOperationsInput>
}

export type ProfileCreateInput = {
  bio?: XOR<string, null>
  User: UserCreateOneWithoutProfileInput
}

export type ProfileUpdateInput = {
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  User?: UserUpdateOneRequiredWithoutProfileInput
}

export type ProfileUpdateManyMutationInput = {
  bio?: string | NullableStringFieldUpdateOperationsInput | null
}

export type TagCreateInput = {
  description: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
}

export type TagUpdateInput = {
  description?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type TagUpdateManyMutationInput = {
  description?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type TaskCreateInput = {
  description: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  status: boolean
  User: UserCreateOneWithoutTaskInput
}

export type TaskUpdateInput = {
  description?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  status?: XOR<boolean, BoolFieldUpdateOperationsInput>
  User?: UserUpdateOneRequiredWithoutTaskInput
}

export type TaskUpdateManyMutationInput = {
  description?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  status?: XOR<boolean, BoolFieldUpdateOperationsInput>
}

export type TokenCreateInput = {
  token: string
  ip?: XOR<string, null>
  User: UserCreateOneWithoutTokenInput
}

export type TokenUpdateInput = {
  token?: XOR<string, StringFieldUpdateOperationsInput>
  ip?: string | NullableStringFieldUpdateOperationsInput | null
  User?: UserUpdateOneRequiredWithoutTokenInput
}

export type TokenUpdateManyMutationInput = {
  token?: XOR<string, StringFieldUpdateOperationsInput>
  ip?: string | NullableStringFieldUpdateOperationsInput | null
}

export type UserCreateInput = {
  name: string
  email: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  password?: XOR<string, null>
  username?: XOR<string, null>
  Post?: PostCreateManyWithoutUserInput
  Profile?: ProfileCreateOneWithoutUserInput
  Task?: TaskCreateManyWithoutUserInput
  Token?: TokenCreateManyWithoutUserInput
  UserRole?: UserRoleCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  email?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  username?: string | NullableStringFieldUpdateOperationsInput | null
  Post?: PostUpdateManyWithoutUserInput
  Profile?: ProfileUpdateOneWithoutUserInput
  Task?: TaskUpdateManyWithoutUserInput
  Token?: TokenUpdateManyWithoutUserInput
  UserRole?: UserRoleUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  email?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  username?: string | NullableStringFieldUpdateOperationsInput | null
}

export type PermissionCreateInput = {
  name: string
  RolePermission?: RolePermissionCreateManyWithoutPermissionInput
}

export type PermissionUpdateInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  RolePermission?: RolePermissionUpdateManyWithoutPermissionInput
}

export type PermissionUpdateManyMutationInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
}

export type RoleCreateInput = {
  name: string
  RolePermission?: RolePermissionCreateManyWithoutRoleInput
  UserRole?: UserRoleCreateManyWithoutRoleInput
}

export type RoleUpdateInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  RolePermission?: RolePermissionUpdateManyWithoutRoleInput
  UserRole?: UserRoleUpdateManyWithoutRoleInput
}

export type RoleUpdateManyMutationInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
}

export type RolePermissionCreateInput = {
  Permission: PermissionCreateOneWithoutRolePermissionInput
  Role: RoleCreateOneWithoutRolePermissionInput
}

export type RolePermissionUpdateInput = {
  Permission?: PermissionUpdateOneRequiredWithoutRolePermissionInput
  Role?: RoleUpdateOneRequiredWithoutRolePermissionInput
}

export type RolePermissionUpdateManyMutationInput = {

}

export type UserRoleCreateInput = {
  Role: RoleCreateOneWithoutUserRoleInput
  User: UserCreateOneWithoutUserRoleInput
}

export type UserRoleUpdateInput = {
  Role?: RoleUpdateOneRequiredWithoutUserRoleInput
  User?: UserUpdateOneRequiredWithoutUserRoleInput
}

export type UserRoleUpdateManyMutationInput = {

}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: XOR<string, NestedStringFilter>
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: XOR<Date | string, NestedDateTimeFilter>
}

export type StringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type BoolFilter = {
  equals?: boolean
  not?: XOR<boolean, NestedBoolFilter>
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type DateTimeNullableFilter = {
  equals?: XOR<Date | string, null>
  in?: XOR<Enumerable<Date> | Enumerable<string>, null>
  notIn?: XOR<Enumerable<Date> | Enumerable<string>, null>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type PostListRelationFilter = {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export type ProfileRelationFilter = {
  is?: XOR<ProfileWhereInput, null>
  isNot?: XOR<ProfileWhereInput, null>
}

export type TaskListRelationFilter = {
  every?: TaskWhereInput
  some?: TaskWhereInput
  none?: TaskWhereInput
}

export type TokenListRelationFilter = {
  every?: TokenWhereInput
  some?: TokenWhereInput
  none?: TokenWhereInput
}

export type UserRoleListRelationFilter = {
  every?: UserRoleWhereInput
  some?: UserRoleWhereInput
  none?: UserRoleWhereInput
}

export type RolePermissionListRelationFilter = {
  every?: RolePermissionWhereInput
  some?: RolePermissionWhereInput
  none?: RolePermissionWhereInput
}

export type PermissionRelationFilter = {
  is?: PermissionWhereInput
  isNot?: PermissionWhereInput
}

export type RoleRelationFilter = {
  is?: RoleWhereInput
  isNot?: RoleWhereInput
}

export type UserCreateOneWithoutPostInput = {
  create?: UserCreateWithoutPostInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutPostInput
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: XOR<string, null>
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type UserUpdateOneRequiredWithoutPostInput = {
  create?: UserCreateWithoutPostInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostInput
  upsert?: UserUpsertWithoutPostInput
  connectOrCreate?: UserCreateOrConnectWithoutPostInput
}

export type UserCreateOneWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutProfileInput
}

export type UserUpdateOneRequiredWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutProfileInput
  upsert?: UserUpsertWithoutProfileInput
  connectOrCreate?: UserCreateOrConnectWithoutProfileInput
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: XOR<Date | string, null>
}

export type UserCreateOneWithoutTaskInput = {
  create?: UserCreateWithoutTaskInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutTaskInput
}

export type UserUpdateOneRequiredWithoutTaskInput = {
  create?: UserCreateWithoutTaskInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutTaskInput
  upsert?: UserUpsertWithoutTaskInput
  connectOrCreate?: UserCreateOrConnectWithoutTaskInput
}

export type UserCreateOneWithoutTokenInput = {
  create?: UserCreateWithoutTokenInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutTokenInput
}

export type UserUpdateOneRequiredWithoutTokenInput = {
  create?: UserCreateWithoutTokenInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutTokenInput
  upsert?: UserUpsertWithoutTokenInput
  connectOrCreate?: UserCreateOrConnectWithoutTokenInput
}

export type PostCreateManyWithoutUserInput = {
  create?: XOR<PostCreateWithoutUserInput, Enumerable<PostCreateWithoutUserInput>>
  connect?: XOR<PostWhereUniqueInput, Enumerable<PostWhereUniqueInput>>
  connectOrCreate?: XOR<PostCreateOrConnectWithoutUserInput, Enumerable<PostCreateOrConnectWithoutUserInput>>
}

export type ProfileCreateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
}

export type TaskCreateManyWithoutUserInput = {
  create?: XOR<TaskCreateWithoutUserInput, Enumerable<TaskCreateWithoutUserInput>>
  connect?: XOR<TaskWhereUniqueInput, Enumerable<TaskWhereUniqueInput>>
  connectOrCreate?: XOR<TaskCreateOrConnectWithoutUserInput, Enumerable<TaskCreateOrConnectWithoutUserInput>>
}

export type TokenCreateManyWithoutUserInput = {
  create?: XOR<TokenCreateWithoutUserInput, Enumerable<TokenCreateWithoutUserInput>>
  connect?: XOR<TokenWhereUniqueInput, Enumerable<TokenWhereUniqueInput>>
  connectOrCreate?: XOR<TokenCreateOrConnectWithoutUserInput, Enumerable<TokenCreateOrConnectWithoutUserInput>>
}

export type UserRoleCreateManyWithoutUserInput = {
  create?: XOR<UserRoleCreateWithoutUserInput, Enumerable<UserRoleCreateWithoutUserInput>>
  connect?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  connectOrCreate?: XOR<UserRoleCreateOrConnectWithoutUserInput, Enumerable<UserRoleCreateOrConnectWithoutUserInput>>
}

export type PostUpdateManyWithoutUserInput = {
  create?: XOR<PostCreateWithoutUserInput, Enumerable<PostCreateWithoutUserInput>>
  connect?: XOR<PostWhereUniqueInput, Enumerable<PostWhereUniqueInput>>
  set?: XOR<PostWhereUniqueInput, Enumerable<PostWhereUniqueInput>>
  disconnect?: XOR<PostWhereUniqueInput, Enumerable<PostWhereUniqueInput>>
  delete?: XOR<PostWhereUniqueInput, Enumerable<PostWhereUniqueInput>>
  update?: XOR<PostUpdateWithWhereUniqueWithoutUserInput, Enumerable<PostUpdateWithWhereUniqueWithoutUserInput>>
  updateMany?: XOR<PostUpdateManyWithWhereWithoutUserInput, Enumerable<PostUpdateManyWithWhereWithoutUserInput>>
  deleteMany?: XOR<PostScalarWhereInput, Enumerable<PostScalarWhereInput>>
  upsert?: XOR<PostUpsertWithWhereUniqueWithoutUserInput, Enumerable<PostUpsertWithWhereUniqueWithoutUserInput>>
  connectOrCreate?: XOR<PostCreateOrConnectWithoutUserInput, Enumerable<PostCreateOrConnectWithoutUserInput>>
}

export type ProfileUpdateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ProfileUpdateWithoutUserInput
  upsert?: ProfileUpsertWithoutUserInput
  connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
}

export type TaskUpdateManyWithoutUserInput = {
  create?: XOR<TaskCreateWithoutUserInput, Enumerable<TaskCreateWithoutUserInput>>
  connect?: XOR<TaskWhereUniqueInput, Enumerable<TaskWhereUniqueInput>>
  set?: XOR<TaskWhereUniqueInput, Enumerable<TaskWhereUniqueInput>>
  disconnect?: XOR<TaskWhereUniqueInput, Enumerable<TaskWhereUniqueInput>>
  delete?: XOR<TaskWhereUniqueInput, Enumerable<TaskWhereUniqueInput>>
  update?: XOR<TaskUpdateWithWhereUniqueWithoutUserInput, Enumerable<TaskUpdateWithWhereUniqueWithoutUserInput>>
  updateMany?: XOR<TaskUpdateManyWithWhereWithoutUserInput, Enumerable<TaskUpdateManyWithWhereWithoutUserInput>>
  deleteMany?: XOR<TaskScalarWhereInput, Enumerable<TaskScalarWhereInput>>
  upsert?: XOR<TaskUpsertWithWhereUniqueWithoutUserInput, Enumerable<TaskUpsertWithWhereUniqueWithoutUserInput>>
  connectOrCreate?: XOR<TaskCreateOrConnectWithoutUserInput, Enumerable<TaskCreateOrConnectWithoutUserInput>>
}

export type TokenUpdateManyWithoutUserInput = {
  create?: XOR<TokenCreateWithoutUserInput, Enumerable<TokenCreateWithoutUserInput>>
  connect?: XOR<TokenWhereUniqueInput, Enumerable<TokenWhereUniqueInput>>
  set?: XOR<TokenWhereUniqueInput, Enumerable<TokenWhereUniqueInput>>
  disconnect?: XOR<TokenWhereUniqueInput, Enumerable<TokenWhereUniqueInput>>
  delete?: XOR<TokenWhereUniqueInput, Enumerable<TokenWhereUniqueInput>>
  update?: XOR<TokenUpdateWithWhereUniqueWithoutUserInput, Enumerable<TokenUpdateWithWhereUniqueWithoutUserInput>>
  updateMany?: XOR<TokenUpdateManyWithWhereWithoutUserInput, Enumerable<TokenUpdateManyWithWhereWithoutUserInput>>
  deleteMany?: XOR<TokenScalarWhereInput, Enumerable<TokenScalarWhereInput>>
  upsert?: XOR<TokenUpsertWithWhereUniqueWithoutUserInput, Enumerable<TokenUpsertWithWhereUniqueWithoutUserInput>>
  connectOrCreate?: XOR<TokenCreateOrConnectWithoutUserInput, Enumerable<TokenCreateOrConnectWithoutUserInput>>
}

export type UserRoleUpdateManyWithoutUserInput = {
  create?: XOR<UserRoleCreateWithoutUserInput, Enumerable<UserRoleCreateWithoutUserInput>>
  connect?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  set?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  disconnect?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  delete?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  update?: XOR<UserRoleUpdateWithWhereUniqueWithoutUserInput, Enumerable<UserRoleUpdateWithWhereUniqueWithoutUserInput>>
  updateMany?: XOR<UserRoleUpdateManyWithWhereWithoutUserInput, Enumerable<UserRoleUpdateManyWithWhereWithoutUserInput>>
  deleteMany?: XOR<UserRoleScalarWhereInput, Enumerable<UserRoleScalarWhereInput>>
  upsert?: XOR<UserRoleUpsertWithWhereUniqueWithoutUserInput, Enumerable<UserRoleUpsertWithWhereUniqueWithoutUserInput>>
  connectOrCreate?: XOR<UserRoleCreateOrConnectWithoutUserInput, Enumerable<UserRoleCreateOrConnectWithoutUserInput>>
}

export type RolePermissionCreateManyWithoutPermissionInput = {
  create?: XOR<RolePermissionCreateWithoutPermissionInput, Enumerable<RolePermissionCreateWithoutPermissionInput>>
  connect?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  connectOrCreate?: XOR<RolePermissionCreateOrConnectWithoutPermissionInput, Enumerable<RolePermissionCreateOrConnectWithoutPermissionInput>>
}

export type RolePermissionUpdateManyWithoutPermissionInput = {
  create?: XOR<RolePermissionCreateWithoutPermissionInput, Enumerable<RolePermissionCreateWithoutPermissionInput>>
  connect?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  set?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  disconnect?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  delete?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  update?: XOR<RolePermissionUpdateWithWhereUniqueWithoutPermissionInput, Enumerable<RolePermissionUpdateWithWhereUniqueWithoutPermissionInput>>
  updateMany?: XOR<RolePermissionUpdateManyWithWhereWithoutPermissionInput, Enumerable<RolePermissionUpdateManyWithWhereWithoutPermissionInput>>
  deleteMany?: XOR<RolePermissionScalarWhereInput, Enumerable<RolePermissionScalarWhereInput>>
  upsert?: XOR<RolePermissionUpsertWithWhereUniqueWithoutPermissionInput, Enumerable<RolePermissionUpsertWithWhereUniqueWithoutPermissionInput>>
  connectOrCreate?: XOR<RolePermissionCreateOrConnectWithoutPermissionInput, Enumerable<RolePermissionCreateOrConnectWithoutPermissionInput>>
}

export type RolePermissionCreateManyWithoutRoleInput = {
  create?: XOR<RolePermissionCreateWithoutRoleInput, Enumerable<RolePermissionCreateWithoutRoleInput>>
  connect?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  connectOrCreate?: XOR<RolePermissionCreateOrConnectWithoutRoleInput, Enumerable<RolePermissionCreateOrConnectWithoutRoleInput>>
}

export type UserRoleCreateManyWithoutRoleInput = {
  create?: XOR<UserRoleCreateWithoutRoleInput, Enumerable<UserRoleCreateWithoutRoleInput>>
  connect?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  connectOrCreate?: XOR<UserRoleCreateOrConnectWithoutRoleInput, Enumerable<UserRoleCreateOrConnectWithoutRoleInput>>
}

export type RolePermissionUpdateManyWithoutRoleInput = {
  create?: XOR<RolePermissionCreateWithoutRoleInput, Enumerable<RolePermissionCreateWithoutRoleInput>>
  connect?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  set?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  disconnect?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  delete?: XOR<RolePermissionWhereUniqueInput, Enumerable<RolePermissionWhereUniqueInput>>
  update?: XOR<RolePermissionUpdateWithWhereUniqueWithoutRoleInput, Enumerable<RolePermissionUpdateWithWhereUniqueWithoutRoleInput>>
  updateMany?: XOR<RolePermissionUpdateManyWithWhereWithoutRoleInput, Enumerable<RolePermissionUpdateManyWithWhereWithoutRoleInput>>
  deleteMany?: XOR<RolePermissionScalarWhereInput, Enumerable<RolePermissionScalarWhereInput>>
  upsert?: XOR<RolePermissionUpsertWithWhereUniqueWithoutRoleInput, Enumerable<RolePermissionUpsertWithWhereUniqueWithoutRoleInput>>
  connectOrCreate?: XOR<RolePermissionCreateOrConnectWithoutRoleInput, Enumerable<RolePermissionCreateOrConnectWithoutRoleInput>>
}

export type UserRoleUpdateManyWithoutRoleInput = {
  create?: XOR<UserRoleCreateWithoutRoleInput, Enumerable<UserRoleCreateWithoutRoleInput>>
  connect?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  set?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  disconnect?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  delete?: XOR<UserRoleWhereUniqueInput, Enumerable<UserRoleWhereUniqueInput>>
  update?: XOR<UserRoleUpdateWithWhereUniqueWithoutRoleInput, Enumerable<UserRoleUpdateWithWhereUniqueWithoutRoleInput>>
  updateMany?: XOR<UserRoleUpdateManyWithWhereWithoutRoleInput, Enumerable<UserRoleUpdateManyWithWhereWithoutRoleInput>>
  deleteMany?: XOR<UserRoleScalarWhereInput, Enumerable<UserRoleScalarWhereInput>>
  upsert?: XOR<UserRoleUpsertWithWhereUniqueWithoutRoleInput, Enumerable<UserRoleUpsertWithWhereUniqueWithoutRoleInput>>
  connectOrCreate?: XOR<UserRoleCreateOrConnectWithoutRoleInput, Enumerable<UserRoleCreateOrConnectWithoutRoleInput>>
}

export type PermissionCreateOneWithoutRolePermissionInput = {
  create?: PermissionCreateWithoutRolePermissionInput
  connect?: PermissionWhereUniqueInput
  connectOrCreate?: PermissionCreateOrConnectWithoutRolePermissionInput
}

export type RoleCreateOneWithoutRolePermissionInput = {
  create?: RoleCreateWithoutRolePermissionInput
  connect?: RoleWhereUniqueInput
  connectOrCreate?: RoleCreateOrConnectWithoutRolePermissionInput
}

export type PermissionUpdateOneRequiredWithoutRolePermissionInput = {
  create?: PermissionCreateWithoutRolePermissionInput
  connect?: PermissionWhereUniqueInput
  update?: PermissionUpdateWithoutRolePermissionInput
  upsert?: PermissionUpsertWithoutRolePermissionInput
  connectOrCreate?: PermissionCreateOrConnectWithoutRolePermissionInput
}

export type RoleUpdateOneRequiredWithoutRolePermissionInput = {
  create?: RoleCreateWithoutRolePermissionInput
  connect?: RoleWhereUniqueInput
  update?: RoleUpdateWithoutRolePermissionInput
  upsert?: RoleUpsertWithoutRolePermissionInput
  connectOrCreate?: RoleCreateOrConnectWithoutRolePermissionInput
}

export type RoleCreateOneWithoutUserRoleInput = {
  create?: RoleCreateWithoutUserRoleInput
  connect?: RoleWhereUniqueInput
  connectOrCreate?: RoleCreateOrConnectWithoutUserRoleInput
}

export type UserCreateOneWithoutUserRoleInput = {
  create?: UserCreateWithoutUserRoleInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutUserRoleInput
}

export type RoleUpdateOneRequiredWithoutUserRoleInput = {
  create?: RoleCreateWithoutUserRoleInput
  connect?: RoleWhereUniqueInput
  update?: RoleUpdateWithoutUserRoleInput
  upsert?: RoleUpsertWithoutUserRoleInput
  connectOrCreate?: RoleCreateOrConnectWithoutUserRoleInput
}

export type UserUpdateOneRequiredWithoutUserRoleInput = {
  create?: UserCreateWithoutUserRoleInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutUserRoleInput
  upsert?: UserUpsertWithoutUserRoleInput
  connectOrCreate?: UserCreateOrConnectWithoutUserRoleInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: XOR<string, NestedStringFilter>
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: XOR<Date | string, NestedDateTimeFilter>
}

export type NestedStringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: XOR<boolean, NestedBoolFilter>
}

export type NestedDateTimeNullableFilter = {
  equals?: XOR<Date | string, null>
  in?: XOR<Enumerable<Date> | Enumerable<string>, null>
  notIn?: XOR<Enumerable<Date> | Enumerable<string>, null>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type UserCreateWithoutPostInput = {
  name: string
  email: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  password?: XOR<string, null>
  username?: XOR<string, null>
  Profile?: ProfileCreateOneWithoutUserInput
  Task?: TaskCreateManyWithoutUserInput
  Token?: TokenCreateManyWithoutUserInput
  UserRole?: UserRoleCreateManyWithoutUserInput
}

export type UserCreateOrConnectWithoutPostInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutPostInput
}

export type UserUpdateWithoutPostInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  email?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  username?: string | NullableStringFieldUpdateOperationsInput | null
  Profile?: ProfileUpdateOneWithoutUserInput
  Task?: TaskUpdateManyWithoutUserInput
  Token?: TokenUpdateManyWithoutUserInput
  UserRole?: UserRoleUpdateManyWithoutUserInput
}

export type UserUpsertWithoutPostInput = {
  update: UserUpdateWithoutPostInput
  create: UserCreateWithoutPostInput
}

export type UserCreateWithoutProfileInput = {
  name: string
  email: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  password?: XOR<string, null>
  username?: XOR<string, null>
  Post?: PostCreateManyWithoutUserInput
  Task?: TaskCreateManyWithoutUserInput
  Token?: TokenCreateManyWithoutUserInput
  UserRole?: UserRoleCreateManyWithoutUserInput
}

export type UserCreateOrConnectWithoutProfileInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutProfileInput
}

export type UserUpdateWithoutProfileInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  email?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  username?: string | NullableStringFieldUpdateOperationsInput | null
  Post?: PostUpdateManyWithoutUserInput
  Task?: TaskUpdateManyWithoutUserInput
  Token?: TokenUpdateManyWithoutUserInput
  UserRole?: UserRoleUpdateManyWithoutUserInput
}

export type UserUpsertWithoutProfileInput = {
  update: UserUpdateWithoutProfileInput
  create: UserCreateWithoutProfileInput
}

export type UserCreateWithoutTaskInput = {
  name: string
  email: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  password?: XOR<string, null>
  username?: XOR<string, null>
  Post?: PostCreateManyWithoutUserInput
  Profile?: ProfileCreateOneWithoutUserInput
  Token?: TokenCreateManyWithoutUserInput
  UserRole?: UserRoleCreateManyWithoutUserInput
}

export type UserCreateOrConnectWithoutTaskInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutTaskInput
}

export type UserUpdateWithoutTaskInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  email?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  username?: string | NullableStringFieldUpdateOperationsInput | null
  Post?: PostUpdateManyWithoutUserInput
  Profile?: ProfileUpdateOneWithoutUserInput
  Token?: TokenUpdateManyWithoutUserInput
  UserRole?: UserRoleUpdateManyWithoutUserInput
}

export type UserUpsertWithoutTaskInput = {
  update: UserUpdateWithoutTaskInput
  create: UserCreateWithoutTaskInput
}

export type UserCreateWithoutTokenInput = {
  name: string
  email: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  password?: XOR<string, null>
  username?: XOR<string, null>
  Post?: PostCreateManyWithoutUserInput
  Profile?: ProfileCreateOneWithoutUserInput
  Task?: TaskCreateManyWithoutUserInput
  UserRole?: UserRoleCreateManyWithoutUserInput
}

export type UserCreateOrConnectWithoutTokenInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutTokenInput
}

export type UserUpdateWithoutTokenInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  email?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  username?: string | NullableStringFieldUpdateOperationsInput | null
  Post?: PostUpdateManyWithoutUserInput
  Profile?: ProfileUpdateOneWithoutUserInput
  Task?: TaskUpdateManyWithoutUserInput
  UserRole?: UserRoleUpdateManyWithoutUserInput
}

export type UserUpsertWithoutTokenInput = {
  update: UserUpdateWithoutTokenInput
  create: UserCreateWithoutTokenInput
}

export type PostCreateWithoutUserInput = {
  title: string
  createdAt?: Date | string
  content?: XOR<string, null>
  published?: boolean
}

export type PostCreateOrConnectWithoutUserInput = {
  where: PostWhereUniqueInput
  create: PostCreateWithoutUserInput
}

export type ProfileCreateWithoutUserInput = {
  bio?: XOR<string, null>
}

export type ProfileCreateOrConnectWithoutUserInput = {
  where: ProfileWhereUniqueInput
  create: ProfileCreateWithoutUserInput
}

export type TaskCreateWithoutUserInput = {
  description: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  status: boolean
}

export type TaskCreateOrConnectWithoutUserInput = {
  where: TaskWhereUniqueInput
  create: TaskCreateWithoutUserInput
}

export type TokenCreateWithoutUserInput = {
  token: string
  ip?: XOR<string, null>
}

export type TokenCreateOrConnectWithoutUserInput = {
  where: TokenWhereUniqueInput
  create: TokenCreateWithoutUserInput
}

export type UserRoleCreateWithoutUserInput = {
  Role: RoleCreateOneWithoutUserRoleInput
}

export type UserRoleCreateOrConnectWithoutUserInput = {
  where: UserRoleWhereUniqueInput
  create: UserRoleCreateWithoutUserInput
}

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutUserInput
}

export type PostUpdateManyWithWhereWithoutUserInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyMutationInput
}

export type PostScalarWhereInput = {
  AND?: XOR<PostScalarWhereInput, Enumerable<PostScalarWhereInput>>
  OR?: XOR<PostScalarWhereInput, Enumerable<PostScalarWhereInput>>
  NOT?: XOR<PostScalarWhereInput, Enumerable<PostScalarWhereInput>>
  id?: XOR<IntFilter, number>
  title?: XOR<StringFilter, string>
  createdAt?: XOR<DateTimeFilter, Date | string>
  content?: StringNullableFilter | string | null
  published?: XOR<BoolFilter, boolean>
  authorId?: XOR<IntFilter, number>
}

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutUserInput
  create: PostCreateWithoutUserInput
}

export type ProfileUpdateWithoutUserInput = {
  bio?: string | NullableStringFieldUpdateOperationsInput | null
}

export type ProfileUpsertWithoutUserInput = {
  update: ProfileUpdateWithoutUserInput
  create: ProfileCreateWithoutUserInput
}

export type TaskUpdateWithWhereUniqueWithoutUserInput = {
  where: TaskWhereUniqueInput
  data: TaskUpdateWithoutUserInput
}

export type TaskUpdateManyWithWhereWithoutUserInput = {
  where: TaskScalarWhereInput
  data: TaskUpdateManyMutationInput
}

export type TaskScalarWhereInput = {
  AND?: XOR<TaskScalarWhereInput, Enumerable<TaskScalarWhereInput>>
  OR?: XOR<TaskScalarWhereInput, Enumerable<TaskScalarWhereInput>>
  NOT?: XOR<TaskScalarWhereInput, Enumerable<TaskScalarWhereInput>>
  id?: XOR<IntFilter, number>
  description?: XOR<StringFilter, string>
  createdAt?: XOR<DateTimeFilter, Date | string>
  updatedAt?: DateTimeNullableFilter | Date | string | null
  deletedAt?: DateTimeNullableFilter | Date | string | null
  userId?: XOR<IntFilter, number>
  status?: XOR<BoolFilter, boolean>
}

export type TaskUpsertWithWhereUniqueWithoutUserInput = {
  where: TaskWhereUniqueInput
  update: TaskUpdateWithoutUserInput
  create: TaskCreateWithoutUserInput
}

export type TokenUpdateWithWhereUniqueWithoutUserInput = {
  where: TokenWhereUniqueInput
  data: TokenUpdateWithoutUserInput
}

export type TokenUpdateManyWithWhereWithoutUserInput = {
  where: TokenScalarWhereInput
  data: TokenUpdateManyMutationInput
}

export type TokenScalarWhereInput = {
  AND?: XOR<TokenScalarWhereInput, Enumerable<TokenScalarWhereInput>>
  OR?: XOR<TokenScalarWhereInput, Enumerable<TokenScalarWhereInput>>
  NOT?: XOR<TokenScalarWhereInput, Enumerable<TokenScalarWhereInput>>
  id?: XOR<IntFilter, number>
  userId?: XOR<IntFilter, number>
  token?: XOR<StringFilter, string>
  ip?: StringNullableFilter | string | null
}

export type TokenUpsertWithWhereUniqueWithoutUserInput = {
  where: TokenWhereUniqueInput
  update: TokenUpdateWithoutUserInput
  create: TokenCreateWithoutUserInput
}

export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
  where: UserRoleWhereUniqueInput
  data: UserRoleUpdateWithoutUserInput
}

export type UserRoleUpdateManyWithWhereWithoutUserInput = {
  where: UserRoleScalarWhereInput
  data: UserRoleUpdateManyMutationInput
}

export type UserRoleScalarWhereInput = {
  AND?: XOR<UserRoleScalarWhereInput, Enumerable<UserRoleScalarWhereInput>>
  OR?: XOR<UserRoleScalarWhereInput, Enumerable<UserRoleScalarWhereInput>>
  NOT?: XOR<UserRoleScalarWhereInput, Enumerable<UserRoleScalarWhereInput>>
  id?: XOR<IntFilter, number>
  userId?: XOR<IntFilter, number>
  roleId?: XOR<IntFilter, number>
}

export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
  where: UserRoleWhereUniqueInput
  update: UserRoleUpdateWithoutUserInput
  create: UserRoleCreateWithoutUserInput
}

export type RolePermissionCreateWithoutPermissionInput = {
  Role: RoleCreateOneWithoutRolePermissionInput
}

export type RolePermissionCreateOrConnectWithoutPermissionInput = {
  where: RolePermissionWhereUniqueInput
  create: RolePermissionCreateWithoutPermissionInput
}

export type RolePermissionUpdateWithWhereUniqueWithoutPermissionInput = {
  where: RolePermissionWhereUniqueInput
  data: RolePermissionUpdateWithoutPermissionInput
}

export type RolePermissionUpdateManyWithWhereWithoutPermissionInput = {
  where: RolePermissionScalarWhereInput
  data: RolePermissionUpdateManyMutationInput
}

export type RolePermissionScalarWhereInput = {
  AND?: XOR<RolePermissionScalarWhereInput, Enumerable<RolePermissionScalarWhereInput>>
  OR?: XOR<RolePermissionScalarWhereInput, Enumerable<RolePermissionScalarWhereInput>>
  NOT?: XOR<RolePermissionScalarWhereInput, Enumerable<RolePermissionScalarWhereInput>>
  id?: XOR<IntFilter, number>
  roleId?: XOR<IntFilter, number>
  permissionId?: XOR<IntFilter, number>
}

export type RolePermissionUpsertWithWhereUniqueWithoutPermissionInput = {
  where: RolePermissionWhereUniqueInput
  update: RolePermissionUpdateWithoutPermissionInput
  create: RolePermissionCreateWithoutPermissionInput
}

export type RolePermissionCreateWithoutRoleInput = {
  Permission: PermissionCreateOneWithoutRolePermissionInput
}

export type RolePermissionCreateOrConnectWithoutRoleInput = {
  where: RolePermissionWhereUniqueInput
  create: RolePermissionCreateWithoutRoleInput
}

export type UserRoleCreateWithoutRoleInput = {
  User: UserCreateOneWithoutUserRoleInput
}

export type UserRoleCreateOrConnectWithoutRoleInput = {
  where: UserRoleWhereUniqueInput
  create: UserRoleCreateWithoutRoleInput
}

export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
  where: RolePermissionWhereUniqueInput
  data: RolePermissionUpdateWithoutRoleInput
}

export type RolePermissionUpdateManyWithWhereWithoutRoleInput = {
  where: RolePermissionScalarWhereInput
  data: RolePermissionUpdateManyMutationInput
}

export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
  where: RolePermissionWhereUniqueInput
  update: RolePermissionUpdateWithoutRoleInput
  create: RolePermissionCreateWithoutRoleInput
}

export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
  where: UserRoleWhereUniqueInput
  data: UserRoleUpdateWithoutRoleInput
}

export type UserRoleUpdateManyWithWhereWithoutRoleInput = {
  where: UserRoleScalarWhereInput
  data: UserRoleUpdateManyMutationInput
}

export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
  where: UserRoleWhereUniqueInput
  update: UserRoleUpdateWithoutRoleInput
  create: UserRoleCreateWithoutRoleInput
}

export type PermissionCreateWithoutRolePermissionInput = {
  name: string
}

export type PermissionCreateOrConnectWithoutRolePermissionInput = {
  where: PermissionWhereUniqueInput
  create: PermissionCreateWithoutRolePermissionInput
}

export type RoleCreateWithoutRolePermissionInput = {
  name: string
  UserRole?: UserRoleCreateManyWithoutRoleInput
}

export type RoleCreateOrConnectWithoutRolePermissionInput = {
  where: RoleWhereUniqueInput
  create: RoleCreateWithoutRolePermissionInput
}

export type PermissionUpdateWithoutRolePermissionInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
}

export type PermissionUpsertWithoutRolePermissionInput = {
  update: PermissionUpdateWithoutRolePermissionInput
  create: PermissionCreateWithoutRolePermissionInput
}

export type RoleUpdateWithoutRolePermissionInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  UserRole?: UserRoleUpdateManyWithoutRoleInput
}

export type RoleUpsertWithoutRolePermissionInput = {
  update: RoleUpdateWithoutRolePermissionInput
  create: RoleCreateWithoutRolePermissionInput
}

export type RoleCreateWithoutUserRoleInput = {
  name: string
  RolePermission?: RolePermissionCreateManyWithoutRoleInput
}

export type RoleCreateOrConnectWithoutUserRoleInput = {
  where: RoleWhereUniqueInput
  create: RoleCreateWithoutUserRoleInput
}

export type UserCreateWithoutUserRoleInput = {
  name: string
  email: string
  createdAt: Date | string
  updatedAt?: XOR<Date | string, null>
  deletedAt?: XOR<Date | string, null>
  password?: XOR<string, null>
  username?: XOR<string, null>
  Post?: PostCreateManyWithoutUserInput
  Profile?: ProfileCreateOneWithoutUserInput
  Task?: TaskCreateManyWithoutUserInput
  Token?: TokenCreateManyWithoutUserInput
}

export type UserCreateOrConnectWithoutUserRoleInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutUserRoleInput
}

export type RoleUpdateWithoutUserRoleInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  RolePermission?: RolePermissionUpdateManyWithoutRoleInput
}

export type RoleUpsertWithoutUserRoleInput = {
  update: RoleUpdateWithoutUserRoleInput
  create: RoleCreateWithoutUserRoleInput
}

export type UserUpdateWithoutUserRoleInput = {
  name?: XOR<string, StringFieldUpdateOperationsInput>
  email?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  username?: string | NullableStringFieldUpdateOperationsInput | null
  Post?: PostUpdateManyWithoutUserInput
  Profile?: ProfileUpdateOneWithoutUserInput
  Task?: TaskUpdateManyWithoutUserInput
  Token?: TokenUpdateManyWithoutUserInput
}

export type UserUpsertWithoutUserRoleInput = {
  update: UserUpdateWithoutUserRoleInput
  create: UserCreateWithoutUserRoleInput
}

export type PostUpdateWithoutUserInput = {
  title?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  content?: string | NullableStringFieldUpdateOperationsInput | null
  published?: XOR<boolean, BoolFieldUpdateOperationsInput>
}

export type TaskUpdateWithoutUserInput = {
  description?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  status?: XOR<boolean, BoolFieldUpdateOperationsInput>
}

export type TokenUpdateWithoutUserInput = {
  token?: XOR<string, StringFieldUpdateOperationsInput>
  ip?: string | NullableStringFieldUpdateOperationsInput | null
}

export type UserRoleUpdateWithoutUserInput = {
  Role?: RoleUpdateOneRequiredWithoutUserRoleInput
}

export type RolePermissionUpdateWithoutPermissionInput = {
  Role?: RoleUpdateOneRequiredWithoutRolePermissionInput
}

export type RolePermissionUpdateWithoutRoleInput = {
  Permission?: PermissionUpdateOneRequiredWithoutRolePermissionInput
}

export type UserRoleUpdateWithoutRoleInput = {
  User?: UserUpdateOneRequiredWithoutUserRoleInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
