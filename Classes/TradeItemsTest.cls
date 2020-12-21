@isTest
public class TradeItemsTest {
  @isTest
  static void testGetCallout() {
    StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
    mock.setStaticResource('stratfs_sample');
    mock.setStatusCode(200);
    mock.setHeader('Content-Type', 'application/json;charset=UTF-8');
    Test.setMock(HttpCalloutMock.class, mock);
    List<Object> tradeItemList = TradeItems.fetchTradeItems();
    System.assertEquals(10, tradeItemList.size(), 'The array length is 10.');
  }
}
