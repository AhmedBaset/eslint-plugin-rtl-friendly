import { RuleTester } from 'eslint';
import logicalProperties from '../../src/rules/tw-logical-properties';

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

tester.run('logical-properties', logicalProperties, {
  valid: [
    {
      name: 'should not report if logical properties are used',
      code: `<div className="ms-1 me-2 ps-8 pe-2 start-0 end-12 text-start border-s-2 rounded-e-sm">text</div>`,
    },
  ],
  invalid: [
    {
      name: 'should report if physical properties are used and fix them',
      code: `<div className="ml-1 mr-2 pl-8 pr-2 left-0 right-12 text-left border-l-2 rounded-l-sm">text</div>`,
      output: `<div className="ms-1 me-2 ps-8 pe-2 start-0 end-12 text-start border-s-2 rounded-s-sm">text</div>`,
      errors: [{ messageId: 'physicalProperties' }],
    },
  ],
});
