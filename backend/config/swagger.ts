import { JsonObject } from 'swagger-ui-express';

export const swaggerConfig: JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'Manipulation deliveries API',
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
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Create User',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUser',
              },
              example: {
                firstName: 'John',
                lastName: 'Doe',
                document: '00000000000',
                username: 'foobar',
                password: '@foobar123',
                confirm_password: '@foobar123',
                email: 'johndoe@gmail.com',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Status OK!',
          },
          400: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorMessage',
                },
                example: {
                  data: {
                    message:
                      'User already exists! Please try with other document.',
                    cause: 'Create Error',
                    isError: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateUser: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          avatarUrl: {
            type: 'string',
          },
          document: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          confirm_password: {
            type: 'string',
          },
        },
      },
      ErrorMessage: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              cause: {
                type: 'string',
              },
              isError: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
};
