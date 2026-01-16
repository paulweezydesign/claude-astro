import { useState } from 'react';

export default function SnippetForm() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  async function handleSubmit(e) {
    e.preventDefault();
    
    const response = await fetch('/api/snippets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, code, language })
    });

    if (response.ok) {
      setTitle('');
      setCode('');
      setLanguage('javascript');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Title</label>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      
      <div>
        <label className="block">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border p-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div>
        <label className="block">Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 h-48 font-mono"
          required
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Snippet
      </button>
    </form>
  );
}