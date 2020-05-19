import React from 'react';
import { Button } from 'react-native';

// context
import { useAuth } from '../../hooks/auth';

// styles
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Button title="sair" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
