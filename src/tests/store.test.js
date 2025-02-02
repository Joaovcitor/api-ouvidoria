import DuvidasController from "../controllers/DuvidasController.js";
import { jest } from "@jest/globals";
jest.mock("../db/models/Duvidas.js", () => ({
  create: jest.fn()
}));

describe("Método store", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        descricao: "Descrição da dúvida",
        secretariaResponsavel: "Secretaria A",
        endereco: "Rua X"
      },
      user: { userId: 1 }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("Deve criar uma dúvida com sucesso", async () => {
    const Duvidas = await import("../db/models/Duvidas.js");
    Duvidas.create.mockResolvedValue({});

    await DuvidasController.store(req, res);

    expect(Duvidas.create).toHaveBeenCalledWith({
      descricao: "Descrição da dúvida",
      secretariaResponsavel: "Secretaria A",
      userId: 1
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: ["Dúvida criada com sucesso!"]
    });
  });

  it("Deve retornar erro ao criar uma dúvida", async () => {
    const Duvidas = await import("../db/models/Duvidas.js");
    Duvidas.create.mockRejectedValue(new Error("Erro no banco de dados"));

    await DuvidasController.store(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: [
        "Ocorreu um erro desconhecido ao criar sua dúvida! Tente novamente"
      ]
    });
  });
});
