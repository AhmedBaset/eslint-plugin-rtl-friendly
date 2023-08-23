export function camelize(str: string) {
  return str.replace(/-([a-z])/g, (_, w: string) => {
    return w.toUpperCase();
  });
}
