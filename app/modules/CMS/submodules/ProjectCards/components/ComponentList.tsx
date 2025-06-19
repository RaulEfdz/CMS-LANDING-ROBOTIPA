import { Project } from "../types";

interface Props {
  items: Project[];
  onEdit: (item: Project) => void;
  onDelete: (id: string) => void;
}

export function ComponentList({ items, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Tecnologías</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.technologies.join(", ")}</td>
              <td>
                <button className="btn" onClick={() => onEdit(item)}>
                  Editar
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => onDelete(item.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
