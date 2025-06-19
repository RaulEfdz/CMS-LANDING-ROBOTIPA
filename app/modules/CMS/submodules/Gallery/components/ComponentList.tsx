import { GalleryImage } from "../types";

interface Props {
  items: GalleryImage[];
  onEdit: (item: GalleryImage) => void;
  onDelete: (id: string) => void;
}

export function ComponentList({ items, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
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
