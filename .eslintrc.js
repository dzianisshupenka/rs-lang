
module.exports = {
    "extends": ["airbnb-typescript"],
    "parserOptions": {
      "project": "./tsconfig.eslint.json",
      "tsconfigRootDir": __dirname,
      "sourceType": "module"
    },
    "rules":{
      "linebreak-style": ["off"],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["off"],
      "import/no-cycle": "off",
      "no-redeclare": "off",
    }
  }