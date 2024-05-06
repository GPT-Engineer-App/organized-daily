import { Container, List, ListItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const CompletedTodos = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setCompletedTasks(storedTasks);
  }, []);

  return (
    <Container maxW="container.md" p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Completed Tasks</Text>
      <List spacing={3}>
        {completedTasks.length > 0 ? completedTasks.map(task => (
          <ListItem key={task.id} p={2} bg='green.100'>
            <Text as='s'>{task.text}</Text>
          </ListItem>
        )) : <Text>No completed tasks.</Text>}
      </List>
    </Container>
  );
};

export default CompletedTodos;