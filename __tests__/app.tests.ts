import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { app } from "../app";

chai.use(chaiHttp);

describe("Home route.", () => {
  it("should check if the application home route is working", async () => {
    const response = await chai.request(app).get("/");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("success").to.equal(true);
  });
});
