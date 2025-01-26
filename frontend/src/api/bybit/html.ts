import { assertDefined } from '../../common/assert';

export const setInputValue = (
  selector: HTMLInputElement,
  text: string | number,
) => {
  const inputElement =
    typeof selector === 'string'
      ? document.querySelector<HTMLInputElement>(selector)
      : selector;

  if (!inputElement) {
    throw new Error(`Input not found: ${selector}`);
  }
  const valueDescriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  );
  if (!valueDescriptor) {
    throw new Error('Value descriptor not found');
  }
  if (!valueDescriptor.set) {
    throw new Error('Value descriptor set not found');
  }

  valueDescriptor.set.call(inputElement, text);
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
};

export const findByInnerTextXPath = (text: string) => {
  const xpath = `//*[text()="${text}"]`;
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );

  const node = assertDefined(result.singleNodeValue, `Node not found: ${text}`);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return node as HTMLElement;
};

export const findElement = <
  Container extends Element = HTMLElement,
  Result extends Element = Container,
>(
  containerSelector: string,
  check?: (element: Container) => boolean,
  select?: (element: Container) => Result | null | undefined,
) => {
  const containerNodeList =
    document.querySelectorAll<Container>(containerSelector);
  const containers = Array.from(containerNodeList);
  const container = assertDefined(
    containers.find(check ?? (() => true)),
    'Container not found',
  );
  const element = assertDefined(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    select ? select(container) : (container as unknown as Result),
    'Element not found',
  );
  return element;
};
