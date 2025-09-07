import React from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import TodoItem from "./TodoItem";
import { Trash2, ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  edit,
  setTodos,
  toggleSelect,
  deleteSelected,
  toggleSelectedAll,
  moveSelected,
}) {
  return (
    <div
      className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 text-black dark:text-white 
                 rounded-2xl shadow-xl p-6 mt-6 transition"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">📝 Your Tasks</h2>
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <button
          onClick={toggleSelectedAll}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          Select All
        </button>
        <button
          onClick={() => moveSelected("up")}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <ArrowUpNarrowWide />
        </button>

        {/* Move selected Down */}
        <button
          onClick={() => moveSelected("down")}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <ArrowDownWideNarrow />
        </button>
        <button
          onClick={deleteSelected}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          <Trash2 />
        </button>
      </div>
      <Reorder.Group
        axis="y"
        values={todos}
        onReorder={setTodos}
        className="space-y-3 list-none p-0 m-0"
      >
        <ul className="space-y-3 list-none p-0 m-0">
          <AnimatePresence>
            {todos.map((todo) => (
              <Reorder.Item
                key={todo.id}
                value={todo}
                whileDrag={{ scale: 1.05 }}
                className="cursor-grab active: cursor-grabbing"
              >
                <TodoItem
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  edit={edit}
                  toggleSelect={toggleSelect}
                />
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </ul>
      </Reorder.Group>
    </div>
  );
}
