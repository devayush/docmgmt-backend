import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Document Management API",
      version: "1.0.0",
      description: "API documentation for the Document Management Backend",
    },
    servers: [
      {
        url: "http://localhost:3300/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    "./src/modules/auth/*.ts",
    "./src/modules/user/*.ts",
    "./src/modules/document/*.ts"
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);