export default function recursivelyStripNullValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        recursivelyStripNullValues(value),
      ]),
    );
  }

  //Add thêm URL: https://wanago.io/2020/06/08/api-nestjs-serializing-response-interceptors/
  if (value instanceof Date) {
    return value;
  }

  if (value !== null) {
    return value;
  }
}
