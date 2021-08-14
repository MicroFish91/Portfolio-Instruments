import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardAddSnapshotsForm from "../../components/CardAddSnapshotsForm";
import CardAddSnapshotsTable from "../../components/CardAddSnapshotsTable";
import { selectBenchmarkTitle } from "../../redux/Benchmarks/benchmarkSelector";
import { postSnapshotAction } from "../../redux/Snapshots/snapshotSlice";
import { HoldingForm, SnapshotForm } from "../../validation/types";
import { Account, Holding, Snapshot } from "./types";

const AddSnapshots = () => {
  const [snapshot, setSnapshot] = useState<Snapshot>([]);
  const benchmark = useSelector(selectBenchmarkTitle);
  const dispatch = useDispatch();

  const addHolding = (holding: HoldingForm) => {
    const newSnapshot: Snapshot = [...snapshot];
    const newHolding: Holding = {
      holdingTitle: holding.holdingTitle,
      holdingTicker: holding.holdingTicker,
      holdingExpenseRatio: parseFloat(
        parseFloat(holding.holdingExpenseRatio).toFixed(2)
      ),
      holdingAmount: parseFloat(parseFloat(holding.holdingAmount).toFixed(2)),
      assetType: holding.assetType,
    };
    let accountNameExists = false;

    newSnapshot.forEach((account) => {
      if (account.accountName === holding.holdingLocation.toLowerCase()) {
        if (
          account.accountType[holding.accountType.toLowerCase()].length !== 0
        ) {
          // If account name and account type exist
          const tickerIndex = account.accountType[
            holding.accountType.toLowerCase()
          ].findIndex(
            (accountHolding) =>
              holding.holdingTicker === accountHolding.holdingTicker
          );

          if (tickerIndex !== -1) {
            // Ticker already exists
            account.accountType[holding.accountType.toLowerCase()][
              tickerIndex
            ] = newHolding;
          } else {
            // But unique ticker
            account.accountType[holding.accountType.toLowerCase()].push(
              newHolding
            );
          }
        } else {
          // If account name exists but account type does not exist
          account.accountType[holding.accountType.toLowerCase()] = [newHolding];
        }
        accountNameExists = true;
      }
    });

    if (!accountNameExists) {
      const newAccount: Account = {
        accountName: holding.holdingLocation.toLowerCase(),
        accountType: {
          traditional: [],
          roth: [],
          taxable: [],
        },
      };
      newAccount.accountType[holding.accountType.toLowerCase()].push(
        newHolding
      );
      newSnapshot.push(newAccount);
    }

    setSnapshot(newSnapshot);
  };

  const deleteHolding = (
    _e: React.MouseEvent<HTMLElement>,
    accountName: string,
    accountType: string,
    holdingTicker: string
  ) => {
    const newSnapshot = [...snapshot];
    let accIndex = 0;

    newSnapshot.forEach((account, accountIndex) => {
      if (account.accountName === accountName) {
        accIndex = accountIndex;
        account.accountType[accountType].forEach((holding, holdingIndex) => {
          if (holding.holdingTicker === holdingTicker) {
            newSnapshot[accountIndex].accountType[accountType].splice(
              holdingIndex,
              1
            );
          }
        });
      }
    });

    // If all account arrays are empty, clear object from array
    if (
      newSnapshot[accIndex].accountType.roth.length === 0 &&
      newSnapshot[accIndex].accountType.traditional.length === 0 &&
      newSnapshot[accIndex].accountType.taxable.length === 0
    ) {
      newSnapshot.splice(accIndex, 1);
    }

    setSnapshot(newSnapshot);
  };

  const resetSnapshotData = () => {
    setSnapshot([]);
  };

  const submitSnapshotData = (snapshotParams: SnapshotForm) => {
    const outgoingSnapshot = {
      ...snapshotParams,
      snapshotBenchmark: benchmark,
      accounts: snapshot,
    };
    dispatch(postSnapshotAction(outgoingSnapshot));
  };

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        <CardAddSnapshotsForm addHolding={addHolding} />
        <CardAddSnapshotsTable
          deleteHolding={deleteHolding}
          resetSnapshotData={resetSnapshotData}
          submitSnapshotData={submitSnapshotData}
          snapshot={snapshot}
        />
      </div>
    </div>
  );
};

export default AddSnapshots;
