import { PropsWithChildren, useState } from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <VStack>
      <Pressable onPress={() => setIsOpen((value) => !value)}>
        <HStack className="items-center" space="sm">
          <Box className={isOpen ? 'rotate-90' : ''}>
            <IconSymbol
              name="chevron.right"
              size={18}
              weight="medium"
              color="currentColor"
            />
          </Box>
          <Text className="text-typography-900">{title}</Text>
        </HStack>
      </Pressable>
      {isOpen && <Box className="mt-2">{children}</Box>}
    </VStack>
  );
}
