import { handleInput, clearInput } from "../Order.js";

describe("Restaurant Chatbot Tests", function () {

  beforeEach(function () {
    clearInput();
  });

  it("should show menu on start", function () {
    const result = handleInput("hi");
    expect(result[1]).toContain("Pizza or Burger");
  });

  it("should validate menu selection", function () {
    handleInput("hi");
    const result = handleInput("pasta"); // Invalid
    expect(result[0]).toContain("Sorry");
  });

  it("should progress to size selection", function () {
    handleInput("hi");
    const result = handleInput("pizza");
    expect(result[0]).toContain("What size");
  });

  it("should validate drink yes/no", function () {
    handleInput("hi"); // start
    handleInput("pizza"); // item
    handleInput("large"); // size
    handleInput("pepperoni"); // topping
    const result = handleInput("maybe"); // Invalid drink input
    expect(result[0]).toContain("Please answer 'yes' or 'no'");
  });

  it("should complete a full burger order", function () {
    handleInput("hi");
    handleInput("burger");
    handleInput("small");
    handleInput("bacon");
    const result = handleInput("yes");
    expect(result[1]).toContain("small burger with bacon");
    expect(result[1]).toContain("cold drink");
  });
});