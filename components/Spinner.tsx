export default function Spinner() {
  return (
    <div className="w-5 h-5 border border-t-red-500 animate-spin rounded-full">
      <span className="sr-only">Loading</span>
    </div>
  );
}
