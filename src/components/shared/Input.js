import { TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import { Colors } from '../../utils/Colors';

export const Input = (props) => {
  const {err} = props
  return (
    <>
      {err && <Text style={{
        color: Colors.danger,
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'right',
      }}>
        {err}
      </Text>}
      <TextInput
      activeUnderlineColor={Colors.primaryLight}
      style={{ marginBottom: 15, height: 45, backgroundColor: Colors.white, fontSize: 13, fontFamily: 'Poppins_400Regular', }}
      { ...props }
      />
    </>
  )
}