using SQLite;

namespace TimeCat.Core.Database.Models
{
    [Table("activities")]
    public class Activity
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }
    }
}
