import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    info: {
      title: "API Documentation",
    },
  },
  apis: ["./routes/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
