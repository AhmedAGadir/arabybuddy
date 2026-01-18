import { PropsWithChildren, useState } from 'react';
import { IconSymbol } from '@/shared/components/ui/icon-symbol';
import { VStack } from '@/shared/components/ui/vstack';
import { HStack } from '@/shared/components/ui/hstack';
import { Text } from '@/shared/components/ui/text';
import { Pressable } from '@/shared/components/ui/pressable';
import { Box } from '@/shared/components/ui/box';

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
