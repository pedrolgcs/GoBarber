import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';
import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import logoImg from '../../assets/logo.png';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail valido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });

        Alert.alert('Sucesso', 'Bem vindo');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Error na autenticação',
          'Ocorreu um erro ao fazer login, verifique seus dados',
        );
      }
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Faça seu logon</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              name="email"
              icon="mail"
              placeholder="e-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>

          <ForgotPassword>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
