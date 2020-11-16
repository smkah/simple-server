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
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.9.0
 * Query Engine version: 369b3694b7edb869fad14827a33ad3f3f49bbc20
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
  model?: string
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
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

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
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): TagDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

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


export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  email: 'email',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const TagDistinctFieldEnum: {
  id: 'id',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

export declare type TagDistinctFieldEnum = (typeof TagDistinctFieldEnum)[keyof typeof TagDistinctFieldEnum]


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
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
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
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
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
  orderBy?: Enumerable<ProfileOrderByInput> | ProfileOrderByInput
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profile to fetch.
  **/
  where?: ProfileWhereInput
  orderBy?: Enumerable<ProfileOrderByInput> | ProfileOrderByInput
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profiles to fetch.
  **/
  where?: ProfileWhereInput
  /**
   * Determine the order of the Profiles to fetch.
  **/
  orderBy?: Enumerable<ProfileOrderByInput> | ProfileOrderByInput
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
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
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  name: string | null
  email: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
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
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
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
  Post?: boolean | FindManyPostArgs
  Profile?: boolean | ProfileArgs
}

export type UserInclude = {
  Post?: boolean | FindManyPostArgs
  Profile?: boolean | ProfileArgs
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
      ? ProfileGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'Post'
      ? Array<PostGetPayload<S['select'][P]>> :
      P extends 'Profile'
      ? ProfileGetPayload<S['select'][P]> | null : never
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
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
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
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
  orderBy?: Enumerable<TagOrderByInput> | TagOrderByInput
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
  select?: TagSelect | null
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
  select?: TagSelect | null
  /**
   * Filter, which Tag to fetch.
  **/
  where?: TagWhereInput
  orderBy?: Enumerable<TagOrderByInput> | TagOrderByInput
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
  select?: TagSelect | null
  /**
   * Filter, which Tags to fetch.
  **/
  where?: TagWhereInput
  /**
   * Determine the order of the Tags to fetch.
  **/
  orderBy?: Enumerable<TagOrderByInput> | TagOrderByInput
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
  select?: TagSelect | null
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
  select?: TagSelect | null
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
  select?: TagSelect | null
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
  select?: TagSelect | null
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
  select?: TagSelect | null
}



/**
 * Deep Input Types
 */


export type PostWhereInput = {
  AND?: PostWhereInput | Enumerable<PostWhereInput>
  OR?: PostWhereInput | Enumerable<PostWhereInput>
  NOT?: PostWhereInput | Enumerable<PostWhereInput>
  id?: IntFilter | number
  title?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  content?: StringNullableFilter | string | null
  published?: BoolFilter | boolean
  authorId?: IntFilter | number
  User?: UserRelationFilter | UserWhereInput
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
  AND?: ProfileWhereInput | Enumerable<ProfileWhereInput>
  OR?: ProfileWhereInput | Enumerable<ProfileWhereInput>
  NOT?: ProfileWhereInput | Enumerable<ProfileWhereInput>
  id?: IntFilter | number
  bio?: StringNullableFilter | string | null
  userId?: IntFilter | number
  User?: UserRelationFilter | UserWhereInput
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

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  email?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeNullableFilter | Date | string | null
  deletedAt?: DateTimeNullableFilter | Date | string | null
  Post?: PostListRelationFilter
  Profile?: ProfileRelationFilter | ProfileWhereInput | null
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  email?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  deletedAt?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type TagWhereInput = {
  AND?: TagWhereInput | Enumerable<TagWhereInput>
  OR?: TagWhereInput | Enumerable<TagWhereInput>
  NOT?: TagWhereInput | Enumerable<TagWhereInput>
  id?: IntFilter | number
  description?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
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

export type PostCreateInput = {
  title: string
  createdAt?: Date | string
  content?: string | null
  published?: boolean
  User: UserCreateOneWithoutPostInput
}

export type PostUpdateInput = {
  title?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  content?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutPostInput
}

export type PostUpdateManyMutationInput = {
  title?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  content?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
}

export type ProfileCreateInput = {
  bio?: string | null
  User: UserCreateOneWithoutProfileInput
}

export type ProfileUpdateInput = {
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  User?: UserUpdateOneRequiredWithoutProfileInput
}

export type ProfileUpdateManyMutationInput = {
  bio?: string | NullableStringFieldUpdateOperationsInput | null
}

export type UserCreateInput = {
  name?: string | null
  email: string
  createdAt: Date | string
  updatedAt?: Date | string | null
  deletedAt?: Date | string | null
  Post?: PostCreateManyWithoutUserInput
  Profile?: ProfileCreateOneWithoutUserInput
}

export type UserUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  Post?: PostUpdateManyWithoutUserInput
  Profile?: ProfileUpdateOneWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type TagCreateInput = {
  id: number
  description: string
  createdAt: Date | string
  updatedAt?: Date | string | null
  deletedAt?: Date | string | null
}

export type TagUpdateInput = {
  id?: number | IntFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type TagUpdateManyMutationInput = {
  id?: number | IntFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
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
  not?: string | NestedStringFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
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
  not?: boolean | NestedBoolFilter
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
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
  is?: ProfileWhereInput | null
  isNot?: ProfileWhereInput | null
}

export type UserCreateOneWithoutPostInput = {
  create?: UserCreateWithoutPostInput
  connect?: UserWhereUniqueInput
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type UserUpdateOneRequiredWithoutPostInput = {
  create?: UserCreateWithoutPostInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostDataInput
  upsert?: UserUpsertWithoutPostInput
}

export type UserCreateOneWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutProfileDataInput
  upsert?: UserUpsertWithoutProfileInput
}

export type PostCreateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
}

export type ProfileCreateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type PostUpdateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  set?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  disconnect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  delete?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  update?: PostUpdateWithWhereUniqueWithoutUserInput | Enumerable<PostUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: PostUpdateManyWithWhereNestedInput | Enumerable<PostUpdateManyWithWhereNestedInput>
  deleteMany?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  upsert?: PostUpsertWithWhereUniqueWithoutUserInput | Enumerable<PostUpsertWithWhereUniqueWithoutUserInput>
}

export type ProfileUpdateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ProfileUpdateWithoutUserDataInput
  upsert?: ProfileUpsertWithoutUserInput
}

export type IntFieldUpdateOperationsInput = {
  set?: number
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
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
  not?: string | NestedStringFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
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
  not?: boolean | NestedBoolFilter
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type UserCreateWithoutPostInput = {
  name?: string | null
  email: string
  createdAt: Date | string
  updatedAt?: Date | string | null
  deletedAt?: Date | string | null
  Profile?: ProfileCreateOneWithoutUserInput
}

export type UserUpdateWithoutPostDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  Profile?: ProfileUpdateOneWithoutUserInput
}

export type UserUpsertWithoutPostInput = {
  update: UserUpdateWithoutPostDataInput
  create: UserCreateWithoutPostInput
}

export type UserCreateWithoutProfileInput = {
  name?: string | null
  email: string
  createdAt: Date | string
  updatedAt?: Date | string | null
  deletedAt?: Date | string | null
  Post?: PostCreateManyWithoutUserInput
}

export type UserUpdateWithoutProfileDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  deletedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  Post?: PostUpdateManyWithoutUserInput
}

export type UserUpsertWithoutProfileInput = {
  update: UserUpdateWithoutProfileDataInput
  create: UserCreateWithoutProfileInput
}

export type PostCreateWithoutUserInput = {
  title: string
  createdAt?: Date | string
  content?: string | null
  published?: boolean
}

export type ProfileCreateWithoutUserInput = {
  bio?: string | null
}

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutUserDataInput
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostScalarWhereInput = {
  AND?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  OR?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  NOT?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  id?: IntFilter | number
  title?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  content?: StringNullableFilter | string | null
  published?: BoolFilter | boolean
  authorId?: IntFilter | number
}

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutUserDataInput
  create: PostCreateWithoutUserInput
}

export type ProfileUpdateWithoutUserDataInput = {
  bio?: string | NullableStringFieldUpdateOperationsInput | null
}

export type ProfileUpsertWithoutUserInput = {
  update: ProfileUpdateWithoutUserDataInput
  create: ProfileCreateWithoutUserInput
}

export type PostUpdateWithoutUserDataInput = {
  title?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  content?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
}

export type PostUpdateManyDataInput = {
  title?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  content?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
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
