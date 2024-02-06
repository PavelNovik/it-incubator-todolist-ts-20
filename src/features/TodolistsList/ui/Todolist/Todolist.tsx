import React, { useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Task } from "./Task/Task";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "features/TodolistsList/api/task/task.api.types";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
};

export const Todolist = React.memo(function({ todolist, tasks }: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);


  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCb =
    (title: string) => {
      addTask({ title, todolistId: todolist.id });
    };

  const removeTodolistHAndler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCb =
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title });
    };


  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleCb} />
        <IconButton onClick={removeTodolistHAndler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={todolist.id}
          />
        ))}
      </div>
      <FilterTasksButtons todolist={todolist}/>
    </div>
  );
});
