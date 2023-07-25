import 'jest-preset-angular/setup-jest';
import './jest-global-mocks';

// Mock ResizeObserver
// triggerResizeObserver must be a mutable object,
// because fn will be set after importing it to a test
const triggerResizeObserver = {
  fn: (() => {
    throw new Error('Unassigned callback');
  }) as (entries: ResizeObserverEntry[]) => void,
};
const spyOnResizeObserverObserve = jest.fn();
const spyOnResizeObserverUnobserve = jest.fn();
const spyOnResizeObserverDisconnect = jest.fn();

function ResizeObserverMock(
  this: ResizeObserver,
  callback: ResizeObserverCallback
) {
  triggerResizeObserver.fn = (entries: ResizeObserverEntry[]) => {
    callback(entries, this);
  };
  this.observe = spyOnResizeObserverObserve;
  this.unobserve = spyOnResizeObserverUnobserve;
  this.disconnect = spyOnResizeObserverDisconnect;
  return this;
}

window.ResizeObserver = jest.fn().mockImplementation(ResizeObserverMock);

export const ResizeObserverSpies = {
  triggerResizeObserver,
  spyOnResizeObserverObserve,
  spyOnResizeObserverUnobserve,
  spyOnResizeObserverDisconnect,
};
