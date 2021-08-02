var data = {
  labels: { horizontalLabel },
  datasets: [
    {
      label: this.props.rowTwoTotals.labelOne,
      borderColor: "rgba(0,0,0,.09)",
      borderWidth: "1",
      backgroundColor: "rgba(0,0,0,.07)",
      data: this.props.rowTwoTotals.data[1],
    },
    {
      label: this.props.rowTwoTotals.labelTwo,
      borderColor: "rgba(0, 123, 255, 0.9)",
      borderWidth: "1",
      backgroundColor: "rgba(0, 123, 255, 0.5)",
      pointHighlightStroke: "rgba(26,179,148,1)",
      data: this.props.rowTwoTotals.data[0],
    },
  ],
};

labelOne: 2019-2021
data[1]: money to match each month

labelTwo: 2017-2019
data[0]: money to match each month

horizontalLabel = Array (25)
0: "July"
1: "August"
2: "September"
3: "October"
4: "November"
5: "December"
6: "January"
7: "March"
8: "March"
9: "April"
10: "May"
11: "June"
12: "July"
13: "August"
14: "September"
15: "October"
16: "November"
17: "December"
18: "January"
19: "March"
20: "March"
21: "April"
22: "May"
23: "June"
24: "July"
