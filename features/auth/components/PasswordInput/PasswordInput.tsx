import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react-native';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  editable?: boolean;
  autoComplete?: 'current-password' | 'new-password';
}

/**
 * PasswordInput - Password field with eye toggle for visibility
 */
export default function PasswordInput({
  placeholder = 'Enter password',
  value,
  onChangeText,
  onBlur,
  editable = true,
  autoComplete = 'new-password',
}: PasswordInputProps): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input size="lg" variant="outline" className="rounded-lg w-full">
      <InputField
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        autoCapitalize="none"
        autoComplete={autoComplete}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        editable={editable}
      />
      <InputSlot className="pr-3">
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <InputIcon
            as={showPassword ? EyeOff : Eye}
            className="text-typography-500"
          />
        </Pressable>
      </InputSlot>
    </Input>
  );
}
