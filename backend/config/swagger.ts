import { JsonObject } from 'swagger-ui-express';

export const swaggerConfig: JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'Manipulation API',
    description: 'This is an API Rent',
    version: '1.0.0',
    contact: {
      email: 'raphaelcapeto@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3333',
    },
  ],
  paths: {
    '/account/register': {
      post: {
        tags: ['Account'],
        summary: 'Register',
        description: 'Register a new developer',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateDeveloper',
              },
              example: {
                confirm_password: '@test123',
                password: '@test123',
                name: 'John Doe',
                username: 'johndoe',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Developer was created with success',
          },
          400: {
            description:
              'Validation error, developer already exists or passwords do not match',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/account/login': {
      post: {
        tags: ['Account'],
        summary: 'Login',
        description: 'Login a developer',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginDeveloper',
              },
              example: {
                password: '@test123',
                username: 'johndoe',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TokenResponse',
                },
                example: {
                  data: {
                    token: 'token',
                  },
                },
              },
            },
          },
          400: {
            description: 'Validation error',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/developers': {
      get: {
        tags: ['Developer'],
        summary: 'All',
        description: 'Get all developers',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Current page',
          },
          {
            in: 'query',
            name: 'perPage',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Number of developers per page',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Name, github or techs of developers',
          },
        ],
        responses: {
          200: {
            description: 'Get all developers with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetDevelopers',
                },
                example: {
                  developers: [],
                  page: 1,
                  perPage: 10,
                  totalPages: 3,
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/developer/me/delete': {
      delete: {
        tags: ['Developer'],
        summary: 'Developer',
        description: 'Delete a developer',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Delete with success',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Developer not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/developer/me/github': {
      patch: {
        tags: ['Developer'],
        summary: 'Developer',
        description: 'Update the github developer',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            security: [{ bearerAuth: [] }],
            required: true,
            description: 'Developer ID',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeveloperUpdateGithub',
              },
              example: {
                github: 'github without @',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update with success',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Developer not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/developers/:id': {
      get: {
        tags: ['Developer'],
        summary: 'Developer',
        description: 'Get a developer',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            security: [{ bearerAuth: [] }],
            required: true,
            description: 'Developer ID',
          },
        ],
        responses: {
          200: {
            description: 'Update with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Developer',
                },
                example: {
                  data: {
                    developer: {},
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Developer not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/developer/me': {
      get: {
        tags: ['Developer'],
        summary: 'Developer',
        description: 'Get developer profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Update with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Developer',
                },
                example: {
                  data: {
                    developer: {},
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Developer not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/developer/me/update': {
      put: {
        tags: ['Developer'],
        summary: 'Developer',
        description: 'Update developer',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateDeveloper',
              },
              example: {
                confirm_password: '@test123',
                password: '@test123',
                name: 'John Doe',
                username: 'johndoe',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Developer',
                },
                example: {
                  name: 'John Doe',
                  avatar_url: 'file',
                  techs: 'React, Node',
                  username: 'johndoe',
                  new_password: 'newpassword',
                  old_password: 'oldpassword',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Developer not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/publications': {
      get: {
        tags: ['Publications'],
        summary: 'All',
        description: 'Get all publications',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Current page',
          },
          {
            in: 'query',
            name: 'perPage',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Number of developers per page',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Title, description or developer name',
          },
        ],
        responses: {
          200: {
            description: 'Get all publications with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetPublications',
                },
                example: {
                  publications: [],
                  page: 1,
                  perPage: 10,
                  totalPages: 3,
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/publications/developer/:id': {
      get: {
        tags: ['Publications'],
        summary: 'All',
        description: 'Get all developer publications',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'params',
            name: 'id',
            schema: {
              type: 'number',
            },
            required: true,
            description: 'Developer ID',
          },
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Current page',
          },
          {
            in: 'query',
            name: 'perPage',
            schema: {
              type: 'number',
            },
            required: false,
            description: 'Number of developers per page',
          },
        ],
        responses: {
          200: {
            description: 'Get all developer publications with success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetPublications',
                },
                example: {
                  publications: [],
                  page: 1,
                  perPage: 10,
                  totalPages: 3,
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      GetPublications: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              publications: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    developer: {
                      type: 'object',
                      properties: {},
                    },
                    comments: {
                      type: 'array',
                    },
                    createdAt: {
                      type: 'datetime',
                    },
                    description: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    id: {
                      type: 'string',
                    },
                    thumbnail: {
                      type: 'object',
                      properties: {
                        web: { type: 'string ' },
                        mobile: { type: 'string ' },
                        origin: { type: 'string ' },
                      },
                    },
                  },
                },
              },
              perPage: {
                type: 'number',
              },
              page: {
                type: 'number',
              },
              totalPages: {
                type: 'number',
              },
            },
          },
        },
      },
      UpdateDeveloper: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          avatar_url: {
            type: 'string',
          },
          techs: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          new_password: {
            type: 'string',
          },
          old_password: {
            type: 'string',
          },
        },
      },
      DeveloperUpdateGithub: {
        type: 'object',
        properties: {
          github: {
            type: 'string',
          },
        },
      },
      Developer: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          techs: {
            type: 'string',
          },
          github: {
            type: 'string',
          },
          points: {
            type: 'number',
          },
          createdDate: {
            type: 'string',
          },
          avatar_url: {
            type: 'object',
            properties: {
              mobile: {
                type: 'string',
              },
              web: {
                type: 'string',
              },
              origin: {
                type: 'string',
              },
            },
          },
        },
      },
      GetDevelopers: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              developers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    username: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                    techs: {
                      type: 'string',
                    },
                    github: {
                      type: 'string',
                    },
                    points: {
                      type: 'number',
                    },
                    createdDate: {
                      type: 'string',
                    },
                    avatar_url: {
                      type: 'object',
                      properties: {
                        mobile: {
                          type: 'string',
                        },
                        web: {
                          type: 'string',
                        },
                        origin: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
              perPage: {
                type: 'number',
              },
              page: {
                type: 'number',
              },
              totalPages: {
                type: 'number',
              },
            },
          },
        },
      },
      LoginDeveloper: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
        },
      },
      CreateDeveloper: {
        type: 'object',
        properties: {
          confirm_password: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
        },
      },
      TokenResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
          },
        },
      },
      ServerMessage: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          cause: {
            type: 'string',
          },
          error: {
            type: 'boolean',
          },
        },
      },
    },
  },
};
