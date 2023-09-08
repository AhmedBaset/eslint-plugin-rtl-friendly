import { RuleTester } from 'eslint';
import logicalProperties from '../../src/rules/no-physical-properties';

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

tester.run('no-physical-properties', logicalProperties, {
  valid: [
    {
      name: 'should not report if logical properties are used',
      code: `<div className="ms-1 me-2 ps-8 pe-2 start-0 end-12 text-start border-s-2 rounded-e-sm scroll-ms-4 scroll-pe-4">text</div>`,
    },
    {
      name: 'should work well with `class` attribute',
      code: `<div class="ms-1 me-2 ps-8 pe-2 start-0 end-12 text-start border-s-2 rounded-e-sm scroll-ms-4 scroll-pe-4">text</div>`,
    }, 
    {
      name: 'should work well with the important flag',
      code: `<div className="!ms-1 !me-2 !ps-8 !pe-2 !start-0 !end-12 !text-start !border-s-2 !rounded-e-sm !scroll-ms-4 !scroll-pe-4 !!important">text</div>`,
    },
    {
      name: 'should work well with the prefixes flag',
      code: `<div className="sm:ms-1 md:me-2 lg:ps-8 xl:pe-2 hover:start-0 group-hover:end-12 @sm:text-start [&>svg]:border-s-2 data-[state=active]:rounded-e-sm supports-[display:flex]:scroll-ms-4 has-[.block]:scroll-pe-4 aria-[hidden]:!important">text</div>`,
    },
  ],
  invalid: [
    {
      name: 'should report when using `className` or `class` attributes',
      code: `<div className="ml-1 mr-2"><span class="pl-2 pr-2">text</span></div>`,
      output: `<div className="ms-1 me-2"><span class="ps-2 pe-2">text</span></div>`,
      errors: [{ messageId: 'noPhysicalProperties' }, { messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical margin properties are used and fix them',
      code: `<div className="ml-1 mr-2">text</div>`,
      output: `<div className="ms-1 me-2">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical padding properties are used and fix them',
      code: `<div className="pl-1 pr-2">text</div>`,
      output: `<div className="ps-1 pe-2">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if phsical inset properties are used and fix them',
      code: `<div className="left-1 right-2">text</div>`,
      output: `<div className="start-1 end-2">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical text alignment properties are used and fix them',
      code: `<div className="text-left"><span className="text-right">text</span></div>`,
      output: `<div className="text-start"><span className="text-end">text</span></div>`,
      errors: [{ messageId: 'noPhysicalProperties' }, { messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical border properties are used and fix them',
      code: `<div className="border-l-1 border-r-2">text</div>`,
      output: `<div className="border-s-1 border-e-2">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical border radius properties are used and fix them',
      code: `<div className="rounded-l-1 rounded-r-2 rounded-tl-1 rounded-tr-1 rounded-bl-1 rounded-br-1">text</div>`,
      output: `<div className="rounded-s-1 rounded-e-2 rounded-ss-1 rounded-se-1 rounded-es-1 rounded-ee-1">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical scroll properties are used and fix them',
      code: `<div className="scroll-ml-1 scroll-mr-2 scroll-pl-1 scroll-pr-1">text</div>`,
      output: `<div className="scroll-ms-1 scroll-me-2 scroll-ps-1 scroll-pe-1">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical properties are used with the important flag and fix them',
      code: `<div className="!pl-0">text</div>`,
      output: `<div className="!ps-0">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical properties are used with prefixe modifiers and fix them',
      code: `<div className="sm:ml-1 md:mr-2 lg:pl-1 xl:pr-1">text</div>`,
      output: `<div className="sm:ms-1 md:me-2 lg:ps-1 xl:pe-1">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical properties are used with prefixe modifiers and fix them',
      code: `<div className="hover:ml-1 focus:mr-2 focus-within:pl-1 @md:pr-1">text</div>`,
      output: `<div className="hover:ms-1 focus:me-2 focus-within:ps-1 @md:pe-1">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
    {
      name: 'should report if physical properties are used with prefixe modifiers and fix them',
      code: `<div className="group-hover:ml-1 data-[state=active]:mr-2 [&>svg]:pl-1 group-[anything]::pr-1">text</div>`,
      output: `<div className="group-hover:ms-1 data-[state=active]:me-2 [&>svg]:ps-1 group-[anything]::pe-1">text</div>`,
      errors: [{ messageId: 'noPhysicalProperties' }],
    },
  ],
});
