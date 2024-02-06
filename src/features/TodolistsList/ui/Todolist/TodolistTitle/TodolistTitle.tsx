import React from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";

type Props = {
  todolist: TodolistDomainType
}
export const TodolistTitle = ({todolist}: Props) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);
  const removeTodolistHAndler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCb =
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title });
    };

  return (
    <h3>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleCb} />
      <IconButton onClick={removeTodolistHAndler} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};

