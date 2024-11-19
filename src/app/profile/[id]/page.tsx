

export default function Idpage ({params} : any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="mb-5 bg-gray-400 text-black p-4 rounded-md">Profile Page</h1>
        <h2 className="p-4 bg-blue-800 text-white rounded-lg">{params.id}</h2>
    </div>
  )
}

