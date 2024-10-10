using Innov8techApi.Application.Common.Mappings;
using Innov8techApi.Domain.Entities;

namespace Innov8techApi.Application.TodoLists.Queries.ExportTodos;

public class TodoItemRecord : IMapFrom<TodoItem>
{
    public string? Title { get; set; }

    public bool Done { get; set; }
}
