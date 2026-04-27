/** @jest-environment node */
const fs = require("fs");
const path = require("path");

describe("Favicon link in index.html", () => {
  test('declares <link rel="icon" ...> that points to favicon.ico', () => {
    // le index.html est à la racine du projet Vite
    const htmlPath = path.join(process.cwd(), "index.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    // présence d’un link rel=icon
    expect(html).toMatch(/<link[^>]+rel=["']icon["'][^>]*>/i);
    // href qui contient favicon.ico (chemin relatif ou absolu)
    expect(html).toMatch(/href=["'][^"']*favicon\.ico["']/i);
  });
});
