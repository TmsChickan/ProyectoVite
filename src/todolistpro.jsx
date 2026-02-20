import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Layout,
  Filter,
  CheckCircle,
} from "lucide-react";

const Todolistpro = () => {
  // Estado principal de las tareas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Diseñar la interfaz de usuario",
      completed: true,
      priority: "Alta",
      category: "Diseño",
    },
    {
      id: 2,
      text: "Configurar la base de datos",
      completed: false,
      priority: "Media",
      category: "Backend",
    },
    {
      id: 3,
      text: "Revisar documentación del proyecto",
      completed: false,
      priority: "Baja",
      category: "Estudio",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Media");
  const [filter, setFilter] = useState("Todas");

  // Estilos CSS en línea para evitar dependencias de Tailwind
  const styles = {
    container: {
      minHeight: "100-screen",
      backgroundColor: "#f8fafc",
      padding: "2rem 1rem",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    wrapper: {
      maxWidth: "900px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      gap: "1rem",
    },
    progressCard: {
      backgroundColor: "#ffffff",
      padding: "1rem",
      borderRadius: "1rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      border: "1px solid #e2e8f0",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "1.5rem",
      borderRadius: "1.5rem",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
      border: "1px solid #f1f5f9",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.75rem",
      border: "1px solid #e2e8f0",
      marginBottom: "1rem",
      outline: "none",
      boxSizing: "border-box",
    },
    buttonPrimary: {
      width: "100%",
      backgroundColor: "#0f172a",
      color: "white",
      fontWeight: "bold",
      padding: "0.75rem",
      borderRadius: "0.75rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    taskItem: (completed) => ({
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      backgroundColor: "white",
      borderRadius: "1rem",
      border: "1px solid #e2e8f0",
      marginBottom: "0.75rem",
      opacity: completed ? 0.6 : 1,
      transition: "transform 0.2s",
    }),
    priorityBadge: (type) => {
      const colors = {
        Alta: { bg: "#fee2e2", text: "#b91c1c" },
        Media: { bg: "#fef3c7", text: "#b45309" },
        Baja: { bg: "#dcfce7", text: "#15803d" },
      };
      return {
        fontSize: "0.7rem",
        padding: "0.2rem 0.5rem",
        borderRadius: "999px",
        fontWeight: "bold",
        backgroundColor: colors[type].bg,
        color: colors[type].text,
      };
    },
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTasks([
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
        priority,
        category: "General",
      },
      ...tasks,
    ]);
    setInputValue("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    if (filter === "Pendientes") return tasks.filter((t) => !t.completed);
    if (filter === "Completadas") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const progress =
    tasks.length > 0
      ? Math.round(
          (tasks.filter((t) => t.completed).length / tasks.length) * 100,
        )
      : 0;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <div>
            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: "800",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Layout color="#4f46e5" /> Organizador Pro
            </h1>
            <p style={{ color: "#64748b", marginTop: "0.25rem" }}>
              Gestiona tus proyectos diarios.
            </p>
          </div>

          <div style={styles.progressCard}>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Progreso
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>
                {progress}%
              </p>
            </div>
            <CheckCircle color="#4f46e5" size={32} />
          </div>
        </header>

        <div style={styles.grid}>
          {/* Formulario */}
          <div>
            <div style={styles.card}>
              <h3
                style={{
                  marginTop: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Plus size={18} color="#4f46e5" /> Nueva Tarea
              </h3>
              <form onSubmit={addTask}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    color: "#475569",
                    marginBottom: "0.25rem",
                  }}
                >
                  Descripción
                </label>
                <input
                  style={styles.input}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ej: Terminar informe..."
                />

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      color: "#475569",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Prioridad
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {["Baja", "Media", "Alta"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        style={{
                          flex: 1,
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          border: "1px solid #e2e8f0",
                          backgroundColor:
                            priority === p ? "#4f46e5" : "#f8fafc",
                          color: priority === p ? "white" : "#64748b",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" style={styles.buttonPrimary}>
                  Añadir
                </button>
              </form>
            </div>
          </div>

          {/* Lista de Tareas */}
          <div style={{ flex: 2 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
                backgroundColor: "white",
                padding: "0.5rem",
                borderRadius: "1rem",
                border: "1px solid #e2e8f0",
              }}
            >
              {["Todas", "Pendientes", "Completadas"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.75rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    backgroundColor: filter === f ? "#f1f5f9" : "transparent",
                    color: filter === f ? "#0f172a" : "#64748b",
                    fontWeight: "500",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div style={{ minHeight: "300px" }}>
              {filteredTasks.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    border: "2px dashed #e2e8f0",
                    borderRadius: "1.5rem",
                    color: "#94a3b8",
                  }}
                >
                  No hay tareas aquí
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} style={styles.taskItem(task.completed)}>
                    <button
                      onClick={() => toggleTask(task.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {task.completed ? (
                        <CheckCircle2 color="#4f46e5" />
                      ) : (
                        <Circle color="#cbd5e1" />
                      )}
                    </button>

                    <div style={{ flex: 1 }}>
                      <span style={styles.priorityBadge(task.priority)}>
                        {task.priority}
                      </span>
                      <p
                        style={{
                          margin: "0.25rem 0 0 0",
                          fontWeight: "500",
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed ? "#94a3b8" : "#1e293b",
                        }}
                      >
                        {task.text}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#94a3b8",
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todolistpro;
