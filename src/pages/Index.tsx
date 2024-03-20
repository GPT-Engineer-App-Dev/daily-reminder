import {
  ChakraProvider,
  VStack,
  HStack,
  Heading,
  Input,
  IconButton,
  useToast,
  Box,
  Text,
  Spacer,
  theme,
} from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

// Task type
type Task = {
  id: number;
  text: string;
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    // Check if the input is not empty
    if (!input) {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Add new task to the list
    const newTask: Task = {
      id: Date.now(), // unique id
      text: input,
    };
    setTasks([...tasks, newTask]);
    setInput(''); // Clear the input field
  };

  const handleDeleteTask = (id: number) => {
    // Filter out the task that needs to be deleted
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <VStack spacing={8}>
          <Heading mb={4}>Todo App</Heading>
          <HStack>
            <Input
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              aria-label="Add task"
              icon={<FaPlus />}
              onClick={handleAddTask}
              colorScheme="blue"
            />
          </HStack>
          <VStack spacing={4} align="stretch">
            {tasks.map((task) => (
              <HStack key={task.id}>
                <Text>{task.text}</Text>
                <Spacer />
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  colorScheme="red"
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;