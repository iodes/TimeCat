namespace TimeCat.Proto.Commons
{
    public partial class NullableInt32
    {
        public static implicit operator int?(NullableInt32 other)
        {
            return other == null ? (int?)null : other.Value;
        }

        public static implicit operator NullableInt32(int? other)
        {
            return other == null ? null : new NullableInt32 { Value = other.Value };
        }
    }
}
