using System;
using SQLite;
using TimeCat.Core.Commons;

namespace TimeCat.Core.Database.Models
{
    [Table("activities")]
    public class Activity
    {
        [PrimaryKey]
        [AutoIncrement]
        public int Id { get; set; }

        public int ApplicationId { get; set; }

        /// <summary>
        ///     Gets the action type of the activity
        /// </summary>
        public ActionType Action { get; set; }

        /// <summary>
        ///     Gets the action time of the activity
        /// </summary>
        public DateTimeOffset Time { get; set; }
    }
}
