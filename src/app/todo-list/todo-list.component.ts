import { Component } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos : Todo[] = [];
  newTodo : string;

  saveTodo() {
    if(this.newTodo) {
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = true
      this.todos.push(todo);
      this.newTodo = '';
    } else {
      alert('Please Enter Todo');
    }
  }

  done(id:number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id:number) {
    this.todos = this.todos.filter((v,i)=> i !== id);
  }

}
