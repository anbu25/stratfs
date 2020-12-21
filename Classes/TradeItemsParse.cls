public with sharing class TradeItemsParse {
  public Integer id;
  public String creditorName;
  public String firstName;
  public String lastName;
  public Double minPaymentPercentage;
  public Double balance;

  public static List<TradeItemsParse> parse(String json) {
    return (List<TradeItemsParse>) System.JSON.deserialize(
      json,
      List<TradeItemsParse>.class
    );
  }
}
