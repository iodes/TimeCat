using SQLite;

namespace TimeCat.Core.Database.Models
{
    [Table("applications")]
    public class Application
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        /// <summary>
        /// Gets the display name of the application
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets the full path of the application
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Gets the display icon path of the application
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// Gets the display version of the application
        /// </summary>
        public string Version { get; set; }
        
        public int CategoryId { get; set; }
    }
}
