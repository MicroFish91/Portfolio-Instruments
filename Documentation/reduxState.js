// Designing a normalized redux state
// * https://redux.js.org/usage/structuring-reducers/normalizing-state-shape

const state = {};

// Initialize User (Fetch Data and populate as soon as we hit the dashboard page)
state.auth = {
  token: "jwtToken goes here",
  user: {
    email: "user.email",
    firstName: "user.firstName",
    lastName: "user.lastName",
  },
  isLoading: true || false,
  error: {},
};

// Initialize this upon login if snapshots exist, otherwise only update when we "set benchmark"
state.benchmark = {
  title: "Permanent Portfolio",
  types: ["tsm", "ltb", "gld", "mm"],
  ratios: [25, 25, 25, 25],
  isLoading: true || false,
  error: {},
};

// Only update on user initialization and when certain amount of time has collapsed OR new snapshot has been added
state.dashboard = {
  totals: {
    traditional: "Sum",
    roth: "Sum",
    taxable: "Sum",
    netWorth: "Sum",
    isLoading: true || false,
    error: {},
  },
  lineChart: {
    datasetOne: [],
    datasetTwo: [],
    isLoading: true || false,
    error: {},
  },
  taxShelter: {
    data: [], // Traditional, Roth, Taxable, NW
    isLoading: true || false,
    error: {},
  },
  holdingLocations: {
    names: [],
    ratios: [],
    isLoading: true || false,
    error: {},
  },
  benchmarkBalance: {
    data: [], // current benchmark asset ratios
    isLoading: true || false,
    error: {},
  },
  dateOfLastQuery:
};

state.snapshots = {
  byId: {
    snapshot1Id: {
      title: "snapshot1.title",
      benchmark: "snapshot1.benchmark",
      notes: "snapshot1.notes",
      total: "snapshot1.total",
      date: "snapshot1.specifiedDate",
    },
    snapshot2Id: {},
    // ....
  },
  allIds: ["snapshot1Id", "snapshot2Id"], // In order
  isLoading: true || false,
  error: {},
};

state.accounts = {
  byId: {
    account1Id: {
      location: "account1.location",
      type: "account1.type",
      total: "account1.total",
      fromSnapshot: "snapshot1Id",
    },
    account2Id: {},
    // ...
  },
  allIds: ["account1Id", "account2Id"],
  isLoading: true || false,
  error: {},
};

state.holdings = {
  byId: {
    holding1Id: {
      title: "holdings1.title",
      ticker: "holdings1.ticker",
      category: "holdings1.category",
      expenseRatio: "holdings1.expenseRatio",
      total: "holdings1.total",
      fromAccount: "account1Id",
    },
    holding2Id: {},
    // ...
  },
  allIds: ["holding1Id", "holding2Id"],
  isLoading: true || false,
  error: {},
};
