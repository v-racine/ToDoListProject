const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

 //tests:
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns a copy of the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });
 
  test('calling first returns the first item in the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last item in the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first item in the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  }); 

  test('calling pop removes and returns the last item in the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns true if all items on list are done', () => {
    expect(list.isDone()).toBe(false);
  });

  test('calling add throws errir when non todo item is added', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add("poop")).toThrow(TypeError);
    expect(() => list.add(new TodoList("my list"))).toThrow(TypeError);
  });  

  test('itemAt returns the item at a given index', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(list.itemAt(2)).toEqual(todo3);
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
  });

  test('markDoneAt marks a specific item at a given index as done', () => {
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);

    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt marks a specific item at a given index as NOT done', () => {
    expect(() => list.markUndoneAt(5)).toThrow(ReferenceError);
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(2);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markAllDone marks every item on the list as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes an item at a specific index', () => {
    expect(() => list.removeAt(5)).toThrow(ReferenceError);
    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns a string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });
  
  test('toString returns different string for done todo', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    list.markDoneAt(1);

    expect(list.toString()).toBe(string);
  });
  

  test('toString returns different string when all items are done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();

    expect(list.toString()).toBe(string);
  });
  
  test('forEach iterates over all the items on the list', () => {
    let result = [];
    list.forEach(todo => result.push(todo));
  
    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns a new list with select items', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);
  
    expect(newList.title).toBe(list.title);
  
    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

});