import React from "react";
import { Button } from "@mui/material";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions
} from "features/TodolistsList/model/todolists/todolists.reducer";
import { useActions } from "common/hooks";

type Props = {
  todolist: TodolistDomainType
}
export const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeTaskFilterHandler = (filter: FilterValuesType) => changeTodolistFilter({ filter, id: todolist.id });

  return (
    <div style={{ paddingTop: "10px" }}>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        onClick={() => changeTaskFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => changeTaskFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTaskFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </div>
  );
};

