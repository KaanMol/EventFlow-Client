import {Button, Text, TextInput, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {sourceSelector} from './store/source';
import {useForm, SubmitHandler, Controller, Control} from 'react-hook-form';

type SourceInput = {
  name: string;
  url: string;
};

const Input = ({
  name,
  control,
}: {
  name: any;
  control: Control<SourceInput, any>;
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder={name}
          value={value}
        />
      )}
      name={name}
    />
  );
};

export function Sources() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SourceInput>({
    defaultValues: {
      name: '',
      url: '',
    },
  });
  const onSubmit: SubmitHandler<SourceInput> = data => console.log(data);

  const sourceList = useRecoilValue(sourceSelector);
  return (
    <View>
      {sourceList.map((source: {url: string; name: string}) => (
        <Text>
          sourceName: {source.name}, sourceURL: {source.url}
        </Text>
      ))}

      <View style={{marginTop: 60}}>
        <Text style={{fontSize: 24, marginBottom: 15}}>Add event source</Text>
        <Input name="name" control={control} />
        <Input name="url" control={control} />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
