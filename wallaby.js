module.exports = () => {
  return {
    files: [
      'src/**/*.js', // Adicione aqui os arquivos do seu projeto
      '!src/**/*.test.js', // Ignore arquivos de teste
    ],

    tests: [
      'src/**/*.test.js', // Inclua os arquivos de teste
    ],

    env: {
      type: 'node',
    },

    testFramework: 'jest', // Altere para a biblioteca que você usa
  };
};
