using System.Collections.Generic;
using System.Drawing;
using SQLite;

namespace TimeCat.Core.Database.Models
{
    [Table("categories")]
    public class Category
    {
        [PrimaryKey]
        [AutoIncrement]
        public int Id { get; set; }

        /// <summary>
        ///     Gets the name of category
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     Gets the color of category label
        /// </summary>
        [Ignore]
        public Color Color
        {
            get => Color.FromArgb(ColorRgb);
            set => ColorRgb = value.ToArgb();
        }

        [Column("Color")]
        public int ColorRgb { get; set; }

        [Ignore]
        public IReadOnlyList<Category> Categories { get; set; }

        public int? CategoryId { get; set; }

        public override string ToString()
        {
            return $"{{ Id: {Id}, Name: {Name}, Color: {ColorTranslator.ToHtml(Color)} }}";
        }
    }
}
