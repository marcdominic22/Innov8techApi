using System.Globalization;
using Innov8techApi.Application.TodoLists.Queries.ExportTodos;
using CsvHelper.Configuration;

namespace Innov8techApi.Infrastructure.Files.Maps;

public class TodoItemRecordMap : ClassMap<TodoItemRecord>
{
    public TodoItemRecordMap()
    {
        AutoMap(CultureInfo.InvariantCulture);

        Map(m => m.Done).ConvertUsing(c => c.Done ? "Yes" : "No");
    }
}
