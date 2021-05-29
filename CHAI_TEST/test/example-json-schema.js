const chai = require("chai");
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;
const assert = chai.assert;
const apple = require("../manzana");
const car = require("../carro");

describe("El objeto manzana tiene los atributos acordes con el esquema de manzana. El carro no.", function () {

    const schema = {
        title: "fruit schema v0.1",
        type: "object",
        required: ["name", "color", "value"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
            },
            color: {
                type: "array",
                minItems: 1,
                uniqueItems: true,
                items: {
                    type: "string",
                },
            },
            value: {
                type: "integer",
                minimum: 5,
            },
        },
    };

    it("El objeto 'apple' cumple con el esquema de manzana.", function () {
        expect(apple).to.be.jsonSchema(schema, "custom flag");
        assert.jsonSchema(apple, schema, "custom flag");
    });

    it("El objeto 'car' no cumple con el esquema de manzana.", function () {
        expect(car).to.not.be.jsonSchema(schema, "custom flag");
        assert.notJsonSchema(car, schema, "custom flag");
    });
});
