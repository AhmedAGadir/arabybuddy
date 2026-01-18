import React from 'react';
import { View } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface PasswordStrengthMeterProps {
  password: string;
}

interface Criterion {
  label: string;
  test: (password: string) => boolean;
}

const criteria: Criterion[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
];

/**
 * PasswordStrengthMeter - Visual strength bar + criteria checklist
 */
export default function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps): React.JSX.Element {
  const passedCriteria = criteria.filter((c) => c.test(password)).length;

  // Determine strength level
  const getStrengthLevel = (): { label: string; color: string; width: string } => {
    if (passedCriteria <= 1) {
      return { label: 'Weak', color: 'bg-error-500', width: 'w-1/4' };
    }
    if (passedCriteria <= 2) {
      return { label: 'Fair', color: 'bg-warning-500', width: 'w-2/4' };
    }
    if (passedCriteria === 3) {
      return { label: 'Good', color: 'bg-warning-400', width: 'w-3/4' };
    }
    return { label: 'Strong', color: 'bg-success-500', width: 'w-full' };
  };

  const strength = getStrengthLevel();

  return (
    <VStack space="md" className="w-full">
      {/* Strength Bar */}
      <VStack space="xs">
        <View className="h-2 w-full bg-background-200 rounded-full overflow-hidden">
          <View className={`h-full ${strength.color} ${strength.width} rounded-full`} />
        </View>
        {password.length > 0 && (
          <Text size="sm" className="text-typography-500">
            Password strength: <Text size="sm" className="font-medium">{strength.label}</Text>
          </Text>
        )}
      </VStack>

      {/* Criteria Checklist */}
      <VStack space="xs">
        {criteria.map((criterion) => {
          const passed = criterion.test(password);
          return (
            <HStack key={criterion.label} space="sm" className="items-center">
              {passed ? (
                <Check size={16} color="#22c55e" />
              ) : (
                <X size={16} color="#9ca3af" />
              )}
              <Text
                size="sm"
                className={passed ? 'text-success-600' : 'text-typography-400'}
              >
                {criterion.label}
              </Text>
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
}
