export const twLogicalClasses = [
  { physical: "ml-", /*        */ logical: "ms-" },
  { physical: "mr-", /*        */ logical: "me-" },
  { physical: "pl-", /*        */ logical: "ps-" },
  { physical: "pr-", /*        */ logical: "pe-" },
  { physical: "left-", /*      */ logical: "start-", if: isNotAbsoluteCenterd },
  { physical: "right-", /*     */ logical: "end-", if: isNotAbsoluteCenterd },
  { physical: "text-left", /*  */ logical: "text-start" },
  { physical: "text-right", /* */ logical: "text-end" },
  { physical: "border-l-", /*  */ logical: "border-s-" },
  { physical: "border-r-", /*  */ logical: "border-e-" },
  { physical: "rounded-l-", /* */ logical: "rounded-s-" },
  { physical: "rounded-r-", /* */ logical: "rounded-e-" },
  { physical: "rounded-tl-", /**/ logical: "rounded-ss-" },
  { physical: "rounded-tr-", /**/ logical: "rounded-se-" },
  { physical: "rounded-bl-", /**/ logical: "rounded-es-" },
  { physical: "rounded-br-", /**/ logical: "rounded-ee-" },
  { physical: "scroll-ml-", /* */ logical: "scroll-ms-" },
  { physical: "scroll-mr-", /* */ logical: "scroll-me-" },
  { physical: "scroll-pl-", /* */ logical: "scroll-ps-" },
  { physical: "scroll-pr-", /* */ logical: "scroll-pe-" },
] satisfies {
  physical: string;
  logical: string;
  if?: (className: string) => boolean;
}[];

export function tailwindClassCases(cls: string) {
  return [
    new RegExp(`^${cls}.*`),
    new RegExp(`^!${cls}.*`),
    new RegExp(`^-${cls}.*`),
    new RegExp(`^.+:${cls}.*`),
    new RegExp(`^.+:-${cls}.*`),
    new RegExp(`^.+:!${cls}.*`),
    new RegExp(`^.+:!-${cls}.*`),
  ];
}

function getAllCases(
  className: string,
  allowPhysicalInsetWithAbsolute: boolean
) {
  return twLogicalClasses.flatMap((cls) => {
    const shouldValidate = allowPhysicalInsetWithAbsolute
      ? cls.if?.(className) ?? true
      : true;
    if (!shouldValidate) return [];

    const { physical, logical } = cls;
    return tailwindClassCases(physical).map((regex) => {
      return {
        regex,
        physical,
        logical,
      };
    });
  });
}

export function parseForPhysicalClasses(
  className: string,
  allowPhysicalInsetWithAbsolute: boolean
) {
  const allCases = getAllCases(className, allowPhysicalInsetWithAbsolute);

  const classes = className.split(" ");

  return classes.map((cls) => {
    const isInvalid = allCases.some(({ regex }) => regex.test(cls));
    const valid = allCases.reduce(
      (acc, { physical, logical }) => acc.replace(physical, logical),
      cls
    );

    return {
      isInvalid,
      original: cls,
      valid: isInvalid ? valid : cls,
    };
  });

  // return allCases.map(({ physical, logical, regex }) => {
  //   const isInvalid = regex.test(cls);
  //   return {
  //     isInvalid,
  //     invalid: cls,
  //     valid: isInvalid ? cls.replace(physical, logical) : cls,
  //     physical,
  //     logical,
  //   };
  // });
  // });
}

function isNotAbsoluteCenterd(className: string) {
  return !["absolute", "fixed", "sticky"].some((c) => {
    // We match absolute-CENTERED not every absolute position
    // We encourage the usage of logical properties with positioning except for valid
    // cases like center with fixed/absolute
    return className.includes(c) && className.includes("translate-x");
  });
}
