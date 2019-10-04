using System;

namespace TimeCat.Core.Mapper
{
    public static class EnumMapper
    {
        public static object Map(Type enumType, object enumValue)
        {
            if (enumValue?.GetType().IsEnum == false)
                return null;
            
            var valueName = Enum.GetName(enumValue.GetType(), enumValue);

            if (string.IsNullOrEmpty(valueName))
                return null;

            if (Enum.TryParse(enumType, valueName, true, out object result))
                return result;

            var value = (int) enumValue;
            
            if (Enum.IsDefined(enumType, value))
                return Enum.ToObject(enumType, value);

            return null;
        }
    }
}
