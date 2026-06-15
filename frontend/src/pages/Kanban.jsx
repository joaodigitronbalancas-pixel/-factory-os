import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import api from "../services/api";

export default function Kanban() {
  const [dados, setDados] = useState({});

  useEffect(() => {
    carregar();
  }, []);

  const carregar = () => {
    api.get("/producao/kanban").then(res => {
      setDados(res.data);
    });
  };

  const atualizarStatus = async (opId, novoStatus) => {
    await api.post("/apontamentos", {
      op_id: opId,
      usuario_id: 1,
      setor: novoStatus,
      status: "INICIADO"
    });

    carregar();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const opId = result.draggableId;
    const novoStatus = result.destination.droppableId;

    atualizarStatus(opId, novoStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 20 }}>

        {Object.keys(dados).map((coluna) => (
          
          <Droppable droppableId={coluna} key={coluna}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: 200,
                  background: "#eee",
                  padding: 10
                }}
              >
                <h3>{coluna}</h3>

                {dados[coluna]?.map((op, index) => (
                  <Draggable key={op.id} draggableId={String(op.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: 10,
                          margin: "10px 0",
                          background: "#fff",
                          border: "1px solid #ccc"
                        }}
                      >
                        {op.numero_op}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

        ))}

      </div>
    </DragDropContext>
  );
}