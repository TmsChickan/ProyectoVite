import React, { useState } from "react";

const Organizador = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Función para añadir tarea
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;

    setTareas([
      ...tareas,
      { id: Date.now(), texto: nuevaTarea, completada: false },
    ]);
    setNuevaTarea("");
  };

  // Función para alternar estado
  const toggleTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t,
      ),
    );
  };

  // Función para eliminar
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Mi Organizador
      </h2>

      {/* Formulario de entrada */}
      <form onSubmit={agregarTarea} className="flex gap-2 mb-6">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="¿Qué tienes pendiente?"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Añadir
        </button>
      </form>

      {/* Lista de tareas */}
      <ul className="space-y-3">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-all"
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => toggleTarea(tarea.id)}
            >
              <input
                type="checkbox"
                checked={tarea.completada}
                readOnly
                className="w-5 h-5 accent-green-500"
              />
              <span
                className={`${tarea.completada ? "line-through text-gray-400" : "text-gray-700"}`}
              >
                {tarea.texto}
              </span>
            </div>
            <button
              onClick={() => eliminarTarea(tarea.id)}
              className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Pie de página */}
      <div className="mt-6 pt-4 border-t text-sm text-gray-500 flex justify-between">
        <span>Total: {tareas.length}</span>
        <span>Pendientes: {tareas.filter((t) => !t.completada).length}</span>
      </div>
    </div>
  );
};

export default Organizador;
