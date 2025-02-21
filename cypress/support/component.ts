// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import React from 'react'
import './commands'
import type { ReactNode, PropsWithChildren } from 'react'
import { mount } from 'cypress/react'
// Instead of importing next-auth normally, dynamically require it:
import * as nextAuth from 'next-auth/react'
import * as nextNavigation from 'next/navigation'
import MockSessionProvider from '../component/MockSessionProvider'

// Override useRouter if possible.
const descriptor = Object.getOwnPropertyDescriptor(nextNavigation, 'useRouter')
if (descriptor && descriptor.configurable) {
  try {
    delete (nextNavigation as any).useRouter
  } catch (e) {
    // Ignore deletion errors.
  }
  Object.defineProperty(nextNavigation, 'useRouter', {
    value: () => ({
      push: () => {},
      replace: () => {},
      refresh: () => {},
      prefetch: () => Promise.resolve(),
    }),
    configurable: true,
  })
} else {
  console.warn('nextNavigation.useRouter is non-configurable. Consider using an alternate approach.')
  // Optionally, you could try stubbing it within a test context.
}

// Suppress session provider related errors.
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('useSession must be wrapped in a <SessionProvider />') ||
    err.message.includes('invariant expected app router to be mounted')
  ) {
    return false
  }
})

// Augment the Cypress namespace to include our custom commands.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      mountWithSession: typeof mount
    }
  }
}

// Register the default mount command.
// This is necessary so that cy.mount() is available.
Cypress.Commands.add('mount', mount)

// Create a custom command that stubs next-auth functions at runtime.
Cypress.Commands.add('mountWithSession', (component, options = {}) => {
  // Wrap stubbing inside cy.then so that it runs when a test is running.
  return cy.then(() => {
    // Stub useSession to return a dummy authenticated session.
    cy.stub(nextAuth, 'useSession').returns({
      data: { user: { name: 'Test User', email: 'test@example.com' } },
      status: 'authenticated'
    })
    // Stub SessionProvider to simply render its children.
    cy.stub(nextAuth, 'SessionProvider').callsFake(({ children }: PropsWithChildren<any>) =>
      React.createElement(React.Fragment, null, children)
    )
    // Now use the registered mount command.
    return cy.mount(component, options)
  })
})