import i18next from "i18next";

function getErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error) {
    return error.message;
  }
}

interface BuildKeyFromErrorMessageOptions {
  ns: string[];
  baseKey?: string;
  error: unknown;
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
  const errorMessage = getErrorMessage(error);
  if (errorMessage) {
    for (const namespace of ns) {
      const key = `${namespace}:${baseKey ?? ""}.${errorMessage}`;
      console.log("key", key);
      if (i18next.exists(key)) {
        return key;
      }
    }
  }

  if (defaultKey && i18next.exists(defaultKey)) {
    return defaultKey;
  }

  return defaultKey ?? "common:errors.unknown-error";
}
