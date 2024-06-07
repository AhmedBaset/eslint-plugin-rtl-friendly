declare const React;

<>
  <>
    <h2>Valid</h2>
    <div className="ms-8" />
    <div className="me-8" />
    <div className="ps-8" />
    <div className="pe-8" />
    <div className="start-8" />
    <div className="end-8" />
    <div className="text-start" />
    <div className="text-end" />
    <div className="border-s-8" />
    <div className="border-e-8" />
    <div className="rounded-s-8" />
    <div className="rounded-e-8" />
    <div className="rounded-ss-8" />
    <div className="rounded-se-8" />
    <div className="rounded-es-8" />
    <div className="rounded-ee-8" />
    <div className="scroll-ms-8" />
    <div className="scroll-me-8" />
    <div className="scroll-ps-8" />
    <div className="scroll-pe-8" />
  </>

  <>
    <h2>Valid with negative</h2>
    <div className="-ms-8" />
    <div className="-me-8" />
    <div className="-ps-8" />
    <div className="-pe-8" />
    <div className="-start-8" />
    <div className="-end-8" />
    <div className="-text-start" />
    <div className="-text-end" />
    <div className="-border-s-8" />
    <div className="-border-e-8" />
    <div className="-rounded-s-8" />
    <div className="-rounded-e-8" />
    <div className="-rounded-ss-8" />
    <div className="-rounded-se-8" />
    <div className="-rounded-es-8" />
    <div className="-rounded-ee-8" />
    <div className="-scroll-ms-8" />
    <div className="-scroll-me-8" />
    <div className="-scroll-ps-8" />
    <div className="-scroll-pe-8" />
  </>

  <>
    <h2>Valid important</h2>
    <div className="!ms-8" />
    <div className="!me-8" />
    <div className="!ps-8" />
    <div className="!pe-8" />
    <div className="!start-8" />
    <div className="!end-8" />
    <div className="!text-start" />
    <div className="!text-end" />
    <div className="!border-s-8" />
    <div className="!border-e-8" />
    <div className="!rounded-s-8" />
    <div className="!rounded-e-8" />
    <div className="!rounded-ss-8" />
    <div className="!rounded-se-8" />
    <div className="!rounded-es-8" />
    <div className="!rounded-ee-8" />
    <div className="!scroll-ms-8" />
    <div className="!scroll-me-8" />
    <div className="!scroll-ps-8" />
    <div className="!scroll-pe-8" />
  </>

  <>
    <h2>Valid with modifiers</h2>
    <div className="dark:ms-8" />
    <div className="group-has:me-8" />
    <div className="[&>svg]:ps-8" />
    <div className="dark:pe-8" />
    <div className="group-[:nth-of-type(3)_&]:start-8" />
    <div className="[&>svg]:end-8" />
    <div className="aria-[hidden]:text-start" />
    <div className="dark:text-end" />
    <div className="aria-[hidden]:border-s-8" />
    <div className="@md:border-e-8" />
    <div className="dark:md:hover:rounded-s-8" />
    <div className="group-has:rounded-e-8" />
    <div className="aria-[hidden]:rounded-ss-8" />
    <div className="@md:dark:hover:rounded-se-8" />
    <div className="aria-[hidden]:rounded-es-8" />
    <div className="group-has:rounded-ee-8" />
    <div className="aria-[hidden]:scroll-ms-8" />
    <div className="aria-[hidden]:scroll-me-8" />
    <div className="dark:md:hover:scroll-ps-8" />
    <div className="data-[state=active]:scroll-pe-8" />
  </>

  <>
    <h2>Valid with modifiers and negative</h2>
    <div className="dark:md:hover:-ms-8" />
    <div className="*:-me-8" />
    <div className="@md:dark:hover:-ps-8" />
    <div className="data-[state=active]:-pe-8" />
    <div className="@md:-start-8" />
    <div className="data-[state=active]:-end-8" />
    <div className="data-[state=active]:-text-start" />
    <div className="@md:-text-end" />
    <div className="*:-border-s-8" />
    <div className="aria-[hidden]:-border-e-8" />
    <div className="@md:dark:hover:-rounded-s-8" />
    <div className="data-[state=active]:-rounded-e-8" />
    <div className="aria-[hidden]:-rounded-ss-8" />
    <div className="[&>svg]:-rounded-se-8" />
    <div className="@md:dark:hover:-rounded-es-8" />
    <div className="group-[:nth-of-type(3)_&]:-rounded-ee-8" />
    <div className="@md:-scroll-ms-8" />
    <div className="*:-scroll-me-8" />
    <div className="aria-[hidden]:-scroll-ps-8" />
    <div className="@md:dark:hover:-scroll-pe-8" />
  </>

  <>
    <h2>Valid with modifiers and important</h2>
    <div className="dark:!ms-8" />
    <div className="aria-[hidden]:!me-8" />
    <div className="group-hover/name:!ps-8" />
    <div className="group-[:nth-of-type(3)_&]:!pe-8" />
    <div className="aria-[hidden]:!start-8" />
    <div className="group-has:!end-8" />
    <div className="group-[:nth-of-type(3)_&]:!text-start" />
    <div className="group-hover/name:!text-end" />
    <div className="group-has:!border-s-8" />
    <div className="dark:!border-e-8" />
    <div className="*:!rounded-s-8" />
    <div className="dark:!rounded-e-8" />
    <div className="@md:!rounded-ss-8" />
    <div className="group-hover/name:!rounded-se-8" />
    <div className="aria-[hidden]:!rounded-es-8" />
    <div className="data-[state=active]:!rounded-ee-8" />
    <div className="[&>svg]:!scroll-ms-8" />
    <div className="dark:!scroll-me-8" />
    <div className="group-hover/name:!scroll-ps-8" />
    <div className="@md:dark:hover:!scroll-pe-8" />
  </>

  <>
    <h2>Valid with modifiers, important and negative flags</h2>
    <div className="@md:dark:hover:!-ms-8" />
    <div className="@md:dark:hover:!-me-8" />
    <div className="*:!-ps-8" />
    <div className="group-hover/name:!-pe-8" />
    <div className="data-[state=active]:!-start-8" />
    <div className="@md:!-end-8" />
    <div className="group-hover/name:!-text-start" />
    <div className="dark:md:hover:!-text-end" />
    <div className="group-has:!-border-s-8" />
    <div className="@md:dark:hover:!-border-e-8" />
    <div className="[&>svg]:!-rounded-s-8" />
    <div className="dark:!-rounded-e-8" />
    <div className="@md:!-rounded-ss-8" />
    <div className="@md:!-rounded-se-8" />
    <div className="*:!-rounded-es-8" />
    <div className="dark:md:hover:!-rounded-ee-8" />
    <div className="group-hover/name:!-scroll-ms-8" />
    <div className="@md:!-scroll-me-8" />
    <div className="dark:md:hover:!-scroll-ps-8" />
    <div className="aria-[hidden]:!-scroll-pe-8" />
  </>

  <>
    <h2>Invalid</h2>
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="pr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="left-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="right-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="text-left" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="text-right" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="border-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="border-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="rounded-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="rounded-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="rounded-tl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="rounded-tr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="rounded-bl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="rounded-br-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="scroll-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="scroll-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="scroll-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="scroll-pr-8" />
  </>

  <>
    <h2>Invalid with negative</h2>
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-pr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-left-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-right-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-text-left" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-text-right" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-border-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-border-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-rounded-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-rounded-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-rounded-tl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-rounded-tr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-rounded-bl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-rounded-br-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-scroll-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-scroll-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-scroll-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="-scroll-pr-8" />
  </>

  <>
    <h2>Invalid important</h2>
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!pr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!left-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!right-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!text-left" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!text-right" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!border-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!border-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!rounded-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!rounded-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!rounded-tl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!rounded-tr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!rounded-bl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!rounded-br-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!scroll-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!scroll-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!scroll-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="!scroll-pr-8" />
  </>

  <>
    <h2>Invalid with modifiers</h2>
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:pr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:left-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:right-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-hover/name:text-left" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:text-right" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:border-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="*:border-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:rounded-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:md:hover:rounded-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:rounded-tl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:rounded-tr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:rounded-bl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:rounded-br-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:scroll-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:scroll-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-[:nth-of-type(3)_&]:scroll-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:dark:hover:scroll-pr-8" />
  </>

  <>
    <h2>Invalid with modifiers and negative</h2>
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:md:hover:-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:md:hover:-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:-pr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:-left-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:-right-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:-text-left" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-hover/name:-text-right" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:-border-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:-border-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-[:nth-of-type(3)_&]:-rounded-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-hover/name:-rounded-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:-rounded-tl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:-rounded-tr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-[:nth-of-type(3)_&]:-rounded-bl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-hover/name:-rounded-br-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:-scroll-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:-scroll-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:-scroll-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="[&>svg]:-scroll-pr-8" />
  </>

  <>
    <h2>Invalid with modifiers and important</h2>
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:dark:hover:!ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-[:nth-of-type(3)_&]:!mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:!pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:!pr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-hover/name:!left-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:!right-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:!text-left" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:!text-right" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:!border-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:!border-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:md:hover:!rounded-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:!rounded-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="*:!rounded-tl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:!rounded-tr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="*:!rounded-bl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-[:nth-of-type(3)_&]:!rounded-br-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:!scroll-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:!scroll-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:!scroll-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:!scroll-pr-8" />
  </>

  <>
    <h2>Invalid with modifiers, important and negative flags</h2>
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-[:nth-of-type(3)_&]:!-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:md:hover:!-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:!-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:!-pr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:!-left-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:!-right-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:dark:hover:!-text-left" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-hover/name:!-text-right" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:!-border-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:!-border-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="@md:dark:hover:!-rounded-l-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:!-rounded-r-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:md:hover:!-rounded-tl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="group-has:!-rounded-tr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:!-rounded-bl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="dark:md:hover:!-rounded-br-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="aria-[hidden]:!-scroll-ml-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="*:!-scroll-mr-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="data-[state=active]:!-scroll-pl-8" />
    {/* eslint-disable-next-line rtl-friendly/no-physical-properties */}
    <div className="*:!-scroll-pr-8" />
  </>
</>;
