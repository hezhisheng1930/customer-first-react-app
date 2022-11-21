
module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
  },
  parser: "@babel/eslint-parser",
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [  // 由于项目中有ts代码，需要配置通过不同配置来解析对应的资源
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    }
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // 规则的细节在ESLint官方网站查看http://eslint.org/docs/rules/
  rules: {

    "no-const-assign": 2, //禁止修改const声明的变量

    'no-var': 1,  // 使用var定义变量警告

    'comma-spacing': [2, { // 逗号前后是否需要空格
      'before': false,
      'after': true
    }],


    // 'indent': [2, 2, { // 缩进风格
    //   'SwitchCase': 1
    // }],customer-react-cli

    'no-undef': 0,


    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复

    'no-unused-vars': 0, // 变量定义了，禁止不使用

    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

  }
}