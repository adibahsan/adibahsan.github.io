'use client'

import { GlobalStyle } from '@/styles/global'
import StyledComponentsRegistry from './registry'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      {children}
    </StyledComponentsRegistry>
  )
}
