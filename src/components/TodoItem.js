import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2, Edit3, Save, Eye } from "lucide-react";
import ReactDOM from "react-dom";

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  edit,
  toggleSelect,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [expanded, setExpanded] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const maxLength = 50; // limit before "Read More" shows
  const isLong = todo.text.length > maxLength;
  const displayText = expanded ? todo.text : todo.text.slice(0, maxLength);

  const handleSave = () => {
    edit(todo.id, newText);
    setEditing(false);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-md cursor-pointer transition 
        ${todo.completed ? "bg-green-400 text-white" : "bg-white text-black"}
      `}
    >
      <input
        type="checkbox"
        checked={todo.selected || false}
        onChange={() => toggleSelect(todo.id)}
        className="mr-3 cursor-pointer"
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="px-2 py-1 rounded w-full text-black"
        />
      ) : (
        <div className="flex-1 flex flex-col">
          <div
            className={`flex items-center gap-2 ${
              todo.completed ? "line-through opacity-70" : ""
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            <CheckCircle
              size={22}
              className={`${todo.completed ? "text-white" : "text-gray-400"}`}
            />
            <span>
              {displayText}
              {!expanded && isLong ? "..." : ""}
            </span>
          </div>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-7 mt-1 text-blue-500 hover:underline text-sm"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      )}
      <div className="flex gap-3 ml-3">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-blue-500 hover:text-blue-700"
          >
            <Save size={20} />
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-yellow-500 hover:text-yellow-700"
          >
            <Edit3 size={20} />
          </button>
        )}

        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={22} />
        </button>
        <button
          onClick={() => setIsViewing(true)}
          className="text-gray-500 hover:text-gray-700 transition"
          title="View"
        >
          <Eye />
        </button>
      </div>
      {isViewing &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
            onClick={() => setIsViewing(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-6 shadow-xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Todo Details</h2>
              <p className="text-lg whitespace-pre-wrap">{todo.text}</p>

              <button
                onClick={() => setIsViewing(false)}
                className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </motion.div>
          </motion.div>,
          document.body
        )}
    </motion.div>
  );
}
