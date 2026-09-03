import { TaskService } from '../../app/tasks/task.service';

describe('TaskService', () => {
  let service: TaskService;
  
  beforeEach(() => {
    service = new TaskService();
  });

  it('deve adicionar uma tarefa e atualizar o contador de criadas', () => {
    const initialCreated = service.created();
    service.addTask({ title: 'Nova tarefa', description: 'Descrição da tarefa' });
    expect(service.tasks()).toHaveLength(2);
    expect(service.created()).toBe(initialCreated + 1);
    expect(service.tasks().some((task) => task.title === 'Nova tarefa')).toBe(true);
  });

  it('deve remover uma tarefa e atualizar o contador de excluídas', () => {
    const task = service.tasks()[0];
    service.removeTask(task.id);
    expect(service.tasks()).toHaveLength(0);
    expect(service.deleted()).toBe(1);
  });

  it('deve alternar a conclusão de uma tarefa e atualizar o contador de concluídas', () => {
    const task = service.tasks()[0];
    service.toggleCompletion(task.id);
    expect(service.getTask(task.id)?.completed).toBe(true);
    expect(service.completed()).toBe(1);
  });
});