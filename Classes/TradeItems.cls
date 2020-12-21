public with sharing class TradeItems {
  /*
    Anbu 12/20 : Util class with methods to fetch data from StratFS sample data.
    */
  @AuraEnabled(cacheable=true)
  public static List<Object> fetchTradeItems() {
    List<Object> tradeItemList = new List<Object>();
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint('callout:Stfs_Data');
    request.setMethod('GET');
    HttpResponse response = http.send(request);
    if (response.getStatusCode() == 200) {
      tradeItemList = (List<Object>) JSON.deserializeUntyped(
        response.getBody()
      );
    }
    return tradeItemList;
  }
}
