import { Linking, Pressable, Text } from 'react-native';

export default function ExternalLink({ href, children }) {
  return (
    <Pressable onPress={() => Linking.openURL(href)}>
      <Text style={{ color: 'blue' }}>{children}</Text>
    </Pressable>
  );
}