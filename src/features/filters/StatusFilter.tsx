import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "./filterSlice";
import type { RootState } from "../../store/store";

export default function StatusFilter() {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.filters.status);

  const options = ["all", "open", "in_progress", "done"];

  return (
    <div className="flex gap-2 mb-4">
      {options.map((opt) => (
        <button
          key={opt}
          className={`px-3 py-1 rounded ${
            status === opt ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => dispatch(setStatusFilter(opt as any))}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
