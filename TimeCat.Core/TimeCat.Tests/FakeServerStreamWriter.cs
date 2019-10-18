using System;
using System.Threading.Tasks;
using Grpc.Core;

namespace TimeCat.Tests
{

    class FakeServerStreamWriter<T> : IServerStreamWriter<T>
    {
        public WriteOptions WriteOptions { get; set; }

        public event Action<T> Received = null;

        public async Task WriteAsync(T message)
        {
            Received?.Invoke(message);
        }
    }
}
