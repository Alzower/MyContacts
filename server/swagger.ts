import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
