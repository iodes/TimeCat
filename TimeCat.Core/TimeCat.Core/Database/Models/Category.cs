using SQLite;

namespace TimeCat.Core.Database.Models
{
    [Table("categories")]
    public class Category
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        /// <summary>
        /// Gets the name of category
        /// </summary>
        public string Name { get; set; }
    }
}
