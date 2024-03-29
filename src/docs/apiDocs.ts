const swaggerDocumentOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Library",
      version: "1.0.0",
      description: "HR Management System",
    },
    servers: [
      {
        url: "/",
        description: "Api server",
      },
    ],
    schemes: ["HTTP", "HTTPS"],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/docs/*"],
};

export default swaggerDocumentOptions;
