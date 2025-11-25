// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

// Mock scrollTo
window.scrollTo = jest.fn()

// Mock GSAP
const gsapMock = {
  registerPlugin: jest.fn(),
  fromTo: jest.fn(),
  to: jest.fn(),
  from: jest.fn(),
  set: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    play: jest.fn().mockReturnThis(),
    pause: jest.fn().mockReturnThis(),
    kill: jest.fn().mockReturnThis(),
  })),
  context: jest.fn((fn) => {
    if (fn) fn();
    return { revert: jest.fn() };
  }),
  utils: {
    toArray: jest.fn((selector) => []),
  },
};

jest.mock('gsap', () => ({
  __esModule: true,
  default: gsapMock,
  gsap: gsapMock,
  ...gsapMock,
}));

jest.mock('gsap/ScrollTrigger', () => ({
  __esModule: true,
  ScrollTrigger: jest.fn(),
  default: jest.fn(),
}));

jest.mock('gsap/TextPlugin', () => ({
  __esModule: true,
  TextPlugin: jest.fn(),
  default: jest.fn(),
}));

jest.mock('@gsap/react', () => ({
  __esModule: true,
  useGSAP: jest.fn((fn) => {
    if (fn) fn();
  }),
}));
