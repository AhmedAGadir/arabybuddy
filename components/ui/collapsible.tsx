import { PropsWithChildren, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen((value) => !value)} activeOpacity={0.8}>
        <View>
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
            style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          />
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && <View>{children}</View>}
    </View>
  );
}
