
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Building
 * 
 */
export type Building = $Result.DefaultSelection<Prisma.$BuildingPayload>
/**
 * Model Panel
 * 
 */
export type Panel = $Result.DefaultSelection<Prisma.$PanelPayload>
/**
 * Model Device
 * 
 */
export type Device = $Result.DefaultSelection<Prisma.$DevicePayload>
/**
 * Model Breaker
 * 
 */
export type Breaker = $Result.DefaultSelection<Prisma.$BreakerPayload>
/**
 * Model EnergyReading
 * 
 */
export type EnergyReading = $Result.DefaultSelection<Prisma.$EnergyReadingPayload>
/**
 * Model Alert
 * 
 */
export type Alert = $Result.DefaultSelection<Prisma.$AlertPayload>
/**
 * Model AutomationRule
 * 
 */
export type AutomationRule = $Result.DefaultSelection<Prisma.$AutomationRulePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.building`: Exposes CRUD operations for the **Building** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buildings
    * const buildings = await prisma.building.findMany()
    * ```
    */
  get building(): Prisma.BuildingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.panel`: Exposes CRUD operations for the **Panel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Panels
    * const panels = await prisma.panel.findMany()
    * ```
    */
  get panel(): Prisma.PanelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.breaker`: Exposes CRUD operations for the **Breaker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Breakers
    * const breakers = await prisma.breaker.findMany()
    * ```
    */
  get breaker(): Prisma.BreakerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.energyReading`: Exposes CRUD operations for the **EnergyReading** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EnergyReadings
    * const energyReadings = await prisma.energyReading.findMany()
    * ```
    */
  get energyReading(): Prisma.EnergyReadingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.automationRule`: Exposes CRUD operations for the **AutomationRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AutomationRules
    * const automationRules = await prisma.automationRule.findMany()
    * ```
    */
  get automationRule(): Prisma.AutomationRuleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Building: 'Building',
    Panel: 'Panel',
    Device: 'Device',
    Breaker: 'Breaker',
    EnergyReading: 'EnergyReading',
    Alert: 'Alert',
    AutomationRule: 'AutomationRule'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "building" | "panel" | "device" | "breaker" | "energyReading" | "alert" | "automationRule"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Building: {
        payload: Prisma.$BuildingPayload<ExtArgs>
        fields: Prisma.BuildingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuildingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuildingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          findFirst: {
            args: Prisma.BuildingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuildingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          findMany: {
            args: Prisma.BuildingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>[]
          }
          create: {
            args: Prisma.BuildingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          createMany: {
            args: Prisma.BuildingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuildingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>[]
          }
          delete: {
            args: Prisma.BuildingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          update: {
            args: Prisma.BuildingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          deleteMany: {
            args: Prisma.BuildingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuildingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuildingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>[]
          }
          upsert: {
            args: Prisma.BuildingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          aggregate: {
            args: Prisma.BuildingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuilding>
          }
          groupBy: {
            args: Prisma.BuildingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuildingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuildingCountArgs<ExtArgs>
            result: $Utils.Optional<BuildingCountAggregateOutputType> | number
          }
        }
      }
      Panel: {
        payload: Prisma.$PanelPayload<ExtArgs>
        fields: Prisma.PanelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PanelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PanelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          findFirst: {
            args: Prisma.PanelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PanelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          findMany: {
            args: Prisma.PanelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>[]
          }
          create: {
            args: Prisma.PanelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          createMany: {
            args: Prisma.PanelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PanelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>[]
          }
          delete: {
            args: Prisma.PanelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          update: {
            args: Prisma.PanelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          deleteMany: {
            args: Prisma.PanelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PanelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PanelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>[]
          }
          upsert: {
            args: Prisma.PanelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          aggregate: {
            args: Prisma.PanelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePanel>
          }
          groupBy: {
            args: Prisma.PanelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PanelGroupByOutputType>[]
          }
          count: {
            args: Prisma.PanelCountArgs<ExtArgs>
            result: $Utils.Optional<PanelCountAggregateOutputType> | number
          }
        }
      }
      Device: {
        payload: Prisma.$DevicePayload<ExtArgs>
        fields: Prisma.DeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findFirst: {
            args: Prisma.DeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findMany: {
            args: Prisma.DeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          create: {
            args: Prisma.DeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          createMany: {
            args: Prisma.DeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          delete: {
            args: Prisma.DeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          update: {
            args: Prisma.DeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          deleteMany: {
            args: Prisma.DeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          upsert: {
            args: Prisma.DeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.DeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      Breaker: {
        payload: Prisma.$BreakerPayload<ExtArgs>
        fields: Prisma.BreakerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BreakerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BreakerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>
          }
          findFirst: {
            args: Prisma.BreakerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BreakerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>
          }
          findMany: {
            args: Prisma.BreakerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>[]
          }
          create: {
            args: Prisma.BreakerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>
          }
          createMany: {
            args: Prisma.BreakerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BreakerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>[]
          }
          delete: {
            args: Prisma.BreakerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>
          }
          update: {
            args: Prisma.BreakerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>
          }
          deleteMany: {
            args: Prisma.BreakerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BreakerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BreakerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>[]
          }
          upsert: {
            args: Prisma.BreakerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakerPayload>
          }
          aggregate: {
            args: Prisma.BreakerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBreaker>
          }
          groupBy: {
            args: Prisma.BreakerGroupByArgs<ExtArgs>
            result: $Utils.Optional<BreakerGroupByOutputType>[]
          }
          count: {
            args: Prisma.BreakerCountArgs<ExtArgs>
            result: $Utils.Optional<BreakerCountAggregateOutputType> | number
          }
        }
      }
      EnergyReading: {
        payload: Prisma.$EnergyReadingPayload<ExtArgs>
        fields: Prisma.EnergyReadingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnergyReadingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnergyReadingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>
          }
          findFirst: {
            args: Prisma.EnergyReadingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnergyReadingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>
          }
          findMany: {
            args: Prisma.EnergyReadingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>[]
          }
          create: {
            args: Prisma.EnergyReadingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>
          }
          createMany: {
            args: Prisma.EnergyReadingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnergyReadingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>[]
          }
          delete: {
            args: Prisma.EnergyReadingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>
          }
          update: {
            args: Prisma.EnergyReadingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>
          }
          deleteMany: {
            args: Prisma.EnergyReadingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnergyReadingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnergyReadingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>[]
          }
          upsert: {
            args: Prisma.EnergyReadingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyReadingPayload>
          }
          aggregate: {
            args: Prisma.EnergyReadingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnergyReading>
          }
          groupBy: {
            args: Prisma.EnergyReadingGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnergyReadingGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnergyReadingCountArgs<ExtArgs>
            result: $Utils.Optional<EnergyReadingCountAggregateOutputType> | number
          }
        }
      }
      Alert: {
        payload: Prisma.$AlertPayload<ExtArgs>
        fields: Prisma.AlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findFirst: {
            args: Prisma.AlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findMany: {
            args: Prisma.AlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          create: {
            args: Prisma.AlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          createMany: {
            args: Prisma.AlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          delete: {
            args: Prisma.AlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          update: {
            args: Prisma.AlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          deleteMany: {
            args: Prisma.AlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          upsert: {
            args: Prisma.AlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.AlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
      AutomationRule: {
        payload: Prisma.$AutomationRulePayload<ExtArgs>
        fields: Prisma.AutomationRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AutomationRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AutomationRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>
          }
          findFirst: {
            args: Prisma.AutomationRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AutomationRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>
          }
          findMany: {
            args: Prisma.AutomationRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>[]
          }
          create: {
            args: Prisma.AutomationRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>
          }
          createMany: {
            args: Prisma.AutomationRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AutomationRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>[]
          }
          delete: {
            args: Prisma.AutomationRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>
          }
          update: {
            args: Prisma.AutomationRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>
          }
          deleteMany: {
            args: Prisma.AutomationRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AutomationRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AutomationRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>[]
          }
          upsert: {
            args: Prisma.AutomationRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationRulePayload>
          }
          aggregate: {
            args: Prisma.AutomationRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAutomationRule>
          }
          groupBy: {
            args: Prisma.AutomationRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<AutomationRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.AutomationRuleCountArgs<ExtArgs>
            result: $Utils.Optional<AutomationRuleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    building?: BuildingOmit
    panel?: PanelOmit
    device?: DeviceOmit
    breaker?: BreakerOmit
    energyReading?: EnergyReadingOmit
    alert?: AlertOmit
    automationRule?: AutomationRuleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    devices: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    devices?: boolean | UserCountOutputTypeCountDevicesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDevicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
  }


  /**
   * Count Type BuildingCountOutputType
   */

  export type BuildingCountOutputType = {
    panels: number
  }

  export type BuildingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    panels?: boolean | BuildingCountOutputTypeCountPanelsArgs
  }

  // Custom InputTypes
  /**
   * BuildingCountOutputType without action
   */
  export type BuildingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingCountOutputType
     */
    select?: BuildingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BuildingCountOutputType without action
   */
  export type BuildingCountOutputTypeCountPanelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PanelWhereInput
  }


  /**
   * Count Type PanelCountOutputType
   */

  export type PanelCountOutputType = {
    breakers: number
  }

  export type PanelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breakers?: boolean | PanelCountOutputTypeCountBreakersArgs
  }

  // Custom InputTypes
  /**
   * PanelCountOutputType without action
   */
  export type PanelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PanelCountOutputType
     */
    select?: PanelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PanelCountOutputType without action
   */
  export type PanelCountOutputTypeCountBreakersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BreakerWhereInput
  }


  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    breakers: number
  }

  export type DeviceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breakers?: boolean | DeviceCountOutputTypeCountBreakersArgs
  }

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountBreakersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BreakerWhereInput
  }


  /**
   * Count Type BreakerCountOutputType
   */

  export type BreakerCountOutputType = {
    energyReadings: number
  }

  export type BreakerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    energyReadings?: boolean | BreakerCountOutputTypeCountEnergyReadingsArgs
  }

  // Custom InputTypes
  /**
   * BreakerCountOutputType without action
   */
  export type BreakerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreakerCountOutputType
     */
    select?: BreakerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BreakerCountOutputType without action
   */
  export type BreakerCountOutputTypeCountEnergyReadingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnergyReadingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    devices?: boolean | User$devicesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    devices?: boolean | User$devicesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      devices: Prisma.$DevicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    devices<T extends User$devicesArgs<ExtArgs> = {}>(args?: Subset<T, User$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.devices
   */
  export type User$devicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Building
   */

  export type AggregateBuilding = {
    _count: BuildingCountAggregateOutputType | null
    _min: BuildingMinAggregateOutputType | null
    _max: BuildingMaxAggregateOutputType | null
  }

  export type BuildingMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
  }

  export type BuildingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
  }

  export type BuildingCountAggregateOutputType = {
    id: number
    name: number
    address: number
    _all: number
  }


  export type BuildingMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
  }

  export type BuildingMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
  }

  export type BuildingCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    _all?: true
  }

  export type BuildingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Building to aggregate.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Buildings
    **/
    _count?: true | BuildingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuildingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuildingMaxAggregateInputType
  }

  export type GetBuildingAggregateType<T extends BuildingAggregateArgs> = {
        [P in keyof T & keyof AggregateBuilding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuilding[P]>
      : GetScalarType<T[P], AggregateBuilding[P]>
  }




  export type BuildingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuildingWhereInput
    orderBy?: BuildingOrderByWithAggregationInput | BuildingOrderByWithAggregationInput[]
    by: BuildingScalarFieldEnum[] | BuildingScalarFieldEnum
    having?: BuildingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuildingCountAggregateInputType | true
    _min?: BuildingMinAggregateInputType
    _max?: BuildingMaxAggregateInputType
  }

  export type BuildingGroupByOutputType = {
    id: string
    name: string
    address: string | null
    _count: BuildingCountAggregateOutputType | null
    _min: BuildingMinAggregateOutputType | null
    _max: BuildingMaxAggregateOutputType | null
  }

  type GetBuildingGroupByPayload<T extends BuildingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuildingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuildingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuildingGroupByOutputType[P]>
            : GetScalarType<T[P], BuildingGroupByOutputType[P]>
        }
      >
    >


  export type BuildingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    panels?: boolean | Building$panelsArgs<ExtArgs>
    _count?: boolean | BuildingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["building"]>

  export type BuildingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
  }, ExtArgs["result"]["building"]>

  export type BuildingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
  }, ExtArgs["result"]["building"]>

  export type BuildingSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
  }

  export type BuildingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address", ExtArgs["result"]["building"]>
  export type BuildingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    panels?: boolean | Building$panelsArgs<ExtArgs>
    _count?: boolean | BuildingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BuildingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BuildingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BuildingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Building"
    objects: {
      panels: Prisma.$PanelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
    }, ExtArgs["result"]["building"]>
    composites: {}
  }

  type BuildingGetPayload<S extends boolean | null | undefined | BuildingDefaultArgs> = $Result.GetResult<Prisma.$BuildingPayload, S>

  type BuildingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuildingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuildingCountAggregateInputType | true
    }

  export interface BuildingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Building'], meta: { name: 'Building' } }
    /**
     * Find zero or one Building that matches the filter.
     * @param {BuildingFindUniqueArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuildingFindUniqueArgs>(args: SelectSubset<T, BuildingFindUniqueArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Building that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuildingFindUniqueOrThrowArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuildingFindUniqueOrThrowArgs>(args: SelectSubset<T, BuildingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Building that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindFirstArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuildingFindFirstArgs>(args?: SelectSubset<T, BuildingFindFirstArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Building that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindFirstOrThrowArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuildingFindFirstOrThrowArgs>(args?: SelectSubset<T, BuildingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Buildings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Buildings
     * const buildings = await prisma.building.findMany()
     * 
     * // Get first 10 Buildings
     * const buildings = await prisma.building.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buildingWithIdOnly = await prisma.building.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuildingFindManyArgs>(args?: SelectSubset<T, BuildingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Building.
     * @param {BuildingCreateArgs} args - Arguments to create a Building.
     * @example
     * // Create one Building
     * const Building = await prisma.building.create({
     *   data: {
     *     // ... data to create a Building
     *   }
     * })
     * 
     */
    create<T extends BuildingCreateArgs>(args: SelectSubset<T, BuildingCreateArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Buildings.
     * @param {BuildingCreateManyArgs} args - Arguments to create many Buildings.
     * @example
     * // Create many Buildings
     * const building = await prisma.building.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuildingCreateManyArgs>(args?: SelectSubset<T, BuildingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Buildings and returns the data saved in the database.
     * @param {BuildingCreateManyAndReturnArgs} args - Arguments to create many Buildings.
     * @example
     * // Create many Buildings
     * const building = await prisma.building.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Buildings and only return the `id`
     * const buildingWithIdOnly = await prisma.building.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuildingCreateManyAndReturnArgs>(args?: SelectSubset<T, BuildingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Building.
     * @param {BuildingDeleteArgs} args - Arguments to delete one Building.
     * @example
     * // Delete one Building
     * const Building = await prisma.building.delete({
     *   where: {
     *     // ... filter to delete one Building
     *   }
     * })
     * 
     */
    delete<T extends BuildingDeleteArgs>(args: SelectSubset<T, BuildingDeleteArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Building.
     * @param {BuildingUpdateArgs} args - Arguments to update one Building.
     * @example
     * // Update one Building
     * const building = await prisma.building.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuildingUpdateArgs>(args: SelectSubset<T, BuildingUpdateArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Buildings.
     * @param {BuildingDeleteManyArgs} args - Arguments to filter Buildings to delete.
     * @example
     * // Delete a few Buildings
     * const { count } = await prisma.building.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuildingDeleteManyArgs>(args?: SelectSubset<T, BuildingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buildings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Buildings
     * const building = await prisma.building.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuildingUpdateManyArgs>(args: SelectSubset<T, BuildingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buildings and returns the data updated in the database.
     * @param {BuildingUpdateManyAndReturnArgs} args - Arguments to update many Buildings.
     * @example
     * // Update many Buildings
     * const building = await prisma.building.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Buildings and only return the `id`
     * const buildingWithIdOnly = await prisma.building.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BuildingUpdateManyAndReturnArgs>(args: SelectSubset<T, BuildingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Building.
     * @param {BuildingUpsertArgs} args - Arguments to update or create a Building.
     * @example
     * // Update or create a Building
     * const building = await prisma.building.upsert({
     *   create: {
     *     // ... data to create a Building
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Building we want to update
     *   }
     * })
     */
    upsert<T extends BuildingUpsertArgs>(args: SelectSubset<T, BuildingUpsertArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Buildings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingCountArgs} args - Arguments to filter Buildings to count.
     * @example
     * // Count the number of Buildings
     * const count = await prisma.building.count({
     *   where: {
     *     // ... the filter for the Buildings we want to count
     *   }
     * })
    **/
    count<T extends BuildingCountArgs>(
      args?: Subset<T, BuildingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuildingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Building.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BuildingAggregateArgs>(args: Subset<T, BuildingAggregateArgs>): Prisma.PrismaPromise<GetBuildingAggregateType<T>>

    /**
     * Group by Building.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BuildingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuildingGroupByArgs['orderBy'] }
        : { orderBy?: BuildingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BuildingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuildingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Building model
   */
  readonly fields: BuildingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Building.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuildingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    panels<T extends Building$panelsArgs<ExtArgs> = {}>(args?: Subset<T, Building$panelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Building model
   */
  interface BuildingFieldRefs {
    readonly id: FieldRef<"Building", 'String'>
    readonly name: FieldRef<"Building", 'String'>
    readonly address: FieldRef<"Building", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Building findUnique
   */
  export type BuildingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building findUniqueOrThrow
   */
  export type BuildingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building findFirst
   */
  export type BuildingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buildings.
     */
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building findFirstOrThrow
   */
  export type BuildingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buildings.
     */
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building findMany
   */
  export type BuildingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter, which Buildings to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buildings.
     */
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building create
   */
  export type BuildingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * The data needed to create a Building.
     */
    data: XOR<BuildingCreateInput, BuildingUncheckedCreateInput>
  }

  /**
   * Building createMany
   */
  export type BuildingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Buildings.
     */
    data: BuildingCreateManyInput | BuildingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Building createManyAndReturn
   */
  export type BuildingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * The data used to create many Buildings.
     */
    data: BuildingCreateManyInput | BuildingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Building update
   */
  export type BuildingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * The data needed to update a Building.
     */
    data: XOR<BuildingUpdateInput, BuildingUncheckedUpdateInput>
    /**
     * Choose, which Building to update.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building updateMany
   */
  export type BuildingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Buildings.
     */
    data: XOR<BuildingUpdateManyMutationInput, BuildingUncheckedUpdateManyInput>
    /**
     * Filter which Buildings to update
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to update.
     */
    limit?: number
  }

  /**
   * Building updateManyAndReturn
   */
  export type BuildingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * The data used to update Buildings.
     */
    data: XOR<BuildingUpdateManyMutationInput, BuildingUncheckedUpdateManyInput>
    /**
     * Filter which Buildings to update
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to update.
     */
    limit?: number
  }

  /**
   * Building upsert
   */
  export type BuildingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * The filter to search for the Building to update in case it exists.
     */
    where: BuildingWhereUniqueInput
    /**
     * In case the Building found by the `where` argument doesn't exist, create a new Building with this data.
     */
    create: XOR<BuildingCreateInput, BuildingUncheckedCreateInput>
    /**
     * In case the Building was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuildingUpdateInput, BuildingUncheckedUpdateInput>
  }

  /**
   * Building delete
   */
  export type BuildingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
    /**
     * Filter which Building to delete.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building deleteMany
   */
  export type BuildingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buildings to delete
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to delete.
     */
    limit?: number
  }

  /**
   * Building.panels
   */
  export type Building$panelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    where?: PanelWhereInput
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    cursor?: PanelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PanelScalarFieldEnum | PanelScalarFieldEnum[]
  }

  /**
   * Building without action
   */
  export type BuildingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuildingInclude<ExtArgs> | null
  }


  /**
   * Model Panel
   */

  export type AggregatePanel = {
    _count: PanelCountAggregateOutputType | null
    _min: PanelMinAggregateOutputType | null
    _max: PanelMaxAggregateOutputType | null
  }

  export type PanelMinAggregateOutputType = {
    id: string | null
    name: string | null
    buildingId: string | null
  }

  export type PanelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    buildingId: string | null
  }

  export type PanelCountAggregateOutputType = {
    id: number
    name: number
    buildingId: number
    _all: number
  }


  export type PanelMinAggregateInputType = {
    id?: true
    name?: true
    buildingId?: true
  }

  export type PanelMaxAggregateInputType = {
    id?: true
    name?: true
    buildingId?: true
  }

  export type PanelCountAggregateInputType = {
    id?: true
    name?: true
    buildingId?: true
    _all?: true
  }

  export type PanelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Panel to aggregate.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Panels
    **/
    _count?: true | PanelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PanelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PanelMaxAggregateInputType
  }

  export type GetPanelAggregateType<T extends PanelAggregateArgs> = {
        [P in keyof T & keyof AggregatePanel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePanel[P]>
      : GetScalarType<T[P], AggregatePanel[P]>
  }




  export type PanelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PanelWhereInput
    orderBy?: PanelOrderByWithAggregationInput | PanelOrderByWithAggregationInput[]
    by: PanelScalarFieldEnum[] | PanelScalarFieldEnum
    having?: PanelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PanelCountAggregateInputType | true
    _min?: PanelMinAggregateInputType
    _max?: PanelMaxAggregateInputType
  }

  export type PanelGroupByOutputType = {
    id: string
    name: string
    buildingId: string
    _count: PanelCountAggregateOutputType | null
    _min: PanelMinAggregateOutputType | null
    _max: PanelMaxAggregateOutputType | null
  }

  type GetPanelGroupByPayload<T extends PanelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PanelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PanelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PanelGroupByOutputType[P]>
            : GetScalarType<T[P], PanelGroupByOutputType[P]>
        }
      >
    >


  export type PanelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    buildingId?: boolean
    building?: boolean | BuildingDefaultArgs<ExtArgs>
    breakers?: boolean | Panel$breakersArgs<ExtArgs>
    _count?: boolean | PanelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["panel"]>

  export type PanelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    buildingId?: boolean
    building?: boolean | BuildingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["panel"]>

  export type PanelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    buildingId?: boolean
    building?: boolean | BuildingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["panel"]>

  export type PanelSelectScalar = {
    id?: boolean
    name?: boolean
    buildingId?: boolean
  }

  export type PanelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "buildingId", ExtArgs["result"]["panel"]>
  export type PanelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    building?: boolean | BuildingDefaultArgs<ExtArgs>
    breakers?: boolean | Panel$breakersArgs<ExtArgs>
    _count?: boolean | PanelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PanelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    building?: boolean | BuildingDefaultArgs<ExtArgs>
  }
  export type PanelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    building?: boolean | BuildingDefaultArgs<ExtArgs>
  }

  export type $PanelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Panel"
    objects: {
      building: Prisma.$BuildingPayload<ExtArgs>
      breakers: Prisma.$BreakerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      buildingId: string
    }, ExtArgs["result"]["panel"]>
    composites: {}
  }

  type PanelGetPayload<S extends boolean | null | undefined | PanelDefaultArgs> = $Result.GetResult<Prisma.$PanelPayload, S>

  type PanelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PanelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PanelCountAggregateInputType | true
    }

  export interface PanelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Panel'], meta: { name: 'Panel' } }
    /**
     * Find zero or one Panel that matches the filter.
     * @param {PanelFindUniqueArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PanelFindUniqueArgs>(args: SelectSubset<T, PanelFindUniqueArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Panel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PanelFindUniqueOrThrowArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PanelFindUniqueOrThrowArgs>(args: SelectSubset<T, PanelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Panel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelFindFirstArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PanelFindFirstArgs>(args?: SelectSubset<T, PanelFindFirstArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Panel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelFindFirstOrThrowArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PanelFindFirstOrThrowArgs>(args?: SelectSubset<T, PanelFindFirstOrThrowArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Panels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Panels
     * const panels = await prisma.panel.findMany()
     * 
     * // Get first 10 Panels
     * const panels = await prisma.panel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const panelWithIdOnly = await prisma.panel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PanelFindManyArgs>(args?: SelectSubset<T, PanelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Panel.
     * @param {PanelCreateArgs} args - Arguments to create a Panel.
     * @example
     * // Create one Panel
     * const Panel = await prisma.panel.create({
     *   data: {
     *     // ... data to create a Panel
     *   }
     * })
     * 
     */
    create<T extends PanelCreateArgs>(args: SelectSubset<T, PanelCreateArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Panels.
     * @param {PanelCreateManyArgs} args - Arguments to create many Panels.
     * @example
     * // Create many Panels
     * const panel = await prisma.panel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PanelCreateManyArgs>(args?: SelectSubset<T, PanelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Panels and returns the data saved in the database.
     * @param {PanelCreateManyAndReturnArgs} args - Arguments to create many Panels.
     * @example
     * // Create many Panels
     * const panel = await prisma.panel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Panels and only return the `id`
     * const panelWithIdOnly = await prisma.panel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PanelCreateManyAndReturnArgs>(args?: SelectSubset<T, PanelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Panel.
     * @param {PanelDeleteArgs} args - Arguments to delete one Panel.
     * @example
     * // Delete one Panel
     * const Panel = await prisma.panel.delete({
     *   where: {
     *     // ... filter to delete one Panel
     *   }
     * })
     * 
     */
    delete<T extends PanelDeleteArgs>(args: SelectSubset<T, PanelDeleteArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Panel.
     * @param {PanelUpdateArgs} args - Arguments to update one Panel.
     * @example
     * // Update one Panel
     * const panel = await prisma.panel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PanelUpdateArgs>(args: SelectSubset<T, PanelUpdateArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Panels.
     * @param {PanelDeleteManyArgs} args - Arguments to filter Panels to delete.
     * @example
     * // Delete a few Panels
     * const { count } = await prisma.panel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PanelDeleteManyArgs>(args?: SelectSubset<T, PanelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Panels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Panels
     * const panel = await prisma.panel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PanelUpdateManyArgs>(args: SelectSubset<T, PanelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Panels and returns the data updated in the database.
     * @param {PanelUpdateManyAndReturnArgs} args - Arguments to update many Panels.
     * @example
     * // Update many Panels
     * const panel = await prisma.panel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Panels and only return the `id`
     * const panelWithIdOnly = await prisma.panel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PanelUpdateManyAndReturnArgs>(args: SelectSubset<T, PanelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Panel.
     * @param {PanelUpsertArgs} args - Arguments to update or create a Panel.
     * @example
     * // Update or create a Panel
     * const panel = await prisma.panel.upsert({
     *   create: {
     *     // ... data to create a Panel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Panel we want to update
     *   }
     * })
     */
    upsert<T extends PanelUpsertArgs>(args: SelectSubset<T, PanelUpsertArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Panels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelCountArgs} args - Arguments to filter Panels to count.
     * @example
     * // Count the number of Panels
     * const count = await prisma.panel.count({
     *   where: {
     *     // ... the filter for the Panels we want to count
     *   }
     * })
    **/
    count<T extends PanelCountArgs>(
      args?: Subset<T, PanelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PanelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Panel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PanelAggregateArgs>(args: Subset<T, PanelAggregateArgs>): Prisma.PrismaPromise<GetPanelAggregateType<T>>

    /**
     * Group by Panel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PanelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PanelGroupByArgs['orderBy'] }
        : { orderBy?: PanelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PanelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPanelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Panel model
   */
  readonly fields: PanelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Panel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PanelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    building<T extends BuildingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BuildingDefaultArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    breakers<T extends Panel$breakersArgs<ExtArgs> = {}>(args?: Subset<T, Panel$breakersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Panel model
   */
  interface PanelFieldRefs {
    readonly id: FieldRef<"Panel", 'String'>
    readonly name: FieldRef<"Panel", 'String'>
    readonly buildingId: FieldRef<"Panel", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Panel findUnique
   */
  export type PanelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel findUniqueOrThrow
   */
  export type PanelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel findFirst
   */
  export type PanelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Panels.
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Panels.
     */
    distinct?: PanelScalarFieldEnum | PanelScalarFieldEnum[]
  }

  /**
   * Panel findFirstOrThrow
   */
  export type PanelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Panels.
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Panels.
     */
    distinct?: PanelScalarFieldEnum | PanelScalarFieldEnum[]
  }

  /**
   * Panel findMany
   */
  export type PanelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panels to fetch.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Panels.
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Panels.
     */
    distinct?: PanelScalarFieldEnum | PanelScalarFieldEnum[]
  }

  /**
   * Panel create
   */
  export type PanelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * The data needed to create a Panel.
     */
    data: XOR<PanelCreateInput, PanelUncheckedCreateInput>
  }

  /**
   * Panel createMany
   */
  export type PanelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Panels.
     */
    data: PanelCreateManyInput | PanelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Panel createManyAndReturn
   */
  export type PanelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * The data used to create many Panels.
     */
    data: PanelCreateManyInput | PanelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Panel update
   */
  export type PanelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * The data needed to update a Panel.
     */
    data: XOR<PanelUpdateInput, PanelUncheckedUpdateInput>
    /**
     * Choose, which Panel to update.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel updateMany
   */
  export type PanelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Panels.
     */
    data: XOR<PanelUpdateManyMutationInput, PanelUncheckedUpdateManyInput>
    /**
     * Filter which Panels to update
     */
    where?: PanelWhereInput
    /**
     * Limit how many Panels to update.
     */
    limit?: number
  }

  /**
   * Panel updateManyAndReturn
   */
  export type PanelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * The data used to update Panels.
     */
    data: XOR<PanelUpdateManyMutationInput, PanelUncheckedUpdateManyInput>
    /**
     * Filter which Panels to update
     */
    where?: PanelWhereInput
    /**
     * Limit how many Panels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Panel upsert
   */
  export type PanelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * The filter to search for the Panel to update in case it exists.
     */
    where: PanelWhereUniqueInput
    /**
     * In case the Panel found by the `where` argument doesn't exist, create a new Panel with this data.
     */
    create: XOR<PanelCreateInput, PanelUncheckedCreateInput>
    /**
     * In case the Panel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PanelUpdateInput, PanelUncheckedUpdateInput>
  }

  /**
   * Panel delete
   */
  export type PanelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter which Panel to delete.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel deleteMany
   */
  export type PanelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Panels to delete
     */
    where?: PanelWhereInput
    /**
     * Limit how many Panels to delete.
     */
    limit?: number
  }

  /**
   * Panel.breakers
   */
  export type Panel$breakersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    where?: BreakerWhereInput
    orderBy?: BreakerOrderByWithRelationInput | BreakerOrderByWithRelationInput[]
    cursor?: BreakerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BreakerScalarFieldEnum | BreakerScalarFieldEnum[]
  }

  /**
   * Panel without action
   */
  export type PanelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
  }


  /**
   * Model Device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceMinAggregateOutputType = {
    id: string | null
    macAddress: string | null
    type: string | null
    firmwareVersion: string | null
    onlineStatus: boolean | null
    lastSeen: Date | null
    userId: string | null
    createdAt: Date | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: string | null
    macAddress: string | null
    type: string | null
    firmwareVersion: string | null
    onlineStatus: boolean | null
    lastSeen: Date | null
    userId: string | null
    createdAt: Date | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    macAddress: number
    type: number
    firmwareVersion: number
    onlineStatus: number
    lastSeen: number
    userId: number
    createdAt: number
    _all: number
  }


  export type DeviceMinAggregateInputType = {
    id?: true
    macAddress?: true
    type?: true
    firmwareVersion?: true
    onlineStatus?: true
    lastSeen?: true
    userId?: true
    createdAt?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    macAddress?: true
    type?: true
    firmwareVersion?: true
    onlineStatus?: true
    lastSeen?: true
    userId?: true
    createdAt?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    macAddress?: true
    type?: true
    firmwareVersion?: true
    onlineStatus?: true
    lastSeen?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithAggregationInput | DeviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    id: string
    macAddress: string
    type: string
    firmwareVersion: string | null
    onlineStatus: boolean
    lastSeen: Date | null
    userId: string | null
    createdAt: Date
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    macAddress?: boolean
    type?: boolean
    firmwareVersion?: boolean
    onlineStatus?: boolean
    lastSeen?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Device$userArgs<ExtArgs>
    breakers?: boolean | Device$breakersArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    macAddress?: boolean
    type?: boolean
    firmwareVersion?: boolean
    onlineStatus?: boolean
    lastSeen?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Device$userArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    macAddress?: boolean
    type?: boolean
    firmwareVersion?: boolean
    onlineStatus?: boolean
    lastSeen?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Device$userArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectScalar = {
    id?: boolean
    macAddress?: boolean
    type?: boolean
    firmwareVersion?: boolean
    onlineStatus?: boolean
    lastSeen?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type DeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "macAddress" | "type" | "firmwareVersion" | "onlineStatus" | "lastSeen" | "userId" | "createdAt", ExtArgs["result"]["device"]>
  export type DeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Device$userArgs<ExtArgs>
    breakers?: boolean | Device$breakersArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Device$userArgs<ExtArgs>
  }
  export type DeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Device$userArgs<ExtArgs>
  }

  export type $DevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Device"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      breakers: Prisma.$BreakerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      macAddress: string
      type: string
      firmwareVersion: string | null
      onlineStatus: boolean
      lastSeen: Date | null
      userId: string | null
      createdAt: Date
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = $Result.GetResult<Prisma.$DevicePayload, S>

  type DeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Device'], meta: { name: 'Device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceFindUniqueArgs>(args: SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceFindFirstArgs>(args?: SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceFindManyArgs>(args?: SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends DeviceCreateArgs>(args: SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Devices.
     * @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceCreateManyArgs>(args?: SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {DeviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends DeviceDeleteArgs>(args: SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceUpdateArgs>(args: SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceDeleteManyArgs>(args?: SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceUpdateManyArgs>(args: SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices and returns the data updated in the database.
     * @param {DeviceUpdateManyAndReturnArgs} args - Arguments to update many Devices.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends DeviceUpsertArgs>(args: SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Device model
   */
  readonly fields: DeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Device$userArgs<ExtArgs> = {}>(args?: Subset<T, Device$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    breakers<T extends Device$breakersArgs<ExtArgs> = {}>(args?: Subset<T, Device$breakersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Device model
   */
  interface DeviceFieldRefs {
    readonly id: FieldRef<"Device", 'String'>
    readonly macAddress: FieldRef<"Device", 'String'>
    readonly type: FieldRef<"Device", 'String'>
    readonly firmwareVersion: FieldRef<"Device", 'String'>
    readonly onlineStatus: FieldRef<"Device", 'Boolean'>
    readonly lastSeen: FieldRef<"Device", 'DateTime'>
    readonly userId: FieldRef<"Device", 'String'>
    readonly createdAt: FieldRef<"Device", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Device findUnique
   */
  export type DeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findFirst
   */
  export type DeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findMany
   */
  export type DeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device create
   */
  export type DeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Device.
     */
    data: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }

  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Device createManyAndReturn
   */
  export type DeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device update
   */
  export type DeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
  }

  /**
   * Device updateManyAndReturn
   */
  export type DeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device upsert
   */
  export type DeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }

  /**
   * Device delete
   */
  export type DeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to delete.
     */
    limit?: number
  }

  /**
   * Device.user
   */
  export type Device$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Device.breakers
   */
  export type Device$breakersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    where?: BreakerWhereInput
    orderBy?: BreakerOrderByWithRelationInput | BreakerOrderByWithRelationInput[]
    cursor?: BreakerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BreakerScalarFieldEnum | BreakerScalarFieldEnum[]
  }

  /**
   * Device without action
   */
  export type DeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
  }


  /**
   * Model Breaker
   */

  export type AggregateBreaker = {
    _count: BreakerCountAggregateOutputType | null
    _min: BreakerMinAggregateOutputType | null
    _max: BreakerMaxAggregateOutputType | null
  }

  export type BreakerMinAggregateOutputType = {
    id: string | null
    label: string | null
    phase: string | null
    panelId: string | null
    deviceId: string | null
  }

  export type BreakerMaxAggregateOutputType = {
    id: string | null
    label: string | null
    phase: string | null
    panelId: string | null
    deviceId: string | null
  }

  export type BreakerCountAggregateOutputType = {
    id: number
    label: number
    phase: number
    panelId: number
    deviceId: number
    _all: number
  }


  export type BreakerMinAggregateInputType = {
    id?: true
    label?: true
    phase?: true
    panelId?: true
    deviceId?: true
  }

  export type BreakerMaxAggregateInputType = {
    id?: true
    label?: true
    phase?: true
    panelId?: true
    deviceId?: true
  }

  export type BreakerCountAggregateInputType = {
    id?: true
    label?: true
    phase?: true
    panelId?: true
    deviceId?: true
    _all?: true
  }

  export type BreakerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Breaker to aggregate.
     */
    where?: BreakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breakers to fetch.
     */
    orderBy?: BreakerOrderByWithRelationInput | BreakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BreakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Breakers
    **/
    _count?: true | BreakerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BreakerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BreakerMaxAggregateInputType
  }

  export type GetBreakerAggregateType<T extends BreakerAggregateArgs> = {
        [P in keyof T & keyof AggregateBreaker]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBreaker[P]>
      : GetScalarType<T[P], AggregateBreaker[P]>
  }




  export type BreakerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BreakerWhereInput
    orderBy?: BreakerOrderByWithAggregationInput | BreakerOrderByWithAggregationInput[]
    by: BreakerScalarFieldEnum[] | BreakerScalarFieldEnum
    having?: BreakerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BreakerCountAggregateInputType | true
    _min?: BreakerMinAggregateInputType
    _max?: BreakerMaxAggregateInputType
  }

  export type BreakerGroupByOutputType = {
    id: string
    label: string
    phase: string | null
    panelId: string
    deviceId: string
    _count: BreakerCountAggregateOutputType | null
    _min: BreakerMinAggregateOutputType | null
    _max: BreakerMaxAggregateOutputType | null
  }

  type GetBreakerGroupByPayload<T extends BreakerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BreakerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BreakerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BreakerGroupByOutputType[P]>
            : GetScalarType<T[P], BreakerGroupByOutputType[P]>
        }
      >
    >


  export type BreakerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    phase?: boolean
    panelId?: boolean
    deviceId?: boolean
    panel?: boolean | PanelDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
    energyReadings?: boolean | Breaker$energyReadingsArgs<ExtArgs>
    _count?: boolean | BreakerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["breaker"]>

  export type BreakerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    phase?: boolean
    panelId?: boolean
    deviceId?: boolean
    panel?: boolean | PanelDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["breaker"]>

  export type BreakerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    phase?: boolean
    panelId?: boolean
    deviceId?: boolean
    panel?: boolean | PanelDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["breaker"]>

  export type BreakerSelectScalar = {
    id?: boolean
    label?: boolean
    phase?: boolean
    panelId?: boolean
    deviceId?: boolean
  }

  export type BreakerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "label" | "phase" | "panelId" | "deviceId", ExtArgs["result"]["breaker"]>
  export type BreakerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    panel?: boolean | PanelDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
    energyReadings?: boolean | Breaker$energyReadingsArgs<ExtArgs>
    _count?: boolean | BreakerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BreakerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    panel?: boolean | PanelDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type BreakerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    panel?: boolean | PanelDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }

  export type $BreakerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Breaker"
    objects: {
      panel: Prisma.$PanelPayload<ExtArgs>
      device: Prisma.$DevicePayload<ExtArgs>
      energyReadings: Prisma.$EnergyReadingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      label: string
      phase: string | null
      panelId: string
      deviceId: string
    }, ExtArgs["result"]["breaker"]>
    composites: {}
  }

  type BreakerGetPayload<S extends boolean | null | undefined | BreakerDefaultArgs> = $Result.GetResult<Prisma.$BreakerPayload, S>

  type BreakerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BreakerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BreakerCountAggregateInputType | true
    }

  export interface BreakerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Breaker'], meta: { name: 'Breaker' } }
    /**
     * Find zero or one Breaker that matches the filter.
     * @param {BreakerFindUniqueArgs} args - Arguments to find a Breaker
     * @example
     * // Get one Breaker
     * const breaker = await prisma.breaker.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BreakerFindUniqueArgs>(args: SelectSubset<T, BreakerFindUniqueArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Breaker that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BreakerFindUniqueOrThrowArgs} args - Arguments to find a Breaker
     * @example
     * // Get one Breaker
     * const breaker = await prisma.breaker.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BreakerFindUniqueOrThrowArgs>(args: SelectSubset<T, BreakerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Breaker that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakerFindFirstArgs} args - Arguments to find a Breaker
     * @example
     * // Get one Breaker
     * const breaker = await prisma.breaker.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BreakerFindFirstArgs>(args?: SelectSubset<T, BreakerFindFirstArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Breaker that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakerFindFirstOrThrowArgs} args - Arguments to find a Breaker
     * @example
     * // Get one Breaker
     * const breaker = await prisma.breaker.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BreakerFindFirstOrThrowArgs>(args?: SelectSubset<T, BreakerFindFirstOrThrowArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Breakers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Breakers
     * const breakers = await prisma.breaker.findMany()
     * 
     * // Get first 10 Breakers
     * const breakers = await prisma.breaker.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const breakerWithIdOnly = await prisma.breaker.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BreakerFindManyArgs>(args?: SelectSubset<T, BreakerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Breaker.
     * @param {BreakerCreateArgs} args - Arguments to create a Breaker.
     * @example
     * // Create one Breaker
     * const Breaker = await prisma.breaker.create({
     *   data: {
     *     // ... data to create a Breaker
     *   }
     * })
     * 
     */
    create<T extends BreakerCreateArgs>(args: SelectSubset<T, BreakerCreateArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Breakers.
     * @param {BreakerCreateManyArgs} args - Arguments to create many Breakers.
     * @example
     * // Create many Breakers
     * const breaker = await prisma.breaker.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BreakerCreateManyArgs>(args?: SelectSubset<T, BreakerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Breakers and returns the data saved in the database.
     * @param {BreakerCreateManyAndReturnArgs} args - Arguments to create many Breakers.
     * @example
     * // Create many Breakers
     * const breaker = await prisma.breaker.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Breakers and only return the `id`
     * const breakerWithIdOnly = await prisma.breaker.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BreakerCreateManyAndReturnArgs>(args?: SelectSubset<T, BreakerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Breaker.
     * @param {BreakerDeleteArgs} args - Arguments to delete one Breaker.
     * @example
     * // Delete one Breaker
     * const Breaker = await prisma.breaker.delete({
     *   where: {
     *     // ... filter to delete one Breaker
     *   }
     * })
     * 
     */
    delete<T extends BreakerDeleteArgs>(args: SelectSubset<T, BreakerDeleteArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Breaker.
     * @param {BreakerUpdateArgs} args - Arguments to update one Breaker.
     * @example
     * // Update one Breaker
     * const breaker = await prisma.breaker.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BreakerUpdateArgs>(args: SelectSubset<T, BreakerUpdateArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Breakers.
     * @param {BreakerDeleteManyArgs} args - Arguments to filter Breakers to delete.
     * @example
     * // Delete a few Breakers
     * const { count } = await prisma.breaker.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BreakerDeleteManyArgs>(args?: SelectSubset<T, BreakerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Breakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Breakers
     * const breaker = await prisma.breaker.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BreakerUpdateManyArgs>(args: SelectSubset<T, BreakerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Breakers and returns the data updated in the database.
     * @param {BreakerUpdateManyAndReturnArgs} args - Arguments to update many Breakers.
     * @example
     * // Update many Breakers
     * const breaker = await prisma.breaker.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Breakers and only return the `id`
     * const breakerWithIdOnly = await prisma.breaker.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BreakerUpdateManyAndReturnArgs>(args: SelectSubset<T, BreakerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Breaker.
     * @param {BreakerUpsertArgs} args - Arguments to update or create a Breaker.
     * @example
     * // Update or create a Breaker
     * const breaker = await prisma.breaker.upsert({
     *   create: {
     *     // ... data to create a Breaker
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Breaker we want to update
     *   }
     * })
     */
    upsert<T extends BreakerUpsertArgs>(args: SelectSubset<T, BreakerUpsertArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Breakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakerCountArgs} args - Arguments to filter Breakers to count.
     * @example
     * // Count the number of Breakers
     * const count = await prisma.breaker.count({
     *   where: {
     *     // ... the filter for the Breakers we want to count
     *   }
     * })
    **/
    count<T extends BreakerCountArgs>(
      args?: Subset<T, BreakerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BreakerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Breaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BreakerAggregateArgs>(args: Subset<T, BreakerAggregateArgs>): Prisma.PrismaPromise<GetBreakerAggregateType<T>>

    /**
     * Group by Breaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BreakerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BreakerGroupByArgs['orderBy'] }
        : { orderBy?: BreakerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BreakerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBreakerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Breaker model
   */
  readonly fields: BreakerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Breaker.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BreakerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    panel<T extends PanelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PanelDefaultArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    device<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    energyReadings<T extends Breaker$energyReadingsArgs<ExtArgs> = {}>(args?: Subset<T, Breaker$energyReadingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Breaker model
   */
  interface BreakerFieldRefs {
    readonly id: FieldRef<"Breaker", 'String'>
    readonly label: FieldRef<"Breaker", 'String'>
    readonly phase: FieldRef<"Breaker", 'String'>
    readonly panelId: FieldRef<"Breaker", 'String'>
    readonly deviceId: FieldRef<"Breaker", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Breaker findUnique
   */
  export type BreakerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * Filter, which Breaker to fetch.
     */
    where: BreakerWhereUniqueInput
  }

  /**
   * Breaker findUniqueOrThrow
   */
  export type BreakerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * Filter, which Breaker to fetch.
     */
    where: BreakerWhereUniqueInput
  }

  /**
   * Breaker findFirst
   */
  export type BreakerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * Filter, which Breaker to fetch.
     */
    where?: BreakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breakers to fetch.
     */
    orderBy?: BreakerOrderByWithRelationInput | BreakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Breakers.
     */
    cursor?: BreakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Breakers.
     */
    distinct?: BreakerScalarFieldEnum | BreakerScalarFieldEnum[]
  }

  /**
   * Breaker findFirstOrThrow
   */
  export type BreakerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * Filter, which Breaker to fetch.
     */
    where?: BreakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breakers to fetch.
     */
    orderBy?: BreakerOrderByWithRelationInput | BreakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Breakers.
     */
    cursor?: BreakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Breakers.
     */
    distinct?: BreakerScalarFieldEnum | BreakerScalarFieldEnum[]
  }

  /**
   * Breaker findMany
   */
  export type BreakerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * Filter, which Breakers to fetch.
     */
    where?: BreakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breakers to fetch.
     */
    orderBy?: BreakerOrderByWithRelationInput | BreakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Breakers.
     */
    cursor?: BreakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Breakers.
     */
    distinct?: BreakerScalarFieldEnum | BreakerScalarFieldEnum[]
  }

  /**
   * Breaker create
   */
  export type BreakerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * The data needed to create a Breaker.
     */
    data: XOR<BreakerCreateInput, BreakerUncheckedCreateInput>
  }

  /**
   * Breaker createMany
   */
  export type BreakerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Breakers.
     */
    data: BreakerCreateManyInput | BreakerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Breaker createManyAndReturn
   */
  export type BreakerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * The data used to create many Breakers.
     */
    data: BreakerCreateManyInput | BreakerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Breaker update
   */
  export type BreakerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * The data needed to update a Breaker.
     */
    data: XOR<BreakerUpdateInput, BreakerUncheckedUpdateInput>
    /**
     * Choose, which Breaker to update.
     */
    where: BreakerWhereUniqueInput
  }

  /**
   * Breaker updateMany
   */
  export type BreakerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Breakers.
     */
    data: XOR<BreakerUpdateManyMutationInput, BreakerUncheckedUpdateManyInput>
    /**
     * Filter which Breakers to update
     */
    where?: BreakerWhereInput
    /**
     * Limit how many Breakers to update.
     */
    limit?: number
  }

  /**
   * Breaker updateManyAndReturn
   */
  export type BreakerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * The data used to update Breakers.
     */
    data: XOR<BreakerUpdateManyMutationInput, BreakerUncheckedUpdateManyInput>
    /**
     * Filter which Breakers to update
     */
    where?: BreakerWhereInput
    /**
     * Limit how many Breakers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Breaker upsert
   */
  export type BreakerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * The filter to search for the Breaker to update in case it exists.
     */
    where: BreakerWhereUniqueInput
    /**
     * In case the Breaker found by the `where` argument doesn't exist, create a new Breaker with this data.
     */
    create: XOR<BreakerCreateInput, BreakerUncheckedCreateInput>
    /**
     * In case the Breaker was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BreakerUpdateInput, BreakerUncheckedUpdateInput>
  }

  /**
   * Breaker delete
   */
  export type BreakerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
    /**
     * Filter which Breaker to delete.
     */
    where: BreakerWhereUniqueInput
  }

  /**
   * Breaker deleteMany
   */
  export type BreakerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Breakers to delete
     */
    where?: BreakerWhereInput
    /**
     * Limit how many Breakers to delete.
     */
    limit?: number
  }

  /**
   * Breaker.energyReadings
   */
  export type Breaker$energyReadingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    where?: EnergyReadingWhereInput
    orderBy?: EnergyReadingOrderByWithRelationInput | EnergyReadingOrderByWithRelationInput[]
    cursor?: EnergyReadingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnergyReadingScalarFieldEnum | EnergyReadingScalarFieldEnum[]
  }

  /**
   * Breaker without action
   */
  export type BreakerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Breaker
     */
    select?: BreakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Breaker
     */
    omit?: BreakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakerInclude<ExtArgs> | null
  }


  /**
   * Model EnergyReading
   */

  export type AggregateEnergyReading = {
    _count: EnergyReadingCountAggregateOutputType | null
    _avg: EnergyReadingAvgAggregateOutputType | null
    _sum: EnergyReadingSumAggregateOutputType | null
    _min: EnergyReadingMinAggregateOutputType | null
    _max: EnergyReadingMaxAggregateOutputType | null
  }

  export type EnergyReadingAvgAggregateOutputType = {
    periodStart: number | null
    periodEnd: number | null
    energyWh: number | null
    avgPowerW: number | null
    peakPowerW: number | null
  }

  export type EnergyReadingSumAggregateOutputType = {
    periodStart: number | null
    periodEnd: number | null
    energyWh: number | null
    avgPowerW: number | null
    peakPowerW: number | null
  }

  export type EnergyReadingMinAggregateOutputType = {
    id: string | null
    breakerId: string | null
    periodStart: number | null
    periodEnd: number | null
    energyWh: number | null
    avgPowerW: number | null
    peakPowerW: number | null
    createdAt: Date | null
  }

  export type EnergyReadingMaxAggregateOutputType = {
    id: string | null
    breakerId: string | null
    periodStart: number | null
    periodEnd: number | null
    energyWh: number | null
    avgPowerW: number | null
    peakPowerW: number | null
    createdAt: Date | null
  }

  export type EnergyReadingCountAggregateOutputType = {
    id: number
    breakerId: number
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt: number
    _all: number
  }


  export type EnergyReadingAvgAggregateInputType = {
    periodStart?: true
    periodEnd?: true
    energyWh?: true
    avgPowerW?: true
    peakPowerW?: true
  }

  export type EnergyReadingSumAggregateInputType = {
    periodStart?: true
    periodEnd?: true
    energyWh?: true
    avgPowerW?: true
    peakPowerW?: true
  }

  export type EnergyReadingMinAggregateInputType = {
    id?: true
    breakerId?: true
    periodStart?: true
    periodEnd?: true
    energyWh?: true
    avgPowerW?: true
    peakPowerW?: true
    createdAt?: true
  }

  export type EnergyReadingMaxAggregateInputType = {
    id?: true
    breakerId?: true
    periodStart?: true
    periodEnd?: true
    energyWh?: true
    avgPowerW?: true
    peakPowerW?: true
    createdAt?: true
  }

  export type EnergyReadingCountAggregateInputType = {
    id?: true
    breakerId?: true
    periodStart?: true
    periodEnd?: true
    energyWh?: true
    avgPowerW?: true
    peakPowerW?: true
    createdAt?: true
    _all?: true
  }

  export type EnergyReadingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnergyReading to aggregate.
     */
    where?: EnergyReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyReadings to fetch.
     */
    orderBy?: EnergyReadingOrderByWithRelationInput | EnergyReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnergyReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EnergyReadings
    **/
    _count?: true | EnergyReadingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnergyReadingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnergyReadingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnergyReadingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnergyReadingMaxAggregateInputType
  }

  export type GetEnergyReadingAggregateType<T extends EnergyReadingAggregateArgs> = {
        [P in keyof T & keyof AggregateEnergyReading]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnergyReading[P]>
      : GetScalarType<T[P], AggregateEnergyReading[P]>
  }




  export type EnergyReadingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnergyReadingWhereInput
    orderBy?: EnergyReadingOrderByWithAggregationInput | EnergyReadingOrderByWithAggregationInput[]
    by: EnergyReadingScalarFieldEnum[] | EnergyReadingScalarFieldEnum
    having?: EnergyReadingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnergyReadingCountAggregateInputType | true
    _avg?: EnergyReadingAvgAggregateInputType
    _sum?: EnergyReadingSumAggregateInputType
    _min?: EnergyReadingMinAggregateInputType
    _max?: EnergyReadingMaxAggregateInputType
  }

  export type EnergyReadingGroupByOutputType = {
    id: string
    breakerId: string
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt: Date
    _count: EnergyReadingCountAggregateOutputType | null
    _avg: EnergyReadingAvgAggregateOutputType | null
    _sum: EnergyReadingSumAggregateOutputType | null
    _min: EnergyReadingMinAggregateOutputType | null
    _max: EnergyReadingMaxAggregateOutputType | null
  }

  type GetEnergyReadingGroupByPayload<T extends EnergyReadingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnergyReadingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnergyReadingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnergyReadingGroupByOutputType[P]>
            : GetScalarType<T[P], EnergyReadingGroupByOutputType[P]>
        }
      >
    >


  export type EnergyReadingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    breakerId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    energyWh?: boolean
    avgPowerW?: boolean
    peakPowerW?: boolean
    createdAt?: boolean
    breaker?: boolean | BreakerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["energyReading"]>

  export type EnergyReadingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    breakerId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    energyWh?: boolean
    avgPowerW?: boolean
    peakPowerW?: boolean
    createdAt?: boolean
    breaker?: boolean | BreakerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["energyReading"]>

  export type EnergyReadingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    breakerId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    energyWh?: boolean
    avgPowerW?: boolean
    peakPowerW?: boolean
    createdAt?: boolean
    breaker?: boolean | BreakerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["energyReading"]>

  export type EnergyReadingSelectScalar = {
    id?: boolean
    breakerId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    energyWh?: boolean
    avgPowerW?: boolean
    peakPowerW?: boolean
    createdAt?: boolean
  }

  export type EnergyReadingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "breakerId" | "periodStart" | "periodEnd" | "energyWh" | "avgPowerW" | "peakPowerW" | "createdAt", ExtArgs["result"]["energyReading"]>
  export type EnergyReadingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breaker?: boolean | BreakerDefaultArgs<ExtArgs>
  }
  export type EnergyReadingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breaker?: boolean | BreakerDefaultArgs<ExtArgs>
  }
  export type EnergyReadingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breaker?: boolean | BreakerDefaultArgs<ExtArgs>
  }

  export type $EnergyReadingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EnergyReading"
    objects: {
      breaker: Prisma.$BreakerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      breakerId: string
      periodStart: number
      periodEnd: number
      energyWh: number
      avgPowerW: number
      peakPowerW: number
      createdAt: Date
    }, ExtArgs["result"]["energyReading"]>
    composites: {}
  }

  type EnergyReadingGetPayload<S extends boolean | null | undefined | EnergyReadingDefaultArgs> = $Result.GetResult<Prisma.$EnergyReadingPayload, S>

  type EnergyReadingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnergyReadingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnergyReadingCountAggregateInputType | true
    }

  export interface EnergyReadingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EnergyReading'], meta: { name: 'EnergyReading' } }
    /**
     * Find zero or one EnergyReading that matches the filter.
     * @param {EnergyReadingFindUniqueArgs} args - Arguments to find a EnergyReading
     * @example
     * // Get one EnergyReading
     * const energyReading = await prisma.energyReading.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnergyReadingFindUniqueArgs>(args: SelectSubset<T, EnergyReadingFindUniqueArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EnergyReading that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnergyReadingFindUniqueOrThrowArgs} args - Arguments to find a EnergyReading
     * @example
     * // Get one EnergyReading
     * const energyReading = await prisma.energyReading.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnergyReadingFindUniqueOrThrowArgs>(args: SelectSubset<T, EnergyReadingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnergyReading that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyReadingFindFirstArgs} args - Arguments to find a EnergyReading
     * @example
     * // Get one EnergyReading
     * const energyReading = await prisma.energyReading.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnergyReadingFindFirstArgs>(args?: SelectSubset<T, EnergyReadingFindFirstArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnergyReading that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyReadingFindFirstOrThrowArgs} args - Arguments to find a EnergyReading
     * @example
     * // Get one EnergyReading
     * const energyReading = await prisma.energyReading.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnergyReadingFindFirstOrThrowArgs>(args?: SelectSubset<T, EnergyReadingFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EnergyReadings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyReadingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EnergyReadings
     * const energyReadings = await prisma.energyReading.findMany()
     * 
     * // Get first 10 EnergyReadings
     * const energyReadings = await prisma.energyReading.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const energyReadingWithIdOnly = await prisma.energyReading.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnergyReadingFindManyArgs>(args?: SelectSubset<T, EnergyReadingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EnergyReading.
     * @param {EnergyReadingCreateArgs} args - Arguments to create a EnergyReading.
     * @example
     * // Create one EnergyReading
     * const EnergyReading = await prisma.energyReading.create({
     *   data: {
     *     // ... data to create a EnergyReading
     *   }
     * })
     * 
     */
    create<T extends EnergyReadingCreateArgs>(args: SelectSubset<T, EnergyReadingCreateArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EnergyReadings.
     * @param {EnergyReadingCreateManyArgs} args - Arguments to create many EnergyReadings.
     * @example
     * // Create many EnergyReadings
     * const energyReading = await prisma.energyReading.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnergyReadingCreateManyArgs>(args?: SelectSubset<T, EnergyReadingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EnergyReadings and returns the data saved in the database.
     * @param {EnergyReadingCreateManyAndReturnArgs} args - Arguments to create many EnergyReadings.
     * @example
     * // Create many EnergyReadings
     * const energyReading = await prisma.energyReading.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EnergyReadings and only return the `id`
     * const energyReadingWithIdOnly = await prisma.energyReading.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnergyReadingCreateManyAndReturnArgs>(args?: SelectSubset<T, EnergyReadingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EnergyReading.
     * @param {EnergyReadingDeleteArgs} args - Arguments to delete one EnergyReading.
     * @example
     * // Delete one EnergyReading
     * const EnergyReading = await prisma.energyReading.delete({
     *   where: {
     *     // ... filter to delete one EnergyReading
     *   }
     * })
     * 
     */
    delete<T extends EnergyReadingDeleteArgs>(args: SelectSubset<T, EnergyReadingDeleteArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EnergyReading.
     * @param {EnergyReadingUpdateArgs} args - Arguments to update one EnergyReading.
     * @example
     * // Update one EnergyReading
     * const energyReading = await prisma.energyReading.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnergyReadingUpdateArgs>(args: SelectSubset<T, EnergyReadingUpdateArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EnergyReadings.
     * @param {EnergyReadingDeleteManyArgs} args - Arguments to filter EnergyReadings to delete.
     * @example
     * // Delete a few EnergyReadings
     * const { count } = await prisma.energyReading.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnergyReadingDeleteManyArgs>(args?: SelectSubset<T, EnergyReadingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnergyReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyReadingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EnergyReadings
     * const energyReading = await prisma.energyReading.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnergyReadingUpdateManyArgs>(args: SelectSubset<T, EnergyReadingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnergyReadings and returns the data updated in the database.
     * @param {EnergyReadingUpdateManyAndReturnArgs} args - Arguments to update many EnergyReadings.
     * @example
     * // Update many EnergyReadings
     * const energyReading = await prisma.energyReading.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EnergyReadings and only return the `id`
     * const energyReadingWithIdOnly = await prisma.energyReading.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnergyReadingUpdateManyAndReturnArgs>(args: SelectSubset<T, EnergyReadingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EnergyReading.
     * @param {EnergyReadingUpsertArgs} args - Arguments to update or create a EnergyReading.
     * @example
     * // Update or create a EnergyReading
     * const energyReading = await prisma.energyReading.upsert({
     *   create: {
     *     // ... data to create a EnergyReading
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EnergyReading we want to update
     *   }
     * })
     */
    upsert<T extends EnergyReadingUpsertArgs>(args: SelectSubset<T, EnergyReadingUpsertArgs<ExtArgs>>): Prisma__EnergyReadingClient<$Result.GetResult<Prisma.$EnergyReadingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EnergyReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyReadingCountArgs} args - Arguments to filter EnergyReadings to count.
     * @example
     * // Count the number of EnergyReadings
     * const count = await prisma.energyReading.count({
     *   where: {
     *     // ... the filter for the EnergyReadings we want to count
     *   }
     * })
    **/
    count<T extends EnergyReadingCountArgs>(
      args?: Subset<T, EnergyReadingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnergyReadingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EnergyReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyReadingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnergyReadingAggregateArgs>(args: Subset<T, EnergyReadingAggregateArgs>): Prisma.PrismaPromise<GetEnergyReadingAggregateType<T>>

    /**
     * Group by EnergyReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyReadingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnergyReadingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnergyReadingGroupByArgs['orderBy'] }
        : { orderBy?: EnergyReadingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnergyReadingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnergyReadingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EnergyReading model
   */
  readonly fields: EnergyReadingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EnergyReading.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnergyReadingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    breaker<T extends BreakerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BreakerDefaultArgs<ExtArgs>>): Prisma__BreakerClient<$Result.GetResult<Prisma.$BreakerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EnergyReading model
   */
  interface EnergyReadingFieldRefs {
    readonly id: FieldRef<"EnergyReading", 'String'>
    readonly breakerId: FieldRef<"EnergyReading", 'String'>
    readonly periodStart: FieldRef<"EnergyReading", 'Int'>
    readonly periodEnd: FieldRef<"EnergyReading", 'Int'>
    readonly energyWh: FieldRef<"EnergyReading", 'Float'>
    readonly avgPowerW: FieldRef<"EnergyReading", 'Float'>
    readonly peakPowerW: FieldRef<"EnergyReading", 'Float'>
    readonly createdAt: FieldRef<"EnergyReading", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EnergyReading findUnique
   */
  export type EnergyReadingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * Filter, which EnergyReading to fetch.
     */
    where: EnergyReadingWhereUniqueInput
  }

  /**
   * EnergyReading findUniqueOrThrow
   */
  export type EnergyReadingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * Filter, which EnergyReading to fetch.
     */
    where: EnergyReadingWhereUniqueInput
  }

  /**
   * EnergyReading findFirst
   */
  export type EnergyReadingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * Filter, which EnergyReading to fetch.
     */
    where?: EnergyReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyReadings to fetch.
     */
    orderBy?: EnergyReadingOrderByWithRelationInput | EnergyReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnergyReadings.
     */
    cursor?: EnergyReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnergyReadings.
     */
    distinct?: EnergyReadingScalarFieldEnum | EnergyReadingScalarFieldEnum[]
  }

  /**
   * EnergyReading findFirstOrThrow
   */
  export type EnergyReadingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * Filter, which EnergyReading to fetch.
     */
    where?: EnergyReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyReadings to fetch.
     */
    orderBy?: EnergyReadingOrderByWithRelationInput | EnergyReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnergyReadings.
     */
    cursor?: EnergyReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnergyReadings.
     */
    distinct?: EnergyReadingScalarFieldEnum | EnergyReadingScalarFieldEnum[]
  }

  /**
   * EnergyReading findMany
   */
  export type EnergyReadingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * Filter, which EnergyReadings to fetch.
     */
    where?: EnergyReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyReadings to fetch.
     */
    orderBy?: EnergyReadingOrderByWithRelationInput | EnergyReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EnergyReadings.
     */
    cursor?: EnergyReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnergyReadings.
     */
    distinct?: EnergyReadingScalarFieldEnum | EnergyReadingScalarFieldEnum[]
  }

  /**
   * EnergyReading create
   */
  export type EnergyReadingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * The data needed to create a EnergyReading.
     */
    data: XOR<EnergyReadingCreateInput, EnergyReadingUncheckedCreateInput>
  }

  /**
   * EnergyReading createMany
   */
  export type EnergyReadingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EnergyReadings.
     */
    data: EnergyReadingCreateManyInput | EnergyReadingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EnergyReading createManyAndReturn
   */
  export type EnergyReadingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * The data used to create many EnergyReadings.
     */
    data: EnergyReadingCreateManyInput | EnergyReadingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnergyReading update
   */
  export type EnergyReadingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * The data needed to update a EnergyReading.
     */
    data: XOR<EnergyReadingUpdateInput, EnergyReadingUncheckedUpdateInput>
    /**
     * Choose, which EnergyReading to update.
     */
    where: EnergyReadingWhereUniqueInput
  }

  /**
   * EnergyReading updateMany
   */
  export type EnergyReadingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EnergyReadings.
     */
    data: XOR<EnergyReadingUpdateManyMutationInput, EnergyReadingUncheckedUpdateManyInput>
    /**
     * Filter which EnergyReadings to update
     */
    where?: EnergyReadingWhereInput
    /**
     * Limit how many EnergyReadings to update.
     */
    limit?: number
  }

  /**
   * EnergyReading updateManyAndReturn
   */
  export type EnergyReadingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * The data used to update EnergyReadings.
     */
    data: XOR<EnergyReadingUpdateManyMutationInput, EnergyReadingUncheckedUpdateManyInput>
    /**
     * Filter which EnergyReadings to update
     */
    where?: EnergyReadingWhereInput
    /**
     * Limit how many EnergyReadings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnergyReading upsert
   */
  export type EnergyReadingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * The filter to search for the EnergyReading to update in case it exists.
     */
    where: EnergyReadingWhereUniqueInput
    /**
     * In case the EnergyReading found by the `where` argument doesn't exist, create a new EnergyReading with this data.
     */
    create: XOR<EnergyReadingCreateInput, EnergyReadingUncheckedCreateInput>
    /**
     * In case the EnergyReading was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnergyReadingUpdateInput, EnergyReadingUncheckedUpdateInput>
  }

  /**
   * EnergyReading delete
   */
  export type EnergyReadingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
    /**
     * Filter which EnergyReading to delete.
     */
    where: EnergyReadingWhereUniqueInput
  }

  /**
   * EnergyReading deleteMany
   */
  export type EnergyReadingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnergyReadings to delete
     */
    where?: EnergyReadingWhereInput
    /**
     * Limit how many EnergyReadings to delete.
     */
    limit?: number
  }

  /**
   * EnergyReading without action
   */
  export type EnergyReadingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyReading
     */
    select?: EnergyReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnergyReading
     */
    omit?: EnergyReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyReadingInclude<ExtArgs> | null
  }


  /**
   * Model Alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertMinAggregateOutputType = {
    id: string | null
    severity: string | null
    message: string | null
    acknowledged: boolean | null
    createdAt: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: string | null
    severity: string | null
    message: string | null
    acknowledged: boolean | null
    createdAt: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    severity: number
    message: number
    acknowledged: number
    createdAt: number
    _all: number
  }


  export type AlertMinAggregateInputType = {
    id?: true
    severity?: true
    message?: true
    acknowledged?: true
    createdAt?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    severity?: true
    message?: true
    acknowledged?: true
    createdAt?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    severity?: true
    message?: true
    acknowledged?: true
    createdAt?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithAggregationInput | AlertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: string
    severity: string
    message: string
    acknowledged: boolean
    createdAt: Date
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    severity?: boolean
    message?: boolean
    acknowledged?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    severity?: boolean
    message?: boolean
    acknowledged?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    severity?: boolean
    message?: boolean
    acknowledged?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectScalar = {
    id?: boolean
    severity?: boolean
    message?: boolean
    acknowledged?: boolean
    createdAt?: boolean
  }

  export type AlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "severity" | "message" | "acknowledged" | "createdAt", ExtArgs["result"]["alert"]>

  export type $AlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      severity: string
      message: string
      acknowledged: boolean
      createdAt: Date
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type AlertGetPayload<S extends boolean | null | undefined | AlertDefaultArgs> = $Result.GetResult<Prisma.$AlertPayload, S>

  type AlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alert'], meta: { name: 'Alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertFindUniqueArgs>(args: SelectSubset<T, AlertFindUniqueArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertFindFirstArgs>(args?: SelectSubset<T, AlertFindFirstArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertFindManyArgs>(args?: SelectSubset<T, AlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends AlertCreateArgs>(args: SelectSubset<T, AlertCreateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alerts.
     * @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertCreateManyArgs>(args?: SelectSubset<T, AlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alerts and returns the data saved in the database.
     * @param {AlertCreateManyAndReturnArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends AlertDeleteArgs>(args: SelectSubset<T, AlertDeleteArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertUpdateArgs>(args: SelectSubset<T, AlertUpdateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertDeleteManyArgs>(args?: SelectSubset<T, AlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertUpdateManyArgs>(args: SelectSubset<T, AlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts and returns the data updated in the database.
     * @param {AlertUpdateManyAndReturnArgs} args - Arguments to update many Alerts.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlertUpdateManyAndReturnArgs>(args: SelectSubset<T, AlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends AlertUpsertArgs>(args: SelectSubset<T, AlertUpsertArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alert model
   */
  readonly fields: AlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alert model
   */
  interface AlertFieldRefs {
    readonly id: FieldRef<"Alert", 'String'>
    readonly severity: FieldRef<"Alert", 'String'>
    readonly message: FieldRef<"Alert", 'String'>
    readonly acknowledged: FieldRef<"Alert", 'Boolean'>
    readonly createdAt: FieldRef<"Alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alert findUnique
   */
  export type AlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findFirst
   */
  export type AlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findMany
   */
  export type AlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert create
   */
  export type AlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }

  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert createManyAndReturn
   */
  export type AlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert update
   */
  export type AlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to update.
     */
    limit?: number
  }

  /**
   * Alert updateManyAndReturn
   */
  export type AlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to update.
     */
    limit?: number
  }

  /**
   * Alert upsert
   */
  export type AlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }

  /**
   * Alert delete
   */
  export type AlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to delete.
     */
    limit?: number
  }

  /**
   * Alert without action
   */
  export type AlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
  }


  /**
   * Model AutomationRule
   */

  export type AggregateAutomationRule = {
    _count: AutomationRuleCountAggregateOutputType | null
    _min: AutomationRuleMinAggregateOutputType | null
    _max: AutomationRuleMaxAggregateOutputType | null
  }

  export type AutomationRuleMinAggregateOutputType = {
    id: string | null
    condition: string | null
    action: string | null
    enabled: boolean | null
  }

  export type AutomationRuleMaxAggregateOutputType = {
    id: string | null
    condition: string | null
    action: string | null
    enabled: boolean | null
  }

  export type AutomationRuleCountAggregateOutputType = {
    id: number
    condition: number
    action: number
    enabled: number
    _all: number
  }


  export type AutomationRuleMinAggregateInputType = {
    id?: true
    condition?: true
    action?: true
    enabled?: true
  }

  export type AutomationRuleMaxAggregateInputType = {
    id?: true
    condition?: true
    action?: true
    enabled?: true
  }

  export type AutomationRuleCountAggregateInputType = {
    id?: true
    condition?: true
    action?: true
    enabled?: true
    _all?: true
  }

  export type AutomationRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AutomationRule to aggregate.
     */
    where?: AutomationRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationRules to fetch.
     */
    orderBy?: AutomationRuleOrderByWithRelationInput | AutomationRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AutomationRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AutomationRules
    **/
    _count?: true | AutomationRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AutomationRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AutomationRuleMaxAggregateInputType
  }

  export type GetAutomationRuleAggregateType<T extends AutomationRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateAutomationRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAutomationRule[P]>
      : GetScalarType<T[P], AggregateAutomationRule[P]>
  }




  export type AutomationRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AutomationRuleWhereInput
    orderBy?: AutomationRuleOrderByWithAggregationInput | AutomationRuleOrderByWithAggregationInput[]
    by: AutomationRuleScalarFieldEnum[] | AutomationRuleScalarFieldEnum
    having?: AutomationRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AutomationRuleCountAggregateInputType | true
    _min?: AutomationRuleMinAggregateInputType
    _max?: AutomationRuleMaxAggregateInputType
  }

  export type AutomationRuleGroupByOutputType = {
    id: string
    condition: string
    action: string
    enabled: boolean
    _count: AutomationRuleCountAggregateOutputType | null
    _min: AutomationRuleMinAggregateOutputType | null
    _max: AutomationRuleMaxAggregateOutputType | null
  }

  type GetAutomationRuleGroupByPayload<T extends AutomationRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AutomationRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AutomationRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AutomationRuleGroupByOutputType[P]>
            : GetScalarType<T[P], AutomationRuleGroupByOutputType[P]>
        }
      >
    >


  export type AutomationRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    condition?: boolean
    action?: boolean
    enabled?: boolean
  }, ExtArgs["result"]["automationRule"]>

  export type AutomationRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    condition?: boolean
    action?: boolean
    enabled?: boolean
  }, ExtArgs["result"]["automationRule"]>

  export type AutomationRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    condition?: boolean
    action?: boolean
    enabled?: boolean
  }, ExtArgs["result"]["automationRule"]>

  export type AutomationRuleSelectScalar = {
    id?: boolean
    condition?: boolean
    action?: boolean
    enabled?: boolean
  }

  export type AutomationRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "condition" | "action" | "enabled", ExtArgs["result"]["automationRule"]>

  export type $AutomationRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AutomationRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      condition: string
      action: string
      enabled: boolean
    }, ExtArgs["result"]["automationRule"]>
    composites: {}
  }

  type AutomationRuleGetPayload<S extends boolean | null | undefined | AutomationRuleDefaultArgs> = $Result.GetResult<Prisma.$AutomationRulePayload, S>

  type AutomationRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AutomationRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AutomationRuleCountAggregateInputType | true
    }

  export interface AutomationRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AutomationRule'], meta: { name: 'AutomationRule' } }
    /**
     * Find zero or one AutomationRule that matches the filter.
     * @param {AutomationRuleFindUniqueArgs} args - Arguments to find a AutomationRule
     * @example
     * // Get one AutomationRule
     * const automationRule = await prisma.automationRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AutomationRuleFindUniqueArgs>(args: SelectSubset<T, AutomationRuleFindUniqueArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AutomationRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AutomationRuleFindUniqueOrThrowArgs} args - Arguments to find a AutomationRule
     * @example
     * // Get one AutomationRule
     * const automationRule = await prisma.automationRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AutomationRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, AutomationRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AutomationRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationRuleFindFirstArgs} args - Arguments to find a AutomationRule
     * @example
     * // Get one AutomationRule
     * const automationRule = await prisma.automationRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AutomationRuleFindFirstArgs>(args?: SelectSubset<T, AutomationRuleFindFirstArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AutomationRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationRuleFindFirstOrThrowArgs} args - Arguments to find a AutomationRule
     * @example
     * // Get one AutomationRule
     * const automationRule = await prisma.automationRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AutomationRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, AutomationRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AutomationRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AutomationRules
     * const automationRules = await prisma.automationRule.findMany()
     * 
     * // Get first 10 AutomationRules
     * const automationRules = await prisma.automationRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const automationRuleWithIdOnly = await prisma.automationRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AutomationRuleFindManyArgs>(args?: SelectSubset<T, AutomationRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AutomationRule.
     * @param {AutomationRuleCreateArgs} args - Arguments to create a AutomationRule.
     * @example
     * // Create one AutomationRule
     * const AutomationRule = await prisma.automationRule.create({
     *   data: {
     *     // ... data to create a AutomationRule
     *   }
     * })
     * 
     */
    create<T extends AutomationRuleCreateArgs>(args: SelectSubset<T, AutomationRuleCreateArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AutomationRules.
     * @param {AutomationRuleCreateManyArgs} args - Arguments to create many AutomationRules.
     * @example
     * // Create many AutomationRules
     * const automationRule = await prisma.automationRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AutomationRuleCreateManyArgs>(args?: SelectSubset<T, AutomationRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AutomationRules and returns the data saved in the database.
     * @param {AutomationRuleCreateManyAndReturnArgs} args - Arguments to create many AutomationRules.
     * @example
     * // Create many AutomationRules
     * const automationRule = await prisma.automationRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AutomationRules and only return the `id`
     * const automationRuleWithIdOnly = await prisma.automationRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AutomationRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, AutomationRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AutomationRule.
     * @param {AutomationRuleDeleteArgs} args - Arguments to delete one AutomationRule.
     * @example
     * // Delete one AutomationRule
     * const AutomationRule = await prisma.automationRule.delete({
     *   where: {
     *     // ... filter to delete one AutomationRule
     *   }
     * })
     * 
     */
    delete<T extends AutomationRuleDeleteArgs>(args: SelectSubset<T, AutomationRuleDeleteArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AutomationRule.
     * @param {AutomationRuleUpdateArgs} args - Arguments to update one AutomationRule.
     * @example
     * // Update one AutomationRule
     * const automationRule = await prisma.automationRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AutomationRuleUpdateArgs>(args: SelectSubset<T, AutomationRuleUpdateArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AutomationRules.
     * @param {AutomationRuleDeleteManyArgs} args - Arguments to filter AutomationRules to delete.
     * @example
     * // Delete a few AutomationRules
     * const { count } = await prisma.automationRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AutomationRuleDeleteManyArgs>(args?: SelectSubset<T, AutomationRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AutomationRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AutomationRules
     * const automationRule = await prisma.automationRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AutomationRuleUpdateManyArgs>(args: SelectSubset<T, AutomationRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AutomationRules and returns the data updated in the database.
     * @param {AutomationRuleUpdateManyAndReturnArgs} args - Arguments to update many AutomationRules.
     * @example
     * // Update many AutomationRules
     * const automationRule = await prisma.automationRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AutomationRules and only return the `id`
     * const automationRuleWithIdOnly = await prisma.automationRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AutomationRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, AutomationRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AutomationRule.
     * @param {AutomationRuleUpsertArgs} args - Arguments to update or create a AutomationRule.
     * @example
     * // Update or create a AutomationRule
     * const automationRule = await prisma.automationRule.upsert({
     *   create: {
     *     // ... data to create a AutomationRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AutomationRule we want to update
     *   }
     * })
     */
    upsert<T extends AutomationRuleUpsertArgs>(args: SelectSubset<T, AutomationRuleUpsertArgs<ExtArgs>>): Prisma__AutomationRuleClient<$Result.GetResult<Prisma.$AutomationRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AutomationRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationRuleCountArgs} args - Arguments to filter AutomationRules to count.
     * @example
     * // Count the number of AutomationRules
     * const count = await prisma.automationRule.count({
     *   where: {
     *     // ... the filter for the AutomationRules we want to count
     *   }
     * })
    **/
    count<T extends AutomationRuleCountArgs>(
      args?: Subset<T, AutomationRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AutomationRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AutomationRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AutomationRuleAggregateArgs>(args: Subset<T, AutomationRuleAggregateArgs>): Prisma.PrismaPromise<GetAutomationRuleAggregateType<T>>

    /**
     * Group by AutomationRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AutomationRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AutomationRuleGroupByArgs['orderBy'] }
        : { orderBy?: AutomationRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AutomationRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAutomationRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AutomationRule model
   */
  readonly fields: AutomationRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AutomationRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AutomationRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AutomationRule model
   */
  interface AutomationRuleFieldRefs {
    readonly id: FieldRef<"AutomationRule", 'String'>
    readonly condition: FieldRef<"AutomationRule", 'String'>
    readonly action: FieldRef<"AutomationRule", 'String'>
    readonly enabled: FieldRef<"AutomationRule", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AutomationRule findUnique
   */
  export type AutomationRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * Filter, which AutomationRule to fetch.
     */
    where: AutomationRuleWhereUniqueInput
  }

  /**
   * AutomationRule findUniqueOrThrow
   */
  export type AutomationRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * Filter, which AutomationRule to fetch.
     */
    where: AutomationRuleWhereUniqueInput
  }

  /**
   * AutomationRule findFirst
   */
  export type AutomationRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * Filter, which AutomationRule to fetch.
     */
    where?: AutomationRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationRules to fetch.
     */
    orderBy?: AutomationRuleOrderByWithRelationInput | AutomationRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AutomationRules.
     */
    cursor?: AutomationRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationRules.
     */
    distinct?: AutomationRuleScalarFieldEnum | AutomationRuleScalarFieldEnum[]
  }

  /**
   * AutomationRule findFirstOrThrow
   */
  export type AutomationRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * Filter, which AutomationRule to fetch.
     */
    where?: AutomationRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationRules to fetch.
     */
    orderBy?: AutomationRuleOrderByWithRelationInput | AutomationRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AutomationRules.
     */
    cursor?: AutomationRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationRules.
     */
    distinct?: AutomationRuleScalarFieldEnum | AutomationRuleScalarFieldEnum[]
  }

  /**
   * AutomationRule findMany
   */
  export type AutomationRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * Filter, which AutomationRules to fetch.
     */
    where?: AutomationRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationRules to fetch.
     */
    orderBy?: AutomationRuleOrderByWithRelationInput | AutomationRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AutomationRules.
     */
    cursor?: AutomationRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationRules.
     */
    distinct?: AutomationRuleScalarFieldEnum | AutomationRuleScalarFieldEnum[]
  }

  /**
   * AutomationRule create
   */
  export type AutomationRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * The data needed to create a AutomationRule.
     */
    data: XOR<AutomationRuleCreateInput, AutomationRuleUncheckedCreateInput>
  }

  /**
   * AutomationRule createMany
   */
  export type AutomationRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AutomationRules.
     */
    data: AutomationRuleCreateManyInput | AutomationRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AutomationRule createManyAndReturn
   */
  export type AutomationRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * The data used to create many AutomationRules.
     */
    data: AutomationRuleCreateManyInput | AutomationRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AutomationRule update
   */
  export type AutomationRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * The data needed to update a AutomationRule.
     */
    data: XOR<AutomationRuleUpdateInput, AutomationRuleUncheckedUpdateInput>
    /**
     * Choose, which AutomationRule to update.
     */
    where: AutomationRuleWhereUniqueInput
  }

  /**
   * AutomationRule updateMany
   */
  export type AutomationRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AutomationRules.
     */
    data: XOR<AutomationRuleUpdateManyMutationInput, AutomationRuleUncheckedUpdateManyInput>
    /**
     * Filter which AutomationRules to update
     */
    where?: AutomationRuleWhereInput
    /**
     * Limit how many AutomationRules to update.
     */
    limit?: number
  }

  /**
   * AutomationRule updateManyAndReturn
   */
  export type AutomationRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * The data used to update AutomationRules.
     */
    data: XOR<AutomationRuleUpdateManyMutationInput, AutomationRuleUncheckedUpdateManyInput>
    /**
     * Filter which AutomationRules to update
     */
    where?: AutomationRuleWhereInput
    /**
     * Limit how many AutomationRules to update.
     */
    limit?: number
  }

  /**
   * AutomationRule upsert
   */
  export type AutomationRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * The filter to search for the AutomationRule to update in case it exists.
     */
    where: AutomationRuleWhereUniqueInput
    /**
     * In case the AutomationRule found by the `where` argument doesn't exist, create a new AutomationRule with this data.
     */
    create: XOR<AutomationRuleCreateInput, AutomationRuleUncheckedCreateInput>
    /**
     * In case the AutomationRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AutomationRuleUpdateInput, AutomationRuleUncheckedUpdateInput>
  }

  /**
   * AutomationRule delete
   */
  export type AutomationRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
    /**
     * Filter which AutomationRule to delete.
     */
    where: AutomationRuleWhereUniqueInput
  }

  /**
   * AutomationRule deleteMany
   */
  export type AutomationRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AutomationRules to delete
     */
    where?: AutomationRuleWhereInput
    /**
     * Limit how many AutomationRules to delete.
     */
    limit?: number
  }

  /**
   * AutomationRule without action
   */
  export type AutomationRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationRule
     */
    select?: AutomationRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationRule
     */
    omit?: AutomationRuleOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BuildingScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address'
  };

  export type BuildingScalarFieldEnum = (typeof BuildingScalarFieldEnum)[keyof typeof BuildingScalarFieldEnum]


  export const PanelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    buildingId: 'buildingId'
  };

  export type PanelScalarFieldEnum = (typeof PanelScalarFieldEnum)[keyof typeof PanelScalarFieldEnum]


  export const DeviceScalarFieldEnum: {
    id: 'id',
    macAddress: 'macAddress',
    type: 'type',
    firmwareVersion: 'firmwareVersion',
    onlineStatus: 'onlineStatus',
    lastSeen: 'lastSeen',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const BreakerScalarFieldEnum: {
    id: 'id',
    label: 'label',
    phase: 'phase',
    panelId: 'panelId',
    deviceId: 'deviceId'
  };

  export type BreakerScalarFieldEnum = (typeof BreakerScalarFieldEnum)[keyof typeof BreakerScalarFieldEnum]


  export const EnergyReadingScalarFieldEnum: {
    id: 'id',
    breakerId: 'breakerId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    energyWh: 'energyWh',
    avgPowerW: 'avgPowerW',
    peakPowerW: 'peakPowerW',
    createdAt: 'createdAt'
  };

  export type EnergyReadingScalarFieldEnum = (typeof EnergyReadingScalarFieldEnum)[keyof typeof EnergyReadingScalarFieldEnum]


  export const AlertScalarFieldEnum: {
    id: 'id',
    severity: 'severity',
    message: 'message',
    acknowledged: 'acknowledged',
    createdAt: 'createdAt'
  };

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const AutomationRuleScalarFieldEnum: {
    id: 'id',
    condition: 'condition',
    action: 'action',
    enabled: 'enabled'
  };

  export type AutomationRuleScalarFieldEnum = (typeof AutomationRuleScalarFieldEnum)[keyof typeof AutomationRuleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    devices?: DeviceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    devices?: DeviceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    devices?: DeviceListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BuildingWhereInput = {
    AND?: BuildingWhereInput | BuildingWhereInput[]
    OR?: BuildingWhereInput[]
    NOT?: BuildingWhereInput | BuildingWhereInput[]
    id?: StringFilter<"Building"> | string
    name?: StringFilter<"Building"> | string
    address?: StringNullableFilter<"Building"> | string | null
    panels?: PanelListRelationFilter
  }

  export type BuildingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    panels?: PanelOrderByRelationAggregateInput
  }

  export type BuildingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BuildingWhereInput | BuildingWhereInput[]
    OR?: BuildingWhereInput[]
    NOT?: BuildingWhereInput | BuildingWhereInput[]
    name?: StringFilter<"Building"> | string
    address?: StringNullableFilter<"Building"> | string | null
    panels?: PanelListRelationFilter
  }, "id">

  export type BuildingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    _count?: BuildingCountOrderByAggregateInput
    _max?: BuildingMaxOrderByAggregateInput
    _min?: BuildingMinOrderByAggregateInput
  }

  export type BuildingScalarWhereWithAggregatesInput = {
    AND?: BuildingScalarWhereWithAggregatesInput | BuildingScalarWhereWithAggregatesInput[]
    OR?: BuildingScalarWhereWithAggregatesInput[]
    NOT?: BuildingScalarWhereWithAggregatesInput | BuildingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Building"> | string
    name?: StringWithAggregatesFilter<"Building"> | string
    address?: StringNullableWithAggregatesFilter<"Building"> | string | null
  }

  export type PanelWhereInput = {
    AND?: PanelWhereInput | PanelWhereInput[]
    OR?: PanelWhereInput[]
    NOT?: PanelWhereInput | PanelWhereInput[]
    id?: StringFilter<"Panel"> | string
    name?: StringFilter<"Panel"> | string
    buildingId?: StringFilter<"Panel"> | string
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
    breakers?: BreakerListRelationFilter
  }

  export type PanelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    buildingId?: SortOrder
    building?: BuildingOrderByWithRelationInput
    breakers?: BreakerOrderByRelationAggregateInput
  }

  export type PanelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PanelWhereInput | PanelWhereInput[]
    OR?: PanelWhereInput[]
    NOT?: PanelWhereInput | PanelWhereInput[]
    name?: StringFilter<"Panel"> | string
    buildingId?: StringFilter<"Panel"> | string
    building?: XOR<BuildingScalarRelationFilter, BuildingWhereInput>
    breakers?: BreakerListRelationFilter
  }, "id">

  export type PanelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    buildingId?: SortOrder
    _count?: PanelCountOrderByAggregateInput
    _max?: PanelMaxOrderByAggregateInput
    _min?: PanelMinOrderByAggregateInput
  }

  export type PanelScalarWhereWithAggregatesInput = {
    AND?: PanelScalarWhereWithAggregatesInput | PanelScalarWhereWithAggregatesInput[]
    OR?: PanelScalarWhereWithAggregatesInput[]
    NOT?: PanelScalarWhereWithAggregatesInput | PanelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Panel"> | string
    name?: StringWithAggregatesFilter<"Panel"> | string
    buildingId?: StringWithAggregatesFilter<"Panel"> | string
  }

  export type DeviceWhereInput = {
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    id?: StringFilter<"Device"> | string
    macAddress?: StringFilter<"Device"> | string
    type?: StringFilter<"Device"> | string
    firmwareVersion?: StringNullableFilter<"Device"> | string | null
    onlineStatus?: BoolFilter<"Device"> | boolean
    lastSeen?: DateTimeNullableFilter<"Device"> | Date | string | null
    userId?: StringNullableFilter<"Device"> | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    breakers?: BreakerListRelationFilter
  }

  export type DeviceOrderByWithRelationInput = {
    id?: SortOrder
    macAddress?: SortOrder
    type?: SortOrder
    firmwareVersion?: SortOrderInput | SortOrder
    onlineStatus?: SortOrder
    lastSeen?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    breakers?: BreakerOrderByRelationAggregateInput
  }

  export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    macAddress?: string
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    type?: StringFilter<"Device"> | string
    firmwareVersion?: StringNullableFilter<"Device"> | string | null
    onlineStatus?: BoolFilter<"Device"> | boolean
    lastSeen?: DateTimeNullableFilter<"Device"> | Date | string | null
    userId?: StringNullableFilter<"Device"> | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    breakers?: BreakerListRelationFilter
  }, "id" | "macAddress">

  export type DeviceOrderByWithAggregationInput = {
    id?: SortOrder
    macAddress?: SortOrder
    type?: SortOrder
    firmwareVersion?: SortOrderInput | SortOrder
    onlineStatus?: SortOrder
    lastSeen?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    OR?: DeviceScalarWhereWithAggregatesInput[]
    NOT?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Device"> | string
    macAddress?: StringWithAggregatesFilter<"Device"> | string
    type?: StringWithAggregatesFilter<"Device"> | string
    firmwareVersion?: StringNullableWithAggregatesFilter<"Device"> | string | null
    onlineStatus?: BoolWithAggregatesFilter<"Device"> | boolean
    lastSeen?: DateTimeNullableWithAggregatesFilter<"Device"> | Date | string | null
    userId?: StringNullableWithAggregatesFilter<"Device"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
  }

  export type BreakerWhereInput = {
    AND?: BreakerWhereInput | BreakerWhereInput[]
    OR?: BreakerWhereInput[]
    NOT?: BreakerWhereInput | BreakerWhereInput[]
    id?: StringFilter<"Breaker"> | string
    label?: StringFilter<"Breaker"> | string
    phase?: StringNullableFilter<"Breaker"> | string | null
    panelId?: StringFilter<"Breaker"> | string
    deviceId?: StringFilter<"Breaker"> | string
    panel?: XOR<PanelScalarRelationFilter, PanelWhereInput>
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
    energyReadings?: EnergyReadingListRelationFilter
  }

  export type BreakerOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    phase?: SortOrderInput | SortOrder
    panelId?: SortOrder
    deviceId?: SortOrder
    panel?: PanelOrderByWithRelationInput
    device?: DeviceOrderByWithRelationInput
    energyReadings?: EnergyReadingOrderByRelationAggregateInput
  }

  export type BreakerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BreakerWhereInput | BreakerWhereInput[]
    OR?: BreakerWhereInput[]
    NOT?: BreakerWhereInput | BreakerWhereInput[]
    label?: StringFilter<"Breaker"> | string
    phase?: StringNullableFilter<"Breaker"> | string | null
    panelId?: StringFilter<"Breaker"> | string
    deviceId?: StringFilter<"Breaker"> | string
    panel?: XOR<PanelScalarRelationFilter, PanelWhereInput>
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
    energyReadings?: EnergyReadingListRelationFilter
  }, "id">

  export type BreakerOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    phase?: SortOrderInput | SortOrder
    panelId?: SortOrder
    deviceId?: SortOrder
    _count?: BreakerCountOrderByAggregateInput
    _max?: BreakerMaxOrderByAggregateInput
    _min?: BreakerMinOrderByAggregateInput
  }

  export type BreakerScalarWhereWithAggregatesInput = {
    AND?: BreakerScalarWhereWithAggregatesInput | BreakerScalarWhereWithAggregatesInput[]
    OR?: BreakerScalarWhereWithAggregatesInput[]
    NOT?: BreakerScalarWhereWithAggregatesInput | BreakerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Breaker"> | string
    label?: StringWithAggregatesFilter<"Breaker"> | string
    phase?: StringNullableWithAggregatesFilter<"Breaker"> | string | null
    panelId?: StringWithAggregatesFilter<"Breaker"> | string
    deviceId?: StringWithAggregatesFilter<"Breaker"> | string
  }

  export type EnergyReadingWhereInput = {
    AND?: EnergyReadingWhereInput | EnergyReadingWhereInput[]
    OR?: EnergyReadingWhereInput[]
    NOT?: EnergyReadingWhereInput | EnergyReadingWhereInput[]
    id?: StringFilter<"EnergyReading"> | string
    breakerId?: StringFilter<"EnergyReading"> | string
    periodStart?: IntFilter<"EnergyReading"> | number
    periodEnd?: IntFilter<"EnergyReading"> | number
    energyWh?: FloatFilter<"EnergyReading"> | number
    avgPowerW?: FloatFilter<"EnergyReading"> | number
    peakPowerW?: FloatFilter<"EnergyReading"> | number
    createdAt?: DateTimeFilter<"EnergyReading"> | Date | string
    breaker?: XOR<BreakerScalarRelationFilter, BreakerWhereInput>
  }

  export type EnergyReadingOrderByWithRelationInput = {
    id?: SortOrder
    breakerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    energyWh?: SortOrder
    avgPowerW?: SortOrder
    peakPowerW?: SortOrder
    createdAt?: SortOrder
    breaker?: BreakerOrderByWithRelationInput
  }

  export type EnergyReadingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EnergyReadingWhereInput | EnergyReadingWhereInput[]
    OR?: EnergyReadingWhereInput[]
    NOT?: EnergyReadingWhereInput | EnergyReadingWhereInput[]
    breakerId?: StringFilter<"EnergyReading"> | string
    periodStart?: IntFilter<"EnergyReading"> | number
    periodEnd?: IntFilter<"EnergyReading"> | number
    energyWh?: FloatFilter<"EnergyReading"> | number
    avgPowerW?: FloatFilter<"EnergyReading"> | number
    peakPowerW?: FloatFilter<"EnergyReading"> | number
    createdAt?: DateTimeFilter<"EnergyReading"> | Date | string
    breaker?: XOR<BreakerScalarRelationFilter, BreakerWhereInput>
  }, "id">

  export type EnergyReadingOrderByWithAggregationInput = {
    id?: SortOrder
    breakerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    energyWh?: SortOrder
    avgPowerW?: SortOrder
    peakPowerW?: SortOrder
    createdAt?: SortOrder
    _count?: EnergyReadingCountOrderByAggregateInput
    _avg?: EnergyReadingAvgOrderByAggregateInput
    _max?: EnergyReadingMaxOrderByAggregateInput
    _min?: EnergyReadingMinOrderByAggregateInput
    _sum?: EnergyReadingSumOrderByAggregateInput
  }

  export type EnergyReadingScalarWhereWithAggregatesInput = {
    AND?: EnergyReadingScalarWhereWithAggregatesInput | EnergyReadingScalarWhereWithAggregatesInput[]
    OR?: EnergyReadingScalarWhereWithAggregatesInput[]
    NOT?: EnergyReadingScalarWhereWithAggregatesInput | EnergyReadingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EnergyReading"> | string
    breakerId?: StringWithAggregatesFilter<"EnergyReading"> | string
    periodStart?: IntWithAggregatesFilter<"EnergyReading"> | number
    periodEnd?: IntWithAggregatesFilter<"EnergyReading"> | number
    energyWh?: FloatWithAggregatesFilter<"EnergyReading"> | number
    avgPowerW?: FloatWithAggregatesFilter<"EnergyReading"> | number
    peakPowerW?: FloatWithAggregatesFilter<"EnergyReading"> | number
    createdAt?: DateTimeWithAggregatesFilter<"EnergyReading"> | Date | string
  }

  export type AlertWhereInput = {
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    id?: StringFilter<"Alert"> | string
    severity?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    acknowledged?: BoolFilter<"Alert"> | boolean
    createdAt?: DateTimeFilter<"Alert"> | Date | string
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    acknowledged?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    severity?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    acknowledged?: BoolFilter<"Alert"> | boolean
    createdAt?: DateTimeFilter<"Alert"> | Date | string
  }, "id">

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    acknowledged?: SortOrder
    createdAt?: SortOrder
    _count?: AlertCountOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    OR?: AlertScalarWhereWithAggregatesInput[]
    NOT?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Alert"> | string
    severity?: StringWithAggregatesFilter<"Alert"> | string
    message?: StringWithAggregatesFilter<"Alert"> | string
    acknowledged?: BoolWithAggregatesFilter<"Alert"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Alert"> | Date | string
  }

  export type AutomationRuleWhereInput = {
    AND?: AutomationRuleWhereInput | AutomationRuleWhereInput[]
    OR?: AutomationRuleWhereInput[]
    NOT?: AutomationRuleWhereInput | AutomationRuleWhereInput[]
    id?: StringFilter<"AutomationRule"> | string
    condition?: StringFilter<"AutomationRule"> | string
    action?: StringFilter<"AutomationRule"> | string
    enabled?: BoolFilter<"AutomationRule"> | boolean
  }

  export type AutomationRuleOrderByWithRelationInput = {
    id?: SortOrder
    condition?: SortOrder
    action?: SortOrder
    enabled?: SortOrder
  }

  export type AutomationRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AutomationRuleWhereInput | AutomationRuleWhereInput[]
    OR?: AutomationRuleWhereInput[]
    NOT?: AutomationRuleWhereInput | AutomationRuleWhereInput[]
    condition?: StringFilter<"AutomationRule"> | string
    action?: StringFilter<"AutomationRule"> | string
    enabled?: BoolFilter<"AutomationRule"> | boolean
  }, "id">

  export type AutomationRuleOrderByWithAggregationInput = {
    id?: SortOrder
    condition?: SortOrder
    action?: SortOrder
    enabled?: SortOrder
    _count?: AutomationRuleCountOrderByAggregateInput
    _max?: AutomationRuleMaxOrderByAggregateInput
    _min?: AutomationRuleMinOrderByAggregateInput
  }

  export type AutomationRuleScalarWhereWithAggregatesInput = {
    AND?: AutomationRuleScalarWhereWithAggregatesInput | AutomationRuleScalarWhereWithAggregatesInput[]
    OR?: AutomationRuleScalarWhereWithAggregatesInput[]
    NOT?: AutomationRuleScalarWhereWithAggregatesInput | AutomationRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AutomationRule"> | string
    condition?: StringWithAggregatesFilter<"AutomationRule"> | string
    action?: StringWithAggregatesFilter<"AutomationRule"> | string
    enabled?: BoolWithAggregatesFilter<"AutomationRule"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingCreateInput = {
    id?: string
    name: string
    address?: string | null
    panels?: PanelCreateNestedManyWithoutBuildingInput
  }

  export type BuildingUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    panels?: PanelUncheckedCreateNestedManyWithoutBuildingInput
  }

  export type BuildingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    panels?: PanelUpdateManyWithoutBuildingNestedInput
  }

  export type BuildingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    panels?: PanelUncheckedUpdateManyWithoutBuildingNestedInput
  }

  export type BuildingCreateManyInput = {
    id?: string
    name: string
    address?: string | null
  }

  export type BuildingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BuildingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PanelCreateInput = {
    id?: string
    name: string
    building: BuildingCreateNestedOneWithoutPanelsInput
    breakers?: BreakerCreateNestedManyWithoutPanelInput
  }

  export type PanelUncheckedCreateInput = {
    id?: string
    name: string
    buildingId: string
    breakers?: BreakerUncheckedCreateNestedManyWithoutPanelInput
  }

  export type PanelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    building?: BuildingUpdateOneRequiredWithoutPanelsNestedInput
    breakers?: BreakerUpdateManyWithoutPanelNestedInput
  }

  export type PanelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    breakers?: BreakerUncheckedUpdateManyWithoutPanelNestedInput
  }

  export type PanelCreateManyInput = {
    id?: string
    name: string
    buildingId: string
  }

  export type PanelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PanelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
  }

  export type DeviceCreateInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutDevicesInput
    breakers?: BreakerCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    userId?: string | null
    createdAt?: Date | string
    breakers?: BreakerUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDevicesNestedInput
    breakers?: BreakerUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breakers?: BreakerUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateManyInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    userId?: string | null
    createdAt?: Date | string
  }

  export type DeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakerCreateInput = {
    id?: string
    label: string
    phase?: string | null
    panel: PanelCreateNestedOneWithoutBreakersInput
    device: DeviceCreateNestedOneWithoutBreakersInput
    energyReadings?: EnergyReadingCreateNestedManyWithoutBreakerInput
  }

  export type BreakerUncheckedCreateInput = {
    id?: string
    label: string
    phase?: string | null
    panelId: string
    deviceId: string
    energyReadings?: EnergyReadingUncheckedCreateNestedManyWithoutBreakerInput
  }

  export type BreakerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panel?: PanelUpdateOneRequiredWithoutBreakersNestedInput
    device?: DeviceUpdateOneRequiredWithoutBreakersNestedInput
    energyReadings?: EnergyReadingUpdateManyWithoutBreakerNestedInput
  }

  export type BreakerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panelId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    energyReadings?: EnergyReadingUncheckedUpdateManyWithoutBreakerNestedInput
  }

  export type BreakerCreateManyInput = {
    id?: string
    label: string
    phase?: string | null
    panelId: string
    deviceId: string
  }

  export type BreakerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BreakerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panelId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
  }

  export type EnergyReadingCreateInput = {
    id?: string
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt?: Date | string
    breaker: BreakerCreateNestedOneWithoutEnergyReadingsInput
  }

  export type EnergyReadingUncheckedCreateInput = {
    id?: string
    breakerId: string
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt?: Date | string
  }

  export type EnergyReadingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: IntFieldUpdateOperationsInput | number
    periodEnd?: IntFieldUpdateOperationsInput | number
    energyWh?: FloatFieldUpdateOperationsInput | number
    avgPowerW?: FloatFieldUpdateOperationsInput | number
    peakPowerW?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breaker?: BreakerUpdateOneRequiredWithoutEnergyReadingsNestedInput
  }

  export type EnergyReadingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    breakerId?: StringFieldUpdateOperationsInput | string
    periodStart?: IntFieldUpdateOperationsInput | number
    periodEnd?: IntFieldUpdateOperationsInput | number
    energyWh?: FloatFieldUpdateOperationsInput | number
    avgPowerW?: FloatFieldUpdateOperationsInput | number
    peakPowerW?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyReadingCreateManyInput = {
    id?: string
    breakerId: string
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt?: Date | string
  }

  export type EnergyReadingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: IntFieldUpdateOperationsInput | number
    periodEnd?: IntFieldUpdateOperationsInput | number
    energyWh?: FloatFieldUpdateOperationsInput | number
    avgPowerW?: FloatFieldUpdateOperationsInput | number
    peakPowerW?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyReadingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    breakerId?: StringFieldUpdateOperationsInput | string
    periodStart?: IntFieldUpdateOperationsInput | number
    periodEnd?: IntFieldUpdateOperationsInput | number
    energyWh?: FloatFieldUpdateOperationsInput | number
    avgPowerW?: FloatFieldUpdateOperationsInput | number
    peakPowerW?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateInput = {
    id?: string
    severity: string
    message: string
    acknowledged?: boolean
    createdAt?: Date | string
  }

  export type AlertUncheckedCreateInput = {
    id?: string
    severity: string
    message: string
    acknowledged?: boolean
    createdAt?: Date | string
  }

  export type AlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    acknowledged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    acknowledged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateManyInput = {
    id?: string
    severity: string
    message: string
    acknowledged?: boolean
    createdAt?: Date | string
  }

  export type AlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    acknowledged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    acknowledged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationRuleCreateInput = {
    id?: string
    condition: string
    action: string
    enabled?: boolean
  }

  export type AutomationRuleUncheckedCreateInput = {
    id?: string
    condition: string
    action: string
    enabled?: boolean
  }

  export type AutomationRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AutomationRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AutomationRuleCreateManyInput = {
    id?: string
    condition: string
    action: string
    enabled?: boolean
  }

  export type AutomationRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AutomationRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DeviceListRelationFilter = {
    every?: DeviceWhereInput
    some?: DeviceWhereInput
    none?: DeviceWhereInput
  }

  export type DeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PanelListRelationFilter = {
    every?: PanelWhereInput
    some?: PanelWhereInput
    none?: PanelWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PanelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BuildingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
  }

  export type BuildingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
  }

  export type BuildingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BuildingScalarRelationFilter = {
    is?: BuildingWhereInput
    isNot?: BuildingWhereInput
  }

  export type BreakerListRelationFilter = {
    every?: BreakerWhereInput
    some?: BreakerWhereInput
    none?: BreakerWhereInput
  }

  export type BreakerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PanelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    buildingId?: SortOrder
  }

  export type PanelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    buildingId?: SortOrder
  }

  export type PanelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    buildingId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DeviceCountOrderByAggregateInput = {
    id?: SortOrder
    macAddress?: SortOrder
    type?: SortOrder
    firmwareVersion?: SortOrder
    onlineStatus?: SortOrder
    lastSeen?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    macAddress?: SortOrder
    type?: SortOrder
    firmwareVersion?: SortOrder
    onlineStatus?: SortOrder
    lastSeen?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    id?: SortOrder
    macAddress?: SortOrder
    type?: SortOrder
    firmwareVersion?: SortOrder
    onlineStatus?: SortOrder
    lastSeen?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PanelScalarRelationFilter = {
    is?: PanelWhereInput
    isNot?: PanelWhereInput
  }

  export type DeviceScalarRelationFilter = {
    is?: DeviceWhereInput
    isNot?: DeviceWhereInput
  }

  export type EnergyReadingListRelationFilter = {
    every?: EnergyReadingWhereInput
    some?: EnergyReadingWhereInput
    none?: EnergyReadingWhereInput
  }

  export type EnergyReadingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BreakerCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    phase?: SortOrder
    panelId?: SortOrder
    deviceId?: SortOrder
  }

  export type BreakerMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    phase?: SortOrder
    panelId?: SortOrder
    deviceId?: SortOrder
  }

  export type BreakerMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    phase?: SortOrder
    panelId?: SortOrder
    deviceId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BreakerScalarRelationFilter = {
    is?: BreakerWhereInput
    isNot?: BreakerWhereInput
  }

  export type EnergyReadingCountOrderByAggregateInput = {
    id?: SortOrder
    breakerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    energyWh?: SortOrder
    avgPowerW?: SortOrder
    peakPowerW?: SortOrder
    createdAt?: SortOrder
  }

  export type EnergyReadingAvgOrderByAggregateInput = {
    periodStart?: SortOrder
    periodEnd?: SortOrder
    energyWh?: SortOrder
    avgPowerW?: SortOrder
    peakPowerW?: SortOrder
  }

  export type EnergyReadingMaxOrderByAggregateInput = {
    id?: SortOrder
    breakerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    energyWh?: SortOrder
    avgPowerW?: SortOrder
    peakPowerW?: SortOrder
    createdAt?: SortOrder
  }

  export type EnergyReadingMinOrderByAggregateInput = {
    id?: SortOrder
    breakerId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    energyWh?: SortOrder
    avgPowerW?: SortOrder
    peakPowerW?: SortOrder
    createdAt?: SortOrder
  }

  export type EnergyReadingSumOrderByAggregateInput = {
    periodStart?: SortOrder
    periodEnd?: SortOrder
    energyWh?: SortOrder
    avgPowerW?: SortOrder
    peakPowerW?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    acknowledged?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    acknowledged?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    acknowledged?: SortOrder
    createdAt?: SortOrder
  }

  export type AutomationRuleCountOrderByAggregateInput = {
    id?: SortOrder
    condition?: SortOrder
    action?: SortOrder
    enabled?: SortOrder
  }

  export type AutomationRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    condition?: SortOrder
    action?: SortOrder
    enabled?: SortOrder
  }

  export type AutomationRuleMinOrderByAggregateInput = {
    id?: SortOrder
    condition?: SortOrder
    action?: SortOrder
    enabled?: SortOrder
  }

  export type DeviceCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type DeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DeviceUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type DeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type PanelCreateNestedManyWithoutBuildingInput = {
    create?: XOR<PanelCreateWithoutBuildingInput, PanelUncheckedCreateWithoutBuildingInput> | PanelCreateWithoutBuildingInput[] | PanelUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PanelCreateOrConnectWithoutBuildingInput | PanelCreateOrConnectWithoutBuildingInput[]
    createMany?: PanelCreateManyBuildingInputEnvelope
    connect?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
  }

  export type PanelUncheckedCreateNestedManyWithoutBuildingInput = {
    create?: XOR<PanelCreateWithoutBuildingInput, PanelUncheckedCreateWithoutBuildingInput> | PanelCreateWithoutBuildingInput[] | PanelUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PanelCreateOrConnectWithoutBuildingInput | PanelCreateOrConnectWithoutBuildingInput[]
    createMany?: PanelCreateManyBuildingInputEnvelope
    connect?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PanelUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<PanelCreateWithoutBuildingInput, PanelUncheckedCreateWithoutBuildingInput> | PanelCreateWithoutBuildingInput[] | PanelUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PanelCreateOrConnectWithoutBuildingInput | PanelCreateOrConnectWithoutBuildingInput[]
    upsert?: PanelUpsertWithWhereUniqueWithoutBuildingInput | PanelUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: PanelCreateManyBuildingInputEnvelope
    set?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    disconnect?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    delete?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    connect?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    update?: PanelUpdateWithWhereUniqueWithoutBuildingInput | PanelUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: PanelUpdateManyWithWhereWithoutBuildingInput | PanelUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: PanelScalarWhereInput | PanelScalarWhereInput[]
  }

  export type PanelUncheckedUpdateManyWithoutBuildingNestedInput = {
    create?: XOR<PanelCreateWithoutBuildingInput, PanelUncheckedCreateWithoutBuildingInput> | PanelCreateWithoutBuildingInput[] | PanelUncheckedCreateWithoutBuildingInput[]
    connectOrCreate?: PanelCreateOrConnectWithoutBuildingInput | PanelCreateOrConnectWithoutBuildingInput[]
    upsert?: PanelUpsertWithWhereUniqueWithoutBuildingInput | PanelUpsertWithWhereUniqueWithoutBuildingInput[]
    createMany?: PanelCreateManyBuildingInputEnvelope
    set?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    disconnect?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    delete?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    connect?: PanelWhereUniqueInput | PanelWhereUniqueInput[]
    update?: PanelUpdateWithWhereUniqueWithoutBuildingInput | PanelUpdateWithWhereUniqueWithoutBuildingInput[]
    updateMany?: PanelUpdateManyWithWhereWithoutBuildingInput | PanelUpdateManyWithWhereWithoutBuildingInput[]
    deleteMany?: PanelScalarWhereInput | PanelScalarWhereInput[]
  }

  export type BuildingCreateNestedOneWithoutPanelsInput = {
    create?: XOR<BuildingCreateWithoutPanelsInput, BuildingUncheckedCreateWithoutPanelsInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutPanelsInput
    connect?: BuildingWhereUniqueInput
  }

  export type BreakerCreateNestedManyWithoutPanelInput = {
    create?: XOR<BreakerCreateWithoutPanelInput, BreakerUncheckedCreateWithoutPanelInput> | BreakerCreateWithoutPanelInput[] | BreakerUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutPanelInput | BreakerCreateOrConnectWithoutPanelInput[]
    createMany?: BreakerCreateManyPanelInputEnvelope
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
  }

  export type BreakerUncheckedCreateNestedManyWithoutPanelInput = {
    create?: XOR<BreakerCreateWithoutPanelInput, BreakerUncheckedCreateWithoutPanelInput> | BreakerCreateWithoutPanelInput[] | BreakerUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutPanelInput | BreakerCreateOrConnectWithoutPanelInput[]
    createMany?: BreakerCreateManyPanelInputEnvelope
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
  }

  export type BuildingUpdateOneRequiredWithoutPanelsNestedInput = {
    create?: XOR<BuildingCreateWithoutPanelsInput, BuildingUncheckedCreateWithoutPanelsInput>
    connectOrCreate?: BuildingCreateOrConnectWithoutPanelsInput
    upsert?: BuildingUpsertWithoutPanelsInput
    connect?: BuildingWhereUniqueInput
    update?: XOR<XOR<BuildingUpdateToOneWithWhereWithoutPanelsInput, BuildingUpdateWithoutPanelsInput>, BuildingUncheckedUpdateWithoutPanelsInput>
  }

  export type BreakerUpdateManyWithoutPanelNestedInput = {
    create?: XOR<BreakerCreateWithoutPanelInput, BreakerUncheckedCreateWithoutPanelInput> | BreakerCreateWithoutPanelInput[] | BreakerUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutPanelInput | BreakerCreateOrConnectWithoutPanelInput[]
    upsert?: BreakerUpsertWithWhereUniqueWithoutPanelInput | BreakerUpsertWithWhereUniqueWithoutPanelInput[]
    createMany?: BreakerCreateManyPanelInputEnvelope
    set?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    disconnect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    delete?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    update?: BreakerUpdateWithWhereUniqueWithoutPanelInput | BreakerUpdateWithWhereUniqueWithoutPanelInput[]
    updateMany?: BreakerUpdateManyWithWhereWithoutPanelInput | BreakerUpdateManyWithWhereWithoutPanelInput[]
    deleteMany?: BreakerScalarWhereInput | BreakerScalarWhereInput[]
  }

  export type BreakerUncheckedUpdateManyWithoutPanelNestedInput = {
    create?: XOR<BreakerCreateWithoutPanelInput, BreakerUncheckedCreateWithoutPanelInput> | BreakerCreateWithoutPanelInput[] | BreakerUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutPanelInput | BreakerCreateOrConnectWithoutPanelInput[]
    upsert?: BreakerUpsertWithWhereUniqueWithoutPanelInput | BreakerUpsertWithWhereUniqueWithoutPanelInput[]
    createMany?: BreakerCreateManyPanelInputEnvelope
    set?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    disconnect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    delete?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    update?: BreakerUpdateWithWhereUniqueWithoutPanelInput | BreakerUpdateWithWhereUniqueWithoutPanelInput[]
    updateMany?: BreakerUpdateManyWithWhereWithoutPanelInput | BreakerUpdateManyWithWhereWithoutPanelInput[]
    deleteMany?: BreakerScalarWhereInput | BreakerScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDevicesInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    connect?: UserWhereUniqueInput
  }

  export type BreakerCreateNestedManyWithoutDeviceInput = {
    create?: XOR<BreakerCreateWithoutDeviceInput, BreakerUncheckedCreateWithoutDeviceInput> | BreakerCreateWithoutDeviceInput[] | BreakerUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutDeviceInput | BreakerCreateOrConnectWithoutDeviceInput[]
    createMany?: BreakerCreateManyDeviceInputEnvelope
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
  }

  export type BreakerUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<BreakerCreateWithoutDeviceInput, BreakerUncheckedCreateWithoutDeviceInput> | BreakerCreateWithoutDeviceInput[] | BreakerUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutDeviceInput | BreakerCreateOrConnectWithoutDeviceInput[]
    createMany?: BreakerCreateManyDeviceInputEnvelope
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutDevicesNestedInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    upsert?: UserUpsertWithoutDevicesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDevicesInput, UserUpdateWithoutDevicesInput>, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type BreakerUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<BreakerCreateWithoutDeviceInput, BreakerUncheckedCreateWithoutDeviceInput> | BreakerCreateWithoutDeviceInput[] | BreakerUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutDeviceInput | BreakerCreateOrConnectWithoutDeviceInput[]
    upsert?: BreakerUpsertWithWhereUniqueWithoutDeviceInput | BreakerUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: BreakerCreateManyDeviceInputEnvelope
    set?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    disconnect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    delete?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    update?: BreakerUpdateWithWhereUniqueWithoutDeviceInput | BreakerUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: BreakerUpdateManyWithWhereWithoutDeviceInput | BreakerUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: BreakerScalarWhereInput | BreakerScalarWhereInput[]
  }

  export type BreakerUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<BreakerCreateWithoutDeviceInput, BreakerUncheckedCreateWithoutDeviceInput> | BreakerCreateWithoutDeviceInput[] | BreakerUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: BreakerCreateOrConnectWithoutDeviceInput | BreakerCreateOrConnectWithoutDeviceInput[]
    upsert?: BreakerUpsertWithWhereUniqueWithoutDeviceInput | BreakerUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: BreakerCreateManyDeviceInputEnvelope
    set?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    disconnect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    delete?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    connect?: BreakerWhereUniqueInput | BreakerWhereUniqueInput[]
    update?: BreakerUpdateWithWhereUniqueWithoutDeviceInput | BreakerUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: BreakerUpdateManyWithWhereWithoutDeviceInput | BreakerUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: BreakerScalarWhereInput | BreakerScalarWhereInput[]
  }

  export type PanelCreateNestedOneWithoutBreakersInput = {
    create?: XOR<PanelCreateWithoutBreakersInput, PanelUncheckedCreateWithoutBreakersInput>
    connectOrCreate?: PanelCreateOrConnectWithoutBreakersInput
    connect?: PanelWhereUniqueInput
  }

  export type DeviceCreateNestedOneWithoutBreakersInput = {
    create?: XOR<DeviceCreateWithoutBreakersInput, DeviceUncheckedCreateWithoutBreakersInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutBreakersInput
    connect?: DeviceWhereUniqueInput
  }

  export type EnergyReadingCreateNestedManyWithoutBreakerInput = {
    create?: XOR<EnergyReadingCreateWithoutBreakerInput, EnergyReadingUncheckedCreateWithoutBreakerInput> | EnergyReadingCreateWithoutBreakerInput[] | EnergyReadingUncheckedCreateWithoutBreakerInput[]
    connectOrCreate?: EnergyReadingCreateOrConnectWithoutBreakerInput | EnergyReadingCreateOrConnectWithoutBreakerInput[]
    createMany?: EnergyReadingCreateManyBreakerInputEnvelope
    connect?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
  }

  export type EnergyReadingUncheckedCreateNestedManyWithoutBreakerInput = {
    create?: XOR<EnergyReadingCreateWithoutBreakerInput, EnergyReadingUncheckedCreateWithoutBreakerInput> | EnergyReadingCreateWithoutBreakerInput[] | EnergyReadingUncheckedCreateWithoutBreakerInput[]
    connectOrCreate?: EnergyReadingCreateOrConnectWithoutBreakerInput | EnergyReadingCreateOrConnectWithoutBreakerInput[]
    createMany?: EnergyReadingCreateManyBreakerInputEnvelope
    connect?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
  }

  export type PanelUpdateOneRequiredWithoutBreakersNestedInput = {
    create?: XOR<PanelCreateWithoutBreakersInput, PanelUncheckedCreateWithoutBreakersInput>
    connectOrCreate?: PanelCreateOrConnectWithoutBreakersInput
    upsert?: PanelUpsertWithoutBreakersInput
    connect?: PanelWhereUniqueInput
    update?: XOR<XOR<PanelUpdateToOneWithWhereWithoutBreakersInput, PanelUpdateWithoutBreakersInput>, PanelUncheckedUpdateWithoutBreakersInput>
  }

  export type DeviceUpdateOneRequiredWithoutBreakersNestedInput = {
    create?: XOR<DeviceCreateWithoutBreakersInput, DeviceUncheckedCreateWithoutBreakersInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutBreakersInput
    upsert?: DeviceUpsertWithoutBreakersInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutBreakersInput, DeviceUpdateWithoutBreakersInput>, DeviceUncheckedUpdateWithoutBreakersInput>
  }

  export type EnergyReadingUpdateManyWithoutBreakerNestedInput = {
    create?: XOR<EnergyReadingCreateWithoutBreakerInput, EnergyReadingUncheckedCreateWithoutBreakerInput> | EnergyReadingCreateWithoutBreakerInput[] | EnergyReadingUncheckedCreateWithoutBreakerInput[]
    connectOrCreate?: EnergyReadingCreateOrConnectWithoutBreakerInput | EnergyReadingCreateOrConnectWithoutBreakerInput[]
    upsert?: EnergyReadingUpsertWithWhereUniqueWithoutBreakerInput | EnergyReadingUpsertWithWhereUniqueWithoutBreakerInput[]
    createMany?: EnergyReadingCreateManyBreakerInputEnvelope
    set?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    disconnect?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    delete?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    connect?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    update?: EnergyReadingUpdateWithWhereUniqueWithoutBreakerInput | EnergyReadingUpdateWithWhereUniqueWithoutBreakerInput[]
    updateMany?: EnergyReadingUpdateManyWithWhereWithoutBreakerInput | EnergyReadingUpdateManyWithWhereWithoutBreakerInput[]
    deleteMany?: EnergyReadingScalarWhereInput | EnergyReadingScalarWhereInput[]
  }

  export type EnergyReadingUncheckedUpdateManyWithoutBreakerNestedInput = {
    create?: XOR<EnergyReadingCreateWithoutBreakerInput, EnergyReadingUncheckedCreateWithoutBreakerInput> | EnergyReadingCreateWithoutBreakerInput[] | EnergyReadingUncheckedCreateWithoutBreakerInput[]
    connectOrCreate?: EnergyReadingCreateOrConnectWithoutBreakerInput | EnergyReadingCreateOrConnectWithoutBreakerInput[]
    upsert?: EnergyReadingUpsertWithWhereUniqueWithoutBreakerInput | EnergyReadingUpsertWithWhereUniqueWithoutBreakerInput[]
    createMany?: EnergyReadingCreateManyBreakerInputEnvelope
    set?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    disconnect?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    delete?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    connect?: EnergyReadingWhereUniqueInput | EnergyReadingWhereUniqueInput[]
    update?: EnergyReadingUpdateWithWhereUniqueWithoutBreakerInput | EnergyReadingUpdateWithWhereUniqueWithoutBreakerInput[]
    updateMany?: EnergyReadingUpdateManyWithWhereWithoutBreakerInput | EnergyReadingUpdateManyWithWhereWithoutBreakerInput[]
    deleteMany?: EnergyReadingScalarWhereInput | EnergyReadingScalarWhereInput[]
  }

  export type BreakerCreateNestedOneWithoutEnergyReadingsInput = {
    create?: XOR<BreakerCreateWithoutEnergyReadingsInput, BreakerUncheckedCreateWithoutEnergyReadingsInput>
    connectOrCreate?: BreakerCreateOrConnectWithoutEnergyReadingsInput
    connect?: BreakerWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BreakerUpdateOneRequiredWithoutEnergyReadingsNestedInput = {
    create?: XOR<BreakerCreateWithoutEnergyReadingsInput, BreakerUncheckedCreateWithoutEnergyReadingsInput>
    connectOrCreate?: BreakerCreateOrConnectWithoutEnergyReadingsInput
    upsert?: BreakerUpsertWithoutEnergyReadingsInput
    connect?: BreakerWhereUniqueInput
    update?: XOR<XOR<BreakerUpdateToOneWithWhereWithoutEnergyReadingsInput, BreakerUpdateWithoutEnergyReadingsInput>, BreakerUncheckedUpdateWithoutEnergyReadingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DeviceCreateWithoutUserInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    createdAt?: Date | string
    breakers?: BreakerCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutUserInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    createdAt?: Date | string
    breakers?: BreakerUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutUserInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceCreateManyUserInputEnvelope = {
    data: DeviceCreateManyUserInput | DeviceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
  }

  export type DeviceUpdateManyWithWhereWithoutUserInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutUserInput>
  }

  export type DeviceScalarWhereInput = {
    AND?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    OR?: DeviceScalarWhereInput[]
    NOT?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    id?: StringFilter<"Device"> | string
    macAddress?: StringFilter<"Device"> | string
    type?: StringFilter<"Device"> | string
    firmwareVersion?: StringNullableFilter<"Device"> | string | null
    onlineStatus?: BoolFilter<"Device"> | boolean
    lastSeen?: DateTimeNullableFilter<"Device"> | Date | string | null
    userId?: StringNullableFilter<"Device"> | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
  }

  export type PanelCreateWithoutBuildingInput = {
    id?: string
    name: string
    breakers?: BreakerCreateNestedManyWithoutPanelInput
  }

  export type PanelUncheckedCreateWithoutBuildingInput = {
    id?: string
    name: string
    breakers?: BreakerUncheckedCreateNestedManyWithoutPanelInput
  }

  export type PanelCreateOrConnectWithoutBuildingInput = {
    where: PanelWhereUniqueInput
    create: XOR<PanelCreateWithoutBuildingInput, PanelUncheckedCreateWithoutBuildingInput>
  }

  export type PanelCreateManyBuildingInputEnvelope = {
    data: PanelCreateManyBuildingInput | PanelCreateManyBuildingInput[]
    skipDuplicates?: boolean
  }

  export type PanelUpsertWithWhereUniqueWithoutBuildingInput = {
    where: PanelWhereUniqueInput
    update: XOR<PanelUpdateWithoutBuildingInput, PanelUncheckedUpdateWithoutBuildingInput>
    create: XOR<PanelCreateWithoutBuildingInput, PanelUncheckedCreateWithoutBuildingInput>
  }

  export type PanelUpdateWithWhereUniqueWithoutBuildingInput = {
    where: PanelWhereUniqueInput
    data: XOR<PanelUpdateWithoutBuildingInput, PanelUncheckedUpdateWithoutBuildingInput>
  }

  export type PanelUpdateManyWithWhereWithoutBuildingInput = {
    where: PanelScalarWhereInput
    data: XOR<PanelUpdateManyMutationInput, PanelUncheckedUpdateManyWithoutBuildingInput>
  }

  export type PanelScalarWhereInput = {
    AND?: PanelScalarWhereInput | PanelScalarWhereInput[]
    OR?: PanelScalarWhereInput[]
    NOT?: PanelScalarWhereInput | PanelScalarWhereInput[]
    id?: StringFilter<"Panel"> | string
    name?: StringFilter<"Panel"> | string
    buildingId?: StringFilter<"Panel"> | string
  }

  export type BuildingCreateWithoutPanelsInput = {
    id?: string
    name: string
    address?: string | null
  }

  export type BuildingUncheckedCreateWithoutPanelsInput = {
    id?: string
    name: string
    address?: string | null
  }

  export type BuildingCreateOrConnectWithoutPanelsInput = {
    where: BuildingWhereUniqueInput
    create: XOR<BuildingCreateWithoutPanelsInput, BuildingUncheckedCreateWithoutPanelsInput>
  }

  export type BreakerCreateWithoutPanelInput = {
    id?: string
    label: string
    phase?: string | null
    device: DeviceCreateNestedOneWithoutBreakersInput
    energyReadings?: EnergyReadingCreateNestedManyWithoutBreakerInput
  }

  export type BreakerUncheckedCreateWithoutPanelInput = {
    id?: string
    label: string
    phase?: string | null
    deviceId: string
    energyReadings?: EnergyReadingUncheckedCreateNestedManyWithoutBreakerInput
  }

  export type BreakerCreateOrConnectWithoutPanelInput = {
    where: BreakerWhereUniqueInput
    create: XOR<BreakerCreateWithoutPanelInput, BreakerUncheckedCreateWithoutPanelInput>
  }

  export type BreakerCreateManyPanelInputEnvelope = {
    data: BreakerCreateManyPanelInput | BreakerCreateManyPanelInput[]
    skipDuplicates?: boolean
  }

  export type BuildingUpsertWithoutPanelsInput = {
    update: XOR<BuildingUpdateWithoutPanelsInput, BuildingUncheckedUpdateWithoutPanelsInput>
    create: XOR<BuildingCreateWithoutPanelsInput, BuildingUncheckedCreateWithoutPanelsInput>
    where?: BuildingWhereInput
  }

  export type BuildingUpdateToOneWithWhereWithoutPanelsInput = {
    where?: BuildingWhereInput
    data: XOR<BuildingUpdateWithoutPanelsInput, BuildingUncheckedUpdateWithoutPanelsInput>
  }

  export type BuildingUpdateWithoutPanelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BuildingUncheckedUpdateWithoutPanelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BreakerUpsertWithWhereUniqueWithoutPanelInput = {
    where: BreakerWhereUniqueInput
    update: XOR<BreakerUpdateWithoutPanelInput, BreakerUncheckedUpdateWithoutPanelInput>
    create: XOR<BreakerCreateWithoutPanelInput, BreakerUncheckedCreateWithoutPanelInput>
  }

  export type BreakerUpdateWithWhereUniqueWithoutPanelInput = {
    where: BreakerWhereUniqueInput
    data: XOR<BreakerUpdateWithoutPanelInput, BreakerUncheckedUpdateWithoutPanelInput>
  }

  export type BreakerUpdateManyWithWhereWithoutPanelInput = {
    where: BreakerScalarWhereInput
    data: XOR<BreakerUpdateManyMutationInput, BreakerUncheckedUpdateManyWithoutPanelInput>
  }

  export type BreakerScalarWhereInput = {
    AND?: BreakerScalarWhereInput | BreakerScalarWhereInput[]
    OR?: BreakerScalarWhereInput[]
    NOT?: BreakerScalarWhereInput | BreakerScalarWhereInput[]
    id?: StringFilter<"Breaker"> | string
    label?: StringFilter<"Breaker"> | string
    phase?: StringNullableFilter<"Breaker"> | string | null
    panelId?: StringFilter<"Breaker"> | string
    deviceId?: StringFilter<"Breaker"> | string
  }

  export type UserCreateWithoutDevicesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutDevicesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutDevicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
  }

  export type BreakerCreateWithoutDeviceInput = {
    id?: string
    label: string
    phase?: string | null
    panel: PanelCreateNestedOneWithoutBreakersInput
    energyReadings?: EnergyReadingCreateNestedManyWithoutBreakerInput
  }

  export type BreakerUncheckedCreateWithoutDeviceInput = {
    id?: string
    label: string
    phase?: string | null
    panelId: string
    energyReadings?: EnergyReadingUncheckedCreateNestedManyWithoutBreakerInput
  }

  export type BreakerCreateOrConnectWithoutDeviceInput = {
    where: BreakerWhereUniqueInput
    create: XOR<BreakerCreateWithoutDeviceInput, BreakerUncheckedCreateWithoutDeviceInput>
  }

  export type BreakerCreateManyDeviceInputEnvelope = {
    data: BreakerCreateManyDeviceInput | BreakerCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDevicesInput = {
    update: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDevicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type UserUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakerUpsertWithWhereUniqueWithoutDeviceInput = {
    where: BreakerWhereUniqueInput
    update: XOR<BreakerUpdateWithoutDeviceInput, BreakerUncheckedUpdateWithoutDeviceInput>
    create: XOR<BreakerCreateWithoutDeviceInput, BreakerUncheckedCreateWithoutDeviceInput>
  }

  export type BreakerUpdateWithWhereUniqueWithoutDeviceInput = {
    where: BreakerWhereUniqueInput
    data: XOR<BreakerUpdateWithoutDeviceInput, BreakerUncheckedUpdateWithoutDeviceInput>
  }

  export type BreakerUpdateManyWithWhereWithoutDeviceInput = {
    where: BreakerScalarWhereInput
    data: XOR<BreakerUpdateManyMutationInput, BreakerUncheckedUpdateManyWithoutDeviceInput>
  }

  export type PanelCreateWithoutBreakersInput = {
    id?: string
    name: string
    building: BuildingCreateNestedOneWithoutPanelsInput
  }

  export type PanelUncheckedCreateWithoutBreakersInput = {
    id?: string
    name: string
    buildingId: string
  }

  export type PanelCreateOrConnectWithoutBreakersInput = {
    where: PanelWhereUniqueInput
    create: XOR<PanelCreateWithoutBreakersInput, PanelUncheckedCreateWithoutBreakersInput>
  }

  export type DeviceCreateWithoutBreakersInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutDevicesInput
  }

  export type DeviceUncheckedCreateWithoutBreakersInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    userId?: string | null
    createdAt?: Date | string
  }

  export type DeviceCreateOrConnectWithoutBreakersInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutBreakersInput, DeviceUncheckedCreateWithoutBreakersInput>
  }

  export type EnergyReadingCreateWithoutBreakerInput = {
    id?: string
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt?: Date | string
  }

  export type EnergyReadingUncheckedCreateWithoutBreakerInput = {
    id?: string
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt?: Date | string
  }

  export type EnergyReadingCreateOrConnectWithoutBreakerInput = {
    where: EnergyReadingWhereUniqueInput
    create: XOR<EnergyReadingCreateWithoutBreakerInput, EnergyReadingUncheckedCreateWithoutBreakerInput>
  }

  export type EnergyReadingCreateManyBreakerInputEnvelope = {
    data: EnergyReadingCreateManyBreakerInput | EnergyReadingCreateManyBreakerInput[]
    skipDuplicates?: boolean
  }

  export type PanelUpsertWithoutBreakersInput = {
    update: XOR<PanelUpdateWithoutBreakersInput, PanelUncheckedUpdateWithoutBreakersInput>
    create: XOR<PanelCreateWithoutBreakersInput, PanelUncheckedCreateWithoutBreakersInput>
    where?: PanelWhereInput
  }

  export type PanelUpdateToOneWithWhereWithoutBreakersInput = {
    where?: PanelWhereInput
    data: XOR<PanelUpdateWithoutBreakersInput, PanelUncheckedUpdateWithoutBreakersInput>
  }

  export type PanelUpdateWithoutBreakersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    building?: BuildingUpdateOneRequiredWithoutPanelsNestedInput
  }

  export type PanelUncheckedUpdateWithoutBreakersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
  }

  export type DeviceUpsertWithoutBreakersInput = {
    update: XOR<DeviceUpdateWithoutBreakersInput, DeviceUncheckedUpdateWithoutBreakersInput>
    create: XOR<DeviceCreateWithoutBreakersInput, DeviceUncheckedCreateWithoutBreakersInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutBreakersInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutBreakersInput, DeviceUncheckedUpdateWithoutBreakersInput>
  }

  export type DeviceUpdateWithoutBreakersInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDevicesNestedInput
  }

  export type DeviceUncheckedUpdateWithoutBreakersInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyReadingUpsertWithWhereUniqueWithoutBreakerInput = {
    where: EnergyReadingWhereUniqueInput
    update: XOR<EnergyReadingUpdateWithoutBreakerInput, EnergyReadingUncheckedUpdateWithoutBreakerInput>
    create: XOR<EnergyReadingCreateWithoutBreakerInput, EnergyReadingUncheckedCreateWithoutBreakerInput>
  }

  export type EnergyReadingUpdateWithWhereUniqueWithoutBreakerInput = {
    where: EnergyReadingWhereUniqueInput
    data: XOR<EnergyReadingUpdateWithoutBreakerInput, EnergyReadingUncheckedUpdateWithoutBreakerInput>
  }

  export type EnergyReadingUpdateManyWithWhereWithoutBreakerInput = {
    where: EnergyReadingScalarWhereInput
    data: XOR<EnergyReadingUpdateManyMutationInput, EnergyReadingUncheckedUpdateManyWithoutBreakerInput>
  }

  export type EnergyReadingScalarWhereInput = {
    AND?: EnergyReadingScalarWhereInput | EnergyReadingScalarWhereInput[]
    OR?: EnergyReadingScalarWhereInput[]
    NOT?: EnergyReadingScalarWhereInput | EnergyReadingScalarWhereInput[]
    id?: StringFilter<"EnergyReading"> | string
    breakerId?: StringFilter<"EnergyReading"> | string
    periodStart?: IntFilter<"EnergyReading"> | number
    periodEnd?: IntFilter<"EnergyReading"> | number
    energyWh?: FloatFilter<"EnergyReading"> | number
    avgPowerW?: FloatFilter<"EnergyReading"> | number
    peakPowerW?: FloatFilter<"EnergyReading"> | number
    createdAt?: DateTimeFilter<"EnergyReading"> | Date | string
  }

  export type BreakerCreateWithoutEnergyReadingsInput = {
    id?: string
    label: string
    phase?: string | null
    panel: PanelCreateNestedOneWithoutBreakersInput
    device: DeviceCreateNestedOneWithoutBreakersInput
  }

  export type BreakerUncheckedCreateWithoutEnergyReadingsInput = {
    id?: string
    label: string
    phase?: string | null
    panelId: string
    deviceId: string
  }

  export type BreakerCreateOrConnectWithoutEnergyReadingsInput = {
    where: BreakerWhereUniqueInput
    create: XOR<BreakerCreateWithoutEnergyReadingsInput, BreakerUncheckedCreateWithoutEnergyReadingsInput>
  }

  export type BreakerUpsertWithoutEnergyReadingsInput = {
    update: XOR<BreakerUpdateWithoutEnergyReadingsInput, BreakerUncheckedUpdateWithoutEnergyReadingsInput>
    create: XOR<BreakerCreateWithoutEnergyReadingsInput, BreakerUncheckedCreateWithoutEnergyReadingsInput>
    where?: BreakerWhereInput
  }

  export type BreakerUpdateToOneWithWhereWithoutEnergyReadingsInput = {
    where?: BreakerWhereInput
    data: XOR<BreakerUpdateWithoutEnergyReadingsInput, BreakerUncheckedUpdateWithoutEnergyReadingsInput>
  }

  export type BreakerUpdateWithoutEnergyReadingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panel?: PanelUpdateOneRequiredWithoutBreakersNestedInput
    device?: DeviceUpdateOneRequiredWithoutBreakersNestedInput
  }

  export type BreakerUncheckedUpdateWithoutEnergyReadingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panelId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
  }

  export type DeviceCreateManyUserInput = {
    id?: string
    macAddress: string
    type: string
    firmwareVersion?: string | null
    onlineStatus?: boolean
    lastSeen?: Date | string | null
    createdAt?: Date | string
  }

  export type DeviceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breakers?: BreakerUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breakers?: BreakerUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    macAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: NullableStringFieldUpdateOperationsInput | string | null
    onlineStatus?: BoolFieldUpdateOperationsInput | boolean
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PanelCreateManyBuildingInput = {
    id?: string
    name: string
  }

  export type PanelUpdateWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    breakers?: BreakerUpdateManyWithoutPanelNestedInput
  }

  export type PanelUncheckedUpdateWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    breakers?: BreakerUncheckedUpdateManyWithoutPanelNestedInput
  }

  export type PanelUncheckedUpdateManyWithoutBuildingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BreakerCreateManyPanelInput = {
    id?: string
    label: string
    phase?: string | null
    deviceId: string
  }

  export type BreakerUpdateWithoutPanelInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    device?: DeviceUpdateOneRequiredWithoutBreakersNestedInput
    energyReadings?: EnergyReadingUpdateManyWithoutBreakerNestedInput
  }

  export type BreakerUncheckedUpdateWithoutPanelInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: StringFieldUpdateOperationsInput | string
    energyReadings?: EnergyReadingUncheckedUpdateManyWithoutBreakerNestedInput
  }

  export type BreakerUncheckedUpdateManyWithoutPanelInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: StringFieldUpdateOperationsInput | string
  }

  export type BreakerCreateManyDeviceInput = {
    id?: string
    label: string
    phase?: string | null
    panelId: string
  }

  export type BreakerUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panel?: PanelUpdateOneRequiredWithoutBreakersNestedInput
    energyReadings?: EnergyReadingUpdateManyWithoutBreakerNestedInput
  }

  export type BreakerUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panelId?: StringFieldUpdateOperationsInput | string
    energyReadings?: EnergyReadingUncheckedUpdateManyWithoutBreakerNestedInput
  }

  export type BreakerUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    phase?: NullableStringFieldUpdateOperationsInput | string | null
    panelId?: StringFieldUpdateOperationsInput | string
  }

  export type EnergyReadingCreateManyBreakerInput = {
    id?: string
    periodStart: number
    periodEnd: number
    energyWh: number
    avgPowerW: number
    peakPowerW: number
    createdAt?: Date | string
  }

  export type EnergyReadingUpdateWithoutBreakerInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: IntFieldUpdateOperationsInput | number
    periodEnd?: IntFieldUpdateOperationsInput | number
    energyWh?: FloatFieldUpdateOperationsInput | number
    avgPowerW?: FloatFieldUpdateOperationsInput | number
    peakPowerW?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyReadingUncheckedUpdateWithoutBreakerInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: IntFieldUpdateOperationsInput | number
    periodEnd?: IntFieldUpdateOperationsInput | number
    energyWh?: FloatFieldUpdateOperationsInput | number
    avgPowerW?: FloatFieldUpdateOperationsInput | number
    peakPowerW?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyReadingUncheckedUpdateManyWithoutBreakerInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: IntFieldUpdateOperationsInput | number
    periodEnd?: IntFieldUpdateOperationsInput | number
    energyWh?: FloatFieldUpdateOperationsInput | number
    avgPowerW?: FloatFieldUpdateOperationsInput | number
    peakPowerW?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}