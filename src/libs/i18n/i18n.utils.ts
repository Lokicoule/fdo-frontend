import i18next, { StringMap, t, TOptions } from "i18next";

interface BuildKeyFromErrorMessageOptions {
  ns: string[];
  baseKey?: string;
  error: Error;
  defaultKey?: string;
}

/**
 * @name buildKeyFromErrorMessage
 * @description Build a key from an error message.
 * @param options
 * @returns The key to use for the error message.
 */
export function buildKeyFromErrorMessage(
  options: BuildKeyFromErrorMessageOptions
): string {
  const { ns, baseKey, error, defaultKey } = options;

  for (const namespace of ns) {
    const key = `${namespace}:${baseKey ?? ""}.${error.message}`;
    console.groupCollapsed("buildKeyFromErrorMessage");
    console.log("namespace", namespace);
    console.log("baseKey", baseKey);
    console.log("error.message", error.message);
    console.log("key", key);
    console.groupEnd();
    if (i18next.exists(key)) {
      return key;
    }
  }

  if (defaultKey && i18next.exists(defaultKey)) {
    return defaultKey;
  }

  return "common:errors.unknown-error";
}
