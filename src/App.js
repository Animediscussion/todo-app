import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

function App() {
  const savedTodos = localStorage.getItem("todos");
  const savedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(savedDarkMode === "true");
  const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [init, setInit] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode); // 👈 store theme
  }, [darkMode]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine); // <-- load everything
    }).then(() => setInit(true));
  }, []);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false, selected: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  const edit = (id, newText) =>
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  const toggleSelectedAll = () => {
    const allSelected = todos.every((todo) => todo.selected);
    setTodos(todos.map((todo) => ({ ...todo, selected: !allSelected })));
  };
  const deleteSelected = () => setTodos(todos.filter((todo) => !todo.selected));
  const toggleSelect = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  const moveSelected = (direction) => {
    setTodos((prevTodos) => {
      const selected = prevTodos.filter((t) => t.selected);
      const unselected = prevTodos.filter((t) => !t.selected);
      return direction === "up"
        ? [...selected, ...unselected]
        : [...unselected, ...selected];
    });
  };

  const filteredSortedTodos = [...todos]
    .sort((a, b) => {
      if (sortBy === "az") return a.text.localeCompare(b.text);
      if (sortBy === "za") return b.text.localeCompare(a.text);
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "newest") return b.id - a.id;
      return 0;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      className={`relative flex flex-col items-center min-h-screen p-6 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-r from-cyan-200 via-white to-pink-100 text-black"
      }`}
    >
      {/* Particle Background */}

      {init && (
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          options={{
            background: { color: "transparent" },
            particles: {
              number: { value: 50 },
              color: { value: "#ffffff" },
              size: { value: { min: 1, max: 3 } },
              move: { enable: true, speed: 0.5 },
              links: { enable: true },
            },
            interactivity: {
              events: {
                onHover: { enable: false },
                onClick: { enable: false },
              },
            },
          }}
        />
      )}

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-4 right-6 px-4 py-2 rounded-xl shadow-md font-semibold transition bg-white-400 text-black hover:scale-105 active:scale-95"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">✨Todo List✨</h1>
      <TodoForm addTodo={addTodo} />
      <div className="w-full max-w-md mb-4 relative">
        <input
          type="text"
          placeholder="🔍 Search todos...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute right-3 top-1/4 transform -translate-y-1/2 text-xl cursor-pointer"
          type="button"
        >
          <SmilePlus />
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
        >
          <option value="newest">🆕</option>
          <option value="oldest">🕧</option>
          <option value="az">🅰️</option>
          <option value="za">🅾️</option>
          <option value="remove">🔐</option>
        </select>
      </div>
      {showEmojiPicker && (
        <div className="absolute top-12 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setSearchTerm((prev) => prev + emojiData.emoji);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}
      <TodoList
        todos={filteredSortedTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        edit={edit}
        setTodos={setTodos}
        toggleSelect={toggleSelect}
        toggleSelectedAll={toggleSelectedAll}
        deleteSelected={deleteSelected}
        moveSelected={moveSelected}
      />
    </div>
  );
}

export default App;
