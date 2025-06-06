    <div align="center">
  <a aria-label="Next.js API Decorators Logo" href="https://nextjs-api-decorators.vercel.app/" target="_blank" align="center">
    <img src="/public/ICON.png" alt="Next.js API Decorators" width="150">
  </a>
  <h1 align="center"><a href="https://nextjs-api-decorators.vercel.app/"><strong>✦ Next.js API Decorators ✦</strong></a></h1><br>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/codeaashu/nextjs-api-decorators)
![GitHub repo size](https://img.shields.io/github/repo-size/codeaashu/nextjs-api-decorators)
[![npm version](https://img.shields.io/npm/v/badge-maker.svg)](https://npmjs.org/package/badge-maker) 
[![npm license](https://img.shields.io/npm/l/badge-maker.svg)](https://npmjs.org/package/badge-maker) 
![GitHub stars](https://img.shields.io/github/stars/codeaashu/nextjs-api-decorators?style=social) 
![GitHub forks](https://img.shields.io/github/forks/codeaashu/nextjs-api-decorators?style=social)
</div>


<div align="center">
  A collection of decorators to create typed Next.js API routes, with easy request validation and transformation.<br><br>

  [View docs](https://nextjs-api-decorators.vercel.app/) ✦ [View Dev.to Article](https://dev.to/warrioraashuu/awesome-nextjs-api-routes-with-next-api-decorators-1bd0) ✦ [View Medium Article](https://warrioraashuu.medium.com/awesome-next-js-api-routes-with-next-api-decorators-670b804453d2)
</div>

---

## Basic usage

```ts
// pages/api/user.ts
class User {
  // GET /api/user
  @Get()
  async fetchUser(@Query('id') id: string) {
    const user = await DB.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  // POST /api/user
  @Post()
  @HttpCode(201)
  async createUser(@Body(ValidationPipe) body: CreateUserDto) {
    return await DB.createUser(body.email);
  }
}

export default createHandler(User);
```

💡 Read more about validation [here](https://nextjs-api-decorators.vercel.app/docs/validation)

<details>
  <summary>The code above without next-api-decorators</summary>

  ```ts
  export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const user = await DB.findUserById(req.query.id);
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          message: 'User not found'
        })
      }

      return res.json(user);
    } else if (req.method === 'POST') {
      // Very primitive e-mail address validation.
      if (!req.body.email || (req.body.email && !req.body.email.includes('@'))) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Invalid e-mail address.'
        })
      }

      const user = await DB.createUser(req.body.email);
      return res.status(201).json(user);
    }

    res.status(404).json({
      statusCode: 404,
      message: 'Not Found'
    });
  }
  ```
</details>

---

## Motivation

Building serverless functions declaratively with classes and decorators makes dealing with Next.js API routes easier and brings order and sanity to your `/pages/api` codebase.

The structure is heavily inspired by NestJS, which is an amazing framework for a lot of use cases. On the other hand, a separate NestJS repo for your backend can also bring unneeded overhead and complexity to projects with a smaller set of backend requirements. Combining the structure of NestJS, with the ease of use of Next.js, brings the best of both worlds for the right use case.

If you are not familiar with Next.js or NestJS and want some more information (or need to be convinced), check out the article
Awesome Next.js API Routes with next-api-decorators - [Dev.to Article](https://dev.to/warrioraashuu/awesome-nextjs-api-routes-with-next-api-decorators-1bd0) or [Medium Article](https://warrioraashuu.medium.com/awesome-next-js-api-routes-with-next-api-decorators-670b804453d2)


## Installation

Visit https://nextjs-api-decorators.vercel.app/docs/#installation to get started.

## Documentation

Refer to our docs for usage topics:

[Validation](https://nextjs-api-decorators.vercel.app/docs/validation)

[Route matching](https://nextjs-api-decorators.vercel.app/docs/routing/route-matching)

[Using middlewares](https://nextjs-api-decorators.vercel.app/docs/middlewares)

[Custom middlewares](https://nextjs-api-decorators.vercel.app/docs/middlewares#custom-middleware-decorators)

[Pipes](https://nextjs-api-decorators.vercel.app/docs/pipes)

[Exceptions](https://nextjs-api-decorators.vercel.app/docs/exceptions)

## Available decorators

### Class decorators

|                                           | Description                                                    |
| ----------------------------------------- | -------------------------------------------------------------- |
| `@SetHeader(name: string, value: string)` | Sets a header name/value into all routes defined in the class. |
| `@UseMiddleware(...middlewares: Middleware[])` | Registers one or multiple middlewares for all the routes defined in the class. |

### Method decorators

|                                           | Description                                       |
| ----------------------------------------- | ------------------------------------------------- |
| `@Get(path?: string)`                     | Marks the method as `GET` handler.                |
| `@Post(path?: string)`                    | Marks the method as `POST` handler.               |
| `@Put(path?: string)`                     | Marks the method as `PUT` handler.                |
| `@Delete(path?: string)`                  | Marks the method as `DELETE` handler.             |
| `@Patch(path?: string)`                   | Marks the method as `PATCH` handler.             |
| `@SetHeader(name: string, value: string)` | Sets a header name/value into the route response. |
| `@HttpCode(code: number)`                 | Sets the http code in the route response.         |
| `@UseMiddleware(...middlewares: Middleware[])` | Registers one or multiple middlewares for the handler. |

### Parameter decorators

|                         | Description                                 |
| ----------------------- | ------------------------------------------- |
| `@Req()`                | Gets the request object.                    |
| `@Res()`*               | Gets the response object.                   |
| `@Body()`               | Gets the request body.                      |
| `@Query(key: string)`   | Gets a query string parameter value by key. |
| `@Header(name: string)` | Gets a header value by name.                |
| `@Param(key: string)`   | Gets a route parameter value by key.        |

\* Note that when you inject `@Res()` in a method handler you become responsible for managing the response. When doing so, you must issue some kind of response by making a call on the response object (e.g., `res.json(...)` or `res.send(...)`), or the HTTP server will hang.

---

<div align="center">
  
[![Twitter Follow](https://img.shields.io/twitter/follow/warrior_aashuu?style=social)](https://twitter.com/intent/follow?screen_name=warrior_aashuu)  <br>
<img src="/public/banner.jpg" alt="Theme0" width="850" />
</div>
