import React, { useState } from 'react';

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState('');

  return (
    <section>
      <h3>Chat</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text) return;
          setMessages([...messages, text]);
          setText('');
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Say something" />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};
