using Innov8techApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Innov8techApi.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
