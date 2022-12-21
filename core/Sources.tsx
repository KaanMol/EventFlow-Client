import {Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {sourceSelector} from './store/source';

export const Sources = () => {
  const sourceList = useRecoilValue(sourceSelector);
  return (
    <View>
      {sourceList.map((source: {url: String; name: String}) => (
        <Text>
          sourceName: {source.name}, sourceURL: {source.url}
        </Text>
      ))}
    </View>
  );
};
