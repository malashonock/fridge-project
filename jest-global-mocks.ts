import { TextEncoder } from 'util';

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

// Mock URL.createObjectURL and URL.revokeObjectURL
const spyOnCreateObjectURL = jest.fn();
const spyOnRevokeObjectURL = jest.fn();
window.URL.createObjectURL = spyOnCreateObjectURL;
window.URL.revokeObjectURL = spyOnRevokeObjectURL;

export const ObjectUrlSpies = {
  spyOnCreateObjectURL,
  spyOnRevokeObjectURL,
};

// Mock DataTransfer
function DataTransferMock(this: DataTransfer) {
  const _items: any[] = [];

  return {
    get items() {
      return {
        add(value: any): any {
          _items.push(value);
          return value;
        },
      };
    },
    // get files(): FileList {
    //   return _items as unknown as FileList;
    // },
  };
}

window.DataTransfer = jest.fn().mockImplementation(DataTransferMock);

// Polyfill TextEncoder
window.TextEncoder = TextEncoder;
