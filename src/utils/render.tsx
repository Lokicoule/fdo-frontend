/**
 * @description Prevents component from rendering if condition is false
 * @param condition
 * @param Component React.ReactNode
 * @returns React.ReactNode | null
 */
export function preventRendering(
  condition: unknown,
  Component: React.ReactNode
) {
  return Boolean(condition) ? Component : null;
}

/**
 * @description Prevents component from rendering if condition is false
 * @param condition
 * @returns { render: (Component: React.ReactNode) => React.ReactNode | null }
 * @example
 * preventRenderingIf(true).render(<div>test</div>);
 */
export function preventRenderingIf(condition: unknown) {
  return {
    render: (Component: React.ReactNode) => {
      return Boolean(condition) ? Component : null;
    },
  };
}
