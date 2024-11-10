export function CreateTodo() {
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-semibold mb-4">Create Todo</h1>
      <form>
        <input
          type="text"
          name="title"
          className="bg-slate-700 mb-4 p-4 rounded-md w-full"
          placeholder="Title"
        />
        <input
          type="text"
          name="content"
          className="bg-slate-700 mb-4 p-4 rounded-md w-full"
          placeholder="Content"
        />
        <div className="flex gap-4 items-center float-end">
          <button className=" text-white font-bold py-4 px-4 rounded mb-4 float-end">
            Cancel
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-4">
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
}
