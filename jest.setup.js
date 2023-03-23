// Configure or set up a testing framework before each test.
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => require('next-router-mock'));
