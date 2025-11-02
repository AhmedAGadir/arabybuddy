import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

export function ThemedText({
  className,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const baseClass = 'text-foreground';
  
  const typeClasses = {
    default: 'text-base leading-6',
    title: 'text-[32px] font-bold leading-8',
    defaultSemiBold: 'text-base leading-6 font-semibold',
    subtitle: 'text-xl font-bold',
    link: 'text-base leading-[30px] text-primary',
  };

  return (
    <Text
      className={`${baseClass} ${typeClasses[type]} ${className || ''}`}
      {...rest}
    />
  );
}

