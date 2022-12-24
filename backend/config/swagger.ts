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
        description: 'How creates a new user',
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
                github: 'John Doe',
                avatar_url: 'Choose a File',
                password: '@test@123',
                confirm_password: '@test@123',
                email: 'johndoe@gmail.com',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Create user with success',
          },
          400: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorMessage',
                },
                example: {
                  data: {
                    isError: true,
                    cause: 'validation',
                    message: 'Already exists user!',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
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
          password: {
            type: 'string',
          },
          confirm_password: {
            type: 'string',
          },
          avatar_url: {
            type: 'string',
          },
          github: {
            type: 'string',
          },
          document: {
            type: 'string',
          },
        },
      },
      ErrorMessage: {
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
};
