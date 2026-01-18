import { PropsWithChildren } from 'react';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import { queryClient } from '../lib/queryClient';
import { AuthProvider } from '@/features/auth';
import { GluestackUIProvider } from '@/shared/components/ui/gluestack-ui-provider';
import { SplashScreenController } from '../components/SplashScreenController';

/**
 * AppProviders - Composes all application providers
 *
 * Provider order (outer to inner):
 * 1. QueryClientProvider - Server state management
 * 2. AuthProvider - Authentication state
 * 3. GluestackUIProvider - UI theming
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GluestackUIProvider mode="system">
          <SplashScreenController />
          {children}
          <StatusBar style="auto" />
          <PortalHost />
        </GluestackUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

