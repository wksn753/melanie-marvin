import test from "node:test";
import assert from "node:assert/strict";
import { validateRsvp, csvCell } from "../lib/rsvp-validation.ts";

const typical = {
  name: "  Naomi Kato ", email: "naomi@example.com", attending: true,
  guests: 2, dietary: "Vegetarian", message: "Congratulations!",
};

test("accepts and normalizes a valid response", () => {
  const result = validateRsvp(typical);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.name, "Naomi Kato");
});
test("supports declining without an email", () => {
  assert.equal(validateRsvp({ ...typical, attending: false, guests: 0, email: "" }).ok, true);
});
test("rejects malformed objects and wrong types", () => {
  for (const data of [null, [], "hi", { ...typical, name: 42 }, { ...typical, attending: "true" }, { ...typical, guests: "3" }]) {
    assert.equal(validateRsvp(data).ok, false);
  }
});
test("rejects invalid guest counts and overlong content", () => {
  for (const data of [
    { ...typical, guests: 7 }, { ...typical, guests: 0 },
    { ...typical, attending: false, guests: 1 },
    { ...typical, message: "A".repeat(1001) },
    { ...typical, name: "A" },
  ]) assert.equal(validateRsvp(data).ok, false);
});
test("rejects control characters and invalid email", () => {
  assert.equal(validateRsvp({ ...typical, message: "\u0000" }).ok, false);
  assert.equal(validateRsvp({ ...typical, email: "not-an-email" }).ok, false);
});
test("CSV escapes quotes and neutralizes spreadsheet formulas", () => {
  assert.equal(csvCell('Hi "Marvin"'), '"Hi ""Marvin"""');
  for (const cell of ['=1+1', ' +A1', '\t=SUM(A1)', '-2+5', '@SUM(A1)']) {
    assert.ok(csvCell(cell).startsWith('"\''));
  }
});
