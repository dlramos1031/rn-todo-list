import { useState } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { TextInput, Button, List, IconButton, Menu, Divider, Appbar, useTheme } from "react-native-paper";

const STATUSES = [
  { label: "In Progress 🙌", color: "#4fc3f7" },  // Blue
  { label: "Done ✅", color: "#32CD32" },         // Lime Green
  { label: "Paused ⏸️", color: "#FF6961" },       // Light Red
  { label: "Not Started 🛑", color: "#808080" },  // Grey
];

export default function Index() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [status, setStatus] = useState(STATUSES[0]); // Default to "In Progress"
  const theme = useTheme();

  // Add or Edit Task
  const addOrEditTask = () => {
    if (!task.trim()) return;

    if (editingTask) {
      setTasks(tasks.map(t => (t.id === editingTask.id ? { ...t, title: task, status } : t)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), title: task, status }]);
    }

    setTask('');
    setStatus(STATUSES[0]); // Reset to default status
  };

  // Edit Task
  const editTask = (task) => {
    setTask(task.title);
    setStatus(task.status);
    setEditingTask(task);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Render a task item
  const renderTaskItem = ({ item }) => (
    <List.Item
      title={item.title}
      description={`Status: ${item.status.label}`}
      titleStyle={{ color: theme.colors.onSurface }} 
      descriptionStyle={{ color: item.status.color }} 
      onPress={() => editTask(item)}
      right={() => (
        <IconButton
          icon="delete"
          iconColor={theme.colors.primary} 
          onPress={() => deleteTask(item.id)}
        />
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Todo List (Mobile Programming)" titleStyle={{ color: theme.colors.primary }} />
      </Appbar.Header>

      {/* Input Field */}
      <TextInput
        label="Task"
        value={task}
        onChangeText={setTask}
        mode="outlined"
        style={styles.input}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
        placeholderTextColor={theme.colors.placeholder}
      />

      {/* Status Selector */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.statusButton} textColor={theme.colors.onSurface}>
            {status.label}
          </Button>
        }
      >
        {STATUSES.map(s => (
          <Menu.Item
            key={s.label}
            onPress={() => {
              setStatus(s);
              setMenuVisible(false);
            }}
            title={s.label}
            titleStyle={{ color: s.color }} // Set color dynamically in options list
          />
        ))}
      </Menu>

      {/* Add/Edit Button */}
      <Button mode="contained" onPress={addOrEditTask} style={styles.button} buttonColor={theme.colors.primary}>
        {editingTask ? 'Edit Task' : 'Add Task'}
      </Button>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#ffffff', // White background for the input field
  },
  statusButton: {
    marginBottom: 10,
    borderColor: '#4fc3f7', // Baby blue border
  },
  button: {
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#f0f8ff',
  }
});
