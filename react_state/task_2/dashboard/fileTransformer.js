// CommonJS transformer pour Jest (fichiers statiques)
module.exports = {
  process() {
    return { code: 'module.exports = "test-file-stub";' };
  }
};
