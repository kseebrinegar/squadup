using Xunit;
using squadup;

namespace squadup.Tests
{
    public class UnitTest1
    {
        private readonly squadup.UnitTest1 _unitTest1;

        public UnitTest1()
        {
            _unitTest1 = new squadup.UnitTest1();
        }

        [Fact]
        public void ReturnFalseGivenValueOf1()
        {
            var result = _unitTest1.IsPrime(1);

            Assert.False(result, "1 should not be prime");
        }
    }
}