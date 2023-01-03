export default function ErrorCard({ message }: { message: string }) {
  return (
    <div className="text-center drop-shadow-sm">
      <div className="rounded bg-rose-400 px-4 py-2">{message}</div>
    </div>
  );
}
