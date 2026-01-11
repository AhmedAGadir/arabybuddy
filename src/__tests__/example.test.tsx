import React from 'react';
import { Text, View } from 'react-native';
import { render, screen } from '@/shared/testing';

describe('Test setup', () => {
  it('renders correctly', () => {
    render(
      <View>
        <Text>Hello World</Text>
      </View>
    );

    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('works with multiple elements', () => {
    render(
      <View>
        <Text testID="title">Title</Text>
        <Text testID="subtitle">Subtitle</Text>
      </View>
    );

    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.getByTestId('subtitle')).toBeTruthy();
  });
});
