import { useState } from "react";
import { useCreateIssues } from "../issueQueries";

export default function IssueForm() {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useCreateIssues();

  const handleSubmit = () => {
    if (!title.trim()) return;

    mutate(title);
    setTitle("");
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter issue title"
        className="border px-3 py-2 rounded w-full"
      />

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}
