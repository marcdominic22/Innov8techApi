using System.Globalization;
using Innov8techApi.Application.Common.Interfaces;
using Innov8techApi.Application.TodoLists.Queries.ExportTodos;
using Innov8techApi.Infrastructure.Files.Maps;
using CsvHelper;

namespace Innov8techApi.Infrastructure.Files;

public class CsvFileBuilder : ICsvFileBuilder
{
    public byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records)
    {
        using var memoryStream = new MemoryStream();
        using (var streamWriter = new StreamWriter(memoryStream))
        {
            using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

            csvWriter.Configuration.RegisterClassMap<TodoItemRecordMap>();
            csvWriter.WriteRecords(records);
        }

        return memoryStream.ToArray();
    }
}
