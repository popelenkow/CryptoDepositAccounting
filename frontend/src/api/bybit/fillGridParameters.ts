import { assertDefined } from '../../common/assert';
import { roundTo } from '../../common/value';
import { findByInnerTextXPath, findElement, setInputValue } from './html';
import { LayoutNewGridParameters } from './types/gridParameters';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getGridCurrentPrice = async () => {
  const element = document.querySelector<HTMLSpanElement>(
    '.ob__market-price-bg',
  );
  if (!element) {
    throw new Error('Price not found');
  }
  const text = element.innerText;
  const value = Number(text.replace(/,/g, ''));
  if (!text || Number.isNaN(value)) {
    throw new Error(`Invalid price: ${text}`);
  }
  return value;
};

export const fillGridParameters = async (
  parameters: LayoutNewGridParameters,
) => {
  assertDefined(
    document.querySelector<HTMLElement>('.oc-head-leverage'),
  ).click();
  await wait(100);

  const leverageInput = findElement(
    '.poz-mode-switch__lvg-wrap',
    (container) =>
      container
        .querySelector('.poz-mode-switch__lvg-title')
        ?.textContent?.trim() === 'Leverage',
    (container) =>
      container.querySelector<HTMLInputElement>('.by-input__inner')!,
  );
  setInputValue(leverageInput, parameters.leverage);

  const confirmButton = findElement(
    '[role="dialog"]',
    () => true,
    (container) =>
      Array.from(container.querySelectorAll<HTMLButtonElement>('button')).find(
        (button) => button.textContent?.trim() === 'Confirm',
      ),
  );
  confirmButton.click();

  const gridInput = findElement(
    '.by-input__container',
    (container) =>
      container.querySelector('.by-input__right-icon')?.textContent?.trim() ===
      'Grids',
    (container) => container.querySelector('input'),
  );
  setInputValue(gridInput, parameters.grids);

  const fromInput = assertDefined(
    document.querySelector<HTMLInputElement>(
      '[placeholder="Lower price range"]',
    ),
  );
  setInputValue(fromInput, parameters.from);

  const toInput = assertDefined(
    document.querySelector<HTMLInputElement>(
      '[placeholder="Upper price range"]',
    ),
  );
  setInputValue(toInput, parameters.to);

  findByInnerTextXPath('Arithmetic').click();
  await wait(100);
  const geometric = assertDefined(
    document.querySelector<HTMLElement>('[title="Geometric"]'),
  );
  geometric.click();

  let takeProfitRoot = document.querySelector<HTMLElement>(
    '.grid-take-profit-loss-input',
  );
  if (!takeProfitRoot) {
    assertDefined(
      document.querySelector<HTMLElement>('.oc__tp-sl-chk-text'),
    ).click();
    await wait(100);
    takeProfitRoot = assertDefined(
      document.querySelector<HTMLElement>('.grid-take-profit-loss-input'),
    );
  }
  const takeProfitInput = assertDefined(takeProfitRoot.querySelector('input'));
  setInputValue(takeProfitInput, roundTo(parameters.to + 0.0001, 4));
};
