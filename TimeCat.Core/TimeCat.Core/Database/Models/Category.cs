using SQLite;
using System.Drawing;

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

        /// <summary>
        /// Gets the color of category
        /// </summary>
        public Color Color { get; set; }
    }
}
