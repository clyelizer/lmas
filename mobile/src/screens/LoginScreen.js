import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useState } from 'react';
import api from '../services/api';
import i18n from '../config/i18n';

const schema = yup.object().shape({
  username: yup.string().required('Le nom d’utilisateur est requis'),
  password: yup.string().min(6, 'Le mot de passe doit avoir au moins 6 caractères').required('Le mot de passe est requis'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      dispatch(login({ token: response.data.token, user: response.data.user }));
      navigation.navigate('Principal');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>{i18n.t('login.title')}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={i18n.t('login.username_placeholder')}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={i18n.t('login.password_placeholder')}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            errorMessage={errors.password?.message}
          />
        )}
      />
      <Button
        title={i18n.t('login.submit_button')}
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
