import { useState, useEffect } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        description: "Please enter a task before adding.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setInput('');
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleCompleteTask = (id) => {
    const newTasks = tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task);
    setTasks(newTasks);
    const completedTasks = newTasks.filter(task => task.isCompleted);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box as="section" mb={4}>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
            <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
            <Flex>
              <IconButton icon={<FaCheckCircle />} onClick={() => handleCompleteTask(task.id)} isRound='true' aria-label="Complete Task" m={1} />
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} isRound='true' aria-label="Delete Task" m={1} />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;