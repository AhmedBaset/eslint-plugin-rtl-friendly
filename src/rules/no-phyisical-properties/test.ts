import { RuleTester } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";
import { NO_PHYSICAL_CLASSESS, noPhysicalProperties } from "./rule";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

tester.run("no-physical-properties", noPhysicalProperties, {
  valid: [
    {
      name: "should not report if logical properties are used",
      code: `<div className="ms-1 me-2 ps-8 pe-2 start-0 end-12 text-start border-s-2 rounded-e-sm scroll-ms-4 scroll-pe-4">text</div>`,
    },
    {
      name: "should work well with `class` attribute",
      code: `<div class="ms-1 me-2 ps-8 pe-2 start-0 end-12 text-start border-s-2 rounded-e-sm scroll-ms-4 scroll-pe-4">text</div>`,
    },
    {
      name: "should work well with the important flag",
      code: `<div className="!ms-1 !me-2 !ps-8 !pe-2 !start-0 !end-12 !text-start !border-s-2 !rounded-e-sm !scroll-ms-4 !scroll-pe-4 !!important">text</div>`,
    },
    {
      name: "should work well with modifiers",
      code: `<div className="sm:ms-1 md:me-2 lg:ps-8 xl:pe-2 hover:start-0 group-hover:end-12 @sm:text-start [&>svg]:border-s-2 data-[state=active]:rounded-e-sm supports-[display:flex]:scroll-ms-4 has-[.block]:scroll-pe-4 aria-[hidden]:!important">text</div>`,
    },
    {
      name: "should work well with modifiers and negative values",
      code: '<div className="-ps-4 md:-ps-5"></div>',
    },
    {
      name: "should work well with stacked modifiers",
      code: '<div className="dark:md:hover:ps-4"></div>',
    },
    {
      name: "should work well with : in the modifier",
      code: '<div className="group-[:nth-of-type(3)_&]:ps-4"></div>',
    },
    {
      name: "empty class is ok",
      code: "<div className=\"\" class=''></div>",
    },
    {
      name: '{"..."}',
      code: "<div className={'ps-2'} class={'md:text-start'}></div>",
    },
    {
      name: "{`...`}",
      code: "<div className={`ps-2`} class={`md:text-start`} />",
    },
    {
      name: '{isCondition && "..."}',
      code: `<div className={isCondition && "ps-2"} />`,
    },
    {
      name: '{isCondition && "..."}',
      code: `<div className={isCondition ? "ps-1 text-end me-2" : "pe-1 text-start ms-2"} />`,
    },
  ],
  invalid: [
    {
      name: "should report when using `className` or `class` attributes",
      code: `<div className="pl-1 mr-2"><span class="pl-2 pr-2">text</span></div>`,
      output: `<div className="ps-1 me-2"><span class="ps-2 pe-2">text</span></div>`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: "should keep extra classes as is",
      code: `<div className="pl-1 extra-class mr-2"><span class="pl-2 extra-class pr-2">text</span></div>`,
      output: `<div className="ps-1 extra-class me-2"><span class="ps-2 extra-class pe-2">text</span></div>`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: `{"..."}`,
      code: `<div className={"pl-1 extra-class mr-2"}><span class={"pl-2 extra-class pr-2"}>text</span></div>`,
      output: `<div className={"ps-1 extra-class me-2"}><span class={"ps-2 extra-class pe-2"}>text</span></div>`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: "{`...`}",
      code: "<div className={`pl-1 extra-class mr-2`} />",
      output: "<div className={`ps-1 extra-class me-2`} />",
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: `{"..." + "..."}`,
      code: `<div className={"pl-2 " + "mr-1" + "text-left"} />`,
      output: `<div className={"ps-2 " + "me-1" + "text-start"} />`,
      errors: [{messageId: NO_PHYSICAL_CLASSESS}, {messageId: NO_PHYSICAL_CLASSESS}, {messageId: NO_PHYSICAL_CLASSESS}]
    },
    {
      name: '{isCondition && "..."}',
      code: `<div className={isCondition && "pl-1 text-right mr-2"} />`,
      output: `<div className={isCondition && "ps-1 text-end me-2"} />`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: '{isCondition ? "..." : "..."}',
      code: `<div className={isCondition ? "pl-1 text-right" : "pr-1 text-left"} />`,
      output:
        '<div className={isCondition ? "ps-1 text-end" : "pe-1 text-start"} />',
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: "{isCondition ? `...` : `...`}",
      code: "<div className={isCondition ? `pl-1 text-right` : `pr-1 text-left`} />",
      output:
        "<div className={isCondition ? `ps-1 text-end` : `pe-1 text-start`} />",
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: '{cn("...")}',
      code: `<div className={cn("pl-1 text-right mr-2")} />`,
      output: `<div className={cn("ps-1 text-end me-2")} />`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: '{cn(isCondition && "...")}',
      code: `<div className={cn(isCondition && "pl-1 text-right mr-2")} />`,
      output: `<div className={cn(isCondition && "ps-1 text-end me-2")} />`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: '{cn(isCondition ? "..." : "...")}',
      code: '<div className={cn(isCondition ? "pl-1 text-left" : `pr-1 text-right`)} />',
      output:
        '<div className={cn(isCondition ? "ps-1 text-start" : `pe-1 text-end`)} />',
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: '{cn("...", isCondition && "...")}',
      code: `<div className={cn("rounded-l-md", isCondition && "pl-1 text-right mr-2")} />`,
      output: `<div className={cn("rounded-s-md", isCondition && "ps-1 text-end me-2")} />`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: '{cn(["...", "..."])}',
      code: `<div className={cn(["pl-1 text-right", "mr-2"])} />`,
      output: `<div className={cn(["ps-1 text-end", "me-2"])} />`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: '{cn(["...", ...["..."]])}',
      code: `<div className={cn(["pl-1"], [["left-0"]], ...["text-right", "mr-2"])} />`,
      output: `<div className={cn(["ps-1"], [["start-0"]], ...["text-end", "me-2"])} />`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: '{cn({"...": true})}',
      code: `<div className={cn({"pl-1 text-right": true})} />`,
      output: `<div className={cn({"ps-1 text-end": true})} />`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: '{cn({"...": "..."}, isCondition && {"...": "..."})}',
      code: `<div className={cn({"pl-1 text-right": "mr-2"}, isCondition && {"pl-2": "text-left"})} />`,
      output: `<div className={cn({"ps-1 text-end": "me-2"}, isCondition && {"ps-2": "text-start"})} />`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: "clsx('...', [1 && '...', { ...: false, ...: null }, is && ['...', ['...']]], '...')",
      code: `<div className={clsx('pl-1', [1 && 'text-right', { 'text-left': false, 'mr-2': null }, is && ['pr-2', ['pl-2']]], 'mr-1')} />`,
      output: `<div className={clsx('ps-1', [1 && 'text-end', { 'text-start': false, 'me-2': null }, is && ['pe-2', ['ps-2']]], 'me-1')} />`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: "should report if physical margin properties are used and fix them",
      code: `<div className="ml-1 mr-2">text</div>`,
      output: `<div className="ms-1 me-2">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical padding properties are used and fix them",
      code: `<div className="pl-1 pr-2">text</div>`,
      output: `<div className="ps-1 pe-2">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if phsical inset properties are used and fix them",
      code: `<div className="left-1 right-2">text</div>`,
      output: `<div className="start-1 end-2">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical text alignment properties are used and fix them",
      code: `<div className="text-left"><span className="text-right">text</span></div>`,
      output: `<div className="text-start"><span className="text-end">text</span></div>`,
      errors: [
        { messageId: NO_PHYSICAL_CLASSESS },
        { messageId: NO_PHYSICAL_CLASSESS },
      ],
    },
    {
      name: "should report if physical border properties are used and fix them",
      code: `<div className="border-l-1 border-r-2">text</div>`,
      output: `<div className="border-s-1 border-e-2">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical border radius properties are used and fix them",
      code: `<div className="rounded-l-1 rounded-r-2 rounded-tl-1 rounded-tr-1 rounded-bl-1 rounded-br-1">text</div>`,
      output: `<div className="rounded-s-1 rounded-e-2 rounded-ss-1 rounded-se-1 rounded-es-1 rounded-ee-1">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical scroll properties are used and fix them",
      code: `<div className="scroll-ml-1 scroll-mr-2 scroll-pl-1 scroll-pr-1">text</div>`,
      output: `<div className="scroll-ms-1 scroll-me-2 scroll-ps-1 scroll-pe-1">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with the important flag and fix it",
      code: `<div className="!pl-0">text</div>`,
      output: `<div className="!ps-0">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with modifiers and fix them",
      code: `<div className="sm:ml-1 md:mr-2 lg:pl-1 xl:pr-1 hover:ml-1 focus:mr-2 focus-within:pl-1 @md:pr-1 group-hover:ml-1 data-[state=active]:mr-2 [&>svg]:pl-1 group-[anything]:pr-1">text</div>`,
      output: `<div className="sm:ms-1 md:me-2 lg:ps-1 xl:pe-1 hover:ms-1 focus:me-2 focus-within:ps-1 @md:pe-1 group-hover:ms-1 data-[state=active]:me-2 [&>svg]:ps-1 group-[anything]:pe-1">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with important flag and modifiers and fix them",
      code: `<div className="md:!pl-0 hover:!mr-[23]">text</div>`,
      output: `<div className="md:!ps-0 hover:!me-[23]">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with important flag, modifiers, and negative prefix and fix them",
      code: `<div className="md:!-pl-0 hover:!-mr-[23]">text</div>`,
      output: `<div className="md:!-ps-0 hover:!-me-[23]">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with negative values and fix them",
      code: `<div className="-ml-1 -mr-2 -pl-1 -pr-1">text</div>`,
      output: `<div className="-ms-1 -me-2 -ps-1 -pe-1">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with modifiers and negative values and fix them",
      code: `<div className="sm:-ml-1 md:-mr-2 lg:-pl-1 xl:-pr-1">text</div>`,
      output: `<div className="sm:-ms-1 md:-me-2 lg:-ps-1 xl:-pe-1">text</div>`,
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with stacked modifiers",
      code: '<div className="dark:md:hover:pl-4"></div>',
      output: '<div className="dark:md:hover:ps-4"></div>',
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
    {
      name: "should report if physical properties are used with : in the modifier",
      code: '<div className="group-[:nth-of-type(3)_&]:pl-4"></div>',
      output: '<div className="group-[:nth-of-type(3)_&]:ps-4"></div>',
      errors: [{ messageId: NO_PHYSICAL_CLASSESS }],
    },
  ],
});
