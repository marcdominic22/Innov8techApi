using Innov8techApi.Application.Common.Mappings;
using Innov8techApi.Domain.Entities;

namespace Innov8techApi.Application.TodoItems.Queries.GetTodoItemsWithPagination;

public class TodoItemBriefDto : IMapFrom<TodoItem>
{
    public int Id { get; set; }

    public int ListId { get; set; }

    public string? Title { get; set; }

    public bool Done { get; set; }
}
