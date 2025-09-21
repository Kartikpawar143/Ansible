// Simple To-Do app with localStorage persistence
(() => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const listEl = document.getElementById('todo-list');
  const itemsLeft = document.getElementById('items-left');
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const clearBtn = document.getElementById('clear-btn');

  const STORAGE_KEY = 'simple_todo_v1';

  let todos = []; // { id, text, completed }

  // --- Persistence ---
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      todos = raw ? JSON.parse(raw) : [];
    } catch {
      todos = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  // --- Rendering ---
  let activeFilter = 'all'; // all | active | completed

  function render() {
    // filter
    const filtered = todos.filter(t => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'active') return !t.completed;
      return t.completed;
    });

    // clear
    listEl.innerHTML = '';

    if (filtered.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'todo-item';
      empty.textContent = 'No tasks here — add one!';
      empty.style.opacity = '0.6';
      listEl.appendChild(empty);
    } else {
      for (const todo of filtered) {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        li.dataset.id = todo.id;

        // checkbox
        const cb = document.createElement('button');
        cb.className = 'checkbox' + (todo.completed ? ' checked' : '');
        cb.setAttribute('aria-pressed', String(!!todo.completed));
        cb.title = todo.completed ? 'Mark as active' : 'Mark as completed';
        cb.addEventListener('click', () => toggleComplete(todo.id));
        cb.innerHTML = todo.completed ? '✓' : '';

        // text
        const span = document.createElement('div');
        span.className = 'todo-text';
        span.textContent = todo.text;

        // delete
        const del = document.createElement('button');
        del.className = 'delete-btn';
        del.title = 'Delete task';
        del.textContent = 'Delete';
        del.addEventListener('click', () => removeTodo(todo.id));

        li.appendChild(cb);
        li.appendChild(span);
        li.appendChild(del);
        listEl.appendChild(li);
      }
    }

    // items left
    const left = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${left} item${left !== 1 ? 's' : ''} left`;
  }

  // --- Actions ---
  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
      text: trimmed,
      completed: false
    };
    todos.unshift(item); // newest on top
    save();
    render();
  }

  function toggleComplete(id) {
    const t = todos.find(x => x.id === id);
    if (!t) return;
    t.completed = !t.completed;
    save();
    render();
  }

  function removeTodo(id) {
    todos = todos.filter(x => x.id !== id);
    save();
    render();
  }

  function clearCompleted() {
    todos = todos.filter(x => !x.completed);
    save();
    render();
  }

  // --- Events ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
    input.focus();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      filterBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  clearBtn.addEventListener('click', () => {
    clearCompleted();
  });

  // keyboard accessibility: Enter in list toggles item if focused on checkbox? (we've used buttons so default works)
  // --- Init ---
  load();
  render();

  // Expose for console debugging (optional)
  window._todoApp = {
    add: addTodo,
    toggle: toggleComplete,
    remove: removeTodo,
    clear: clearCompleted,
    all: () => todos
  };
})();

