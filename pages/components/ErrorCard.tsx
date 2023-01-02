export default function ErrorCard({message}: {message: string}) {
  return <div className="drop-shadow-sm">
    <div className="bg-rose-400 rounded px-4 py-2">
      {message}
    </div>
  </div>
}
