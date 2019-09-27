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
        /// Gets the color of category label
        /// </summary>
        [Ignore]
        public Color Color 
        {
            get => Color.FromArgb(ColorRgb);
            set => ColorRgb = value.ToArgb();
        }

        [Column("Color")]
        public int ColorRgb { get; set; }
    }
}
