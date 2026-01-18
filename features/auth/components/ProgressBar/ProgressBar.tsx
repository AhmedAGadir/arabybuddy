import React from 'react';
import { View } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

/**
 * ProgressBar - Visual step progress indicator for multi-step flows
 */
export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps): React.JSX.Element {
  return (
    <HStack className="w-full items-center" space="sm">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <View
            key={stepNumber}
            className={`h-1.5 flex-1 rounded-full ${
              isCompleted || isActive ? 'bg-primary-500' : 'bg-background-200'
            }`}
          />
        );
      })}
      <Text size="sm" className="text-typography-500 ml-2">
        {currentStep}/{totalSteps}
      </Text>
    </HStack>
  );
}
