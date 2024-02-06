import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/model/tasks/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/model/todolists/todolists.selectors";
import { Todolist } from "./Todolist/Todolist";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    addTodolist: addTodolistThunk,
    fetchTodolists
  } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  // const removeTask = useCallback(function(taskId: string, todolistId: string) {
  //   removeTaskThunk({ taskId, todolistId });
  // }, []);

  // const addTask = useCallback(function(title: string, todolistId: string) {
  //   addTaskThunk({ title, todolistId });
  // }, []);

  // const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
  //   updateTask({ taskId, domainModel: { status }, todolistId });
  // }, []);
  //
  // const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
  //   updateTask({ taskId, domainModel: { title }, todolistId });
  // }, []);

  // const changeFilter = useCallback(function(filter: FilterValuesType, id: string) {
  //   changeTodolistFilter({ id, filter });
  // }, []);
  //
  // const removeTodolist = useCallback(function(id: string) {
  //   removeTodolistThunk(id);
  // }, []);
  //
  // const changeTodolistTitle = useCallback(function(id: string, title: string) {
  //   changeTodolistTitleThunk({ id, title });
  // }, []);

  const addTodolist = useCallback((title: string) => {
    addTodolistThunk(title);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
