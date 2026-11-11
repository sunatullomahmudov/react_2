import Header from "./components/Header";
import Stats from "./components/Stats";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <Header />
        <Stats />
        <TodoList />
      </div>

      <EditTodo />
    </div>
  );
};

export default App;