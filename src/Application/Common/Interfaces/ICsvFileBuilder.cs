using Innov8techApi.Application.TodoLists.Queries.ExportTodos;

namespace Innov8techApi.Application.Common.Interfaces;

public interface ICsvFileBuilder
{
    byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
}
