import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { SmilePlus } from "lucide-react";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="px-4 py-2 rounded-xl shadow-md w-72 text-black focus:ring-2 focus:ring-yellow-400 outline-none transition bg-gray-200"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer bg-gray-200"
        >
          <SmilePlus />
        </button>

        {showEmojiPicker && (
          <div className="absolute mt-12 z-50">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setText((prev) => prev + emojiData.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-xl shadow hover:scale-105 transform transition"
      >
        Add
      </button>
    </form>
  );
}
