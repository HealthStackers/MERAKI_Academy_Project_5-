export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="loader mb-4" />
        <p className="text-lg font-medium">Checking credentials...</p>
      </div>
    </div>
  );
}