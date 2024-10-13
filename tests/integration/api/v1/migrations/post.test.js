import orchestrator from "tests/orchestrator.js";
import database from "infra/database";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDB();
});

async function cleanDB() {
  await database.query(`
    DROP SCHEMA public cascade; CREATE SCHEMA public;
  `);
}

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const responseFirstPost = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const responseFirstPostJson = await responseFirstPost.json();
        expect(responseFirstPost.status).toBe(201);
        expect(responseFirstPostJson.runnedMigrations.length).toBeGreaterThan(
          0,
        );
      });

      test("For the second time", async () => {
        const responseSecondPost = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const responseSecondPostJson = await responseSecondPost.json();
        expect(responseSecondPost.status).toBe(200);
        expect(responseSecondPostJson.runnedMigrations.length).toBe(0);
      });
    });
  });
});
