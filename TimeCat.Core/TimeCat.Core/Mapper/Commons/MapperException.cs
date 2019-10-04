using System;

namespace TimeCat.Core.Mapper
{
    public class MapperException : SystemException
    {
        public MapperException(string message) : base(message) 
        {
        }
    }
}
