import { createNewEmail, createNewName } from "../support/utils"

let email, name, userId

describe("Cadastro simples de Usuário", () => {
  it("should create a new user", () => {
    email = createNewEmail()
    name = createNewName()

    cy.request({
      method: "POST",
      url: "/usuarios",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        nome: name,
        email: email,
        password: "123123",
        administrador: "true",
      },
    }).should((response) => {
      userId = response.body._id
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property(
        "message",
        "Cadastro realizado com sucesso"
      )
    })
  })

  it("should search user by ID", () => {
    cy.log(userId)

    cy.request({
      method: "GET",
      url: `/usuarios/${userId}`,
      headers: {
        Accept: "application/json",
      },
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("nome", name),
        expect(response.body).to.have.property("email", email),
        expect(response.body).to.have.property("administrador"),
        expect(response.body).to.have.property("_id")
    })
  })

  it("should update user", () => {
    cy.request({
      method: "PUT",
      url: `/usuarios/${userId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        nome: name,
        email: email,
        password: "123123",
        administrador: "true",
      },
    }).should((response) => {
      expect(response.status).to.eq(200),
        expect(response.body).to.have.property(
          "message",
          "Registro alterado com sucesso"
        )
    })
  })

  it("should confirm if the user was updated", () => {
    cy.request({
      method: "GET",
      url: `/usuarios/${userId}`,
      headers: {
        Accept: "application/json",
      },
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("nome", name),
        expect(response.body).to.have.property("email", email),
        expect(response.body).to.have.property("password", "123123"),
        expect(response.body).to.have.property("administrador"),
        expect(response.body).to.have.property("_id")
    })
  })

  it("should delete user by ID", () => {
    cy.request({
      method: "DELETE",
      url: `/usuarios/${userId}`,
      headers: {
        Accept: "application/json",
      },
    }).should((response) => {
      userId = response.body._id

      expect(response.status).to.eq(200)
      expect(response.body).to.have.property(
        "message",
        "Registro excluído com sucesso"
      )
    })
  })

  it("should verify if user is deleted", () => {
    cy.log(userId)

    cy.request({
      method: "GET",
      url: `/usuarios/${userId}`,
      headers: {
        Accept: "application/json",
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property(
        "message",
        "Usuário não encontrado"
      )
    })
  })

  it("should search all users", () => {
    cy.request({
      method: "GET",
      url: `/usuarios`,
      headers: {
        Accept: "application/json",
      },
    }).should((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
