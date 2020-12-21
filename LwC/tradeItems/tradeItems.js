import { LightningElement, wire, track } from "lwc";
import fetchTradeItems from "@salesforce/apex/TradeItems.fetchTradeItems";

const columns = [
  {
    label: "Creditor",
    fieldName: "creditorName",
    type: "text",
    editable: "true"
  },
  {
    label: "First Name",
    fieldName: "firstName",
    type: "text",
    editable: "true"
  },
  { label: "Last Name", fieldName: "lastName", type: "text", editable: "true" },
  {
    label: "Min Pay%",
    fieldName: "minPaymentPercentage",
    type: "number",
    editable: "true"
  },
  { label: "Balance", fieldName: "balance", type: "currency", editable: "true" }
];

export default class TradeItems extends LightningElement {
  @track tradeItemData = [];
  @track totalRowCount;
  @track totalCheckCount = 0;
  @track totalBalance = 0;
  columns = columns;
  selectedItemId = [];

  @wire(fetchTradeItems)
  wiredTradeItems({ data, error }) {
    if (data) {
      this.tradeItemData = data;
      this.totalRowCount = this.tradeItemData.length;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.tradeItemData = undefined;
    }
  }

  handleAdd(event) {
    let newItem = [
      {
        id: this.tradeItemData.length + 1,
        creditorName: "",
        firstName: "",
        lastName: "",
        minPaymentPercentage: "",
        balance: ""
      }
    ];
    this.tradeItemData = this.tradeItemData.concat(newItem);
    this.totalRowCount = this.tradeItemData.length;
  }

  handleRemove(event) {
    this.totalRowCount =
      Number(this.tradeItemData.length) - Number(this.selectedItemId.length);
    this.tradeItemData = this.tradeItemData.filter((element) => {
      return !this.selectedItemId.includes(element.id);
    });
  }

  getSelectedId(event) {
    const selectedRows = event.detail.selectedRows;
    let sumTotalBalance = 0;
    let currentSelection = [];
    for (let i = 0; i < selectedRows.length; i++) {
      currentSelection.push(selectedRows[i].id);
      sumTotalBalance += Number(selectedRows[i].balance);
    }
    this.selectedItemId = currentSelection;
    this.totalBalance = sumTotalBalance;
    this.totalCheckCount = selectedRows.length;
  }

  handleSave(event) {
    const saveDraftValues = event.detail.draftValues;
    this.tradeItemData = this.tradeItemData.filter((element) => {
      return element.id.toString() !== saveDraftValues[0].id.toString();
    });
    this.tradeItemData = this.tradeItemData.concat(saveDraftValues);
    this.template.querySelector("lightning-datatable").draftValues = [];
  }
}
