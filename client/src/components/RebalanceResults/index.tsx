import AccountRebalance from "./AccountRebalance";
import AssetRebalance from "./AssetRebalance";
import VPRebalance from "./VPRebalance";

const RebalanceResults = () => {
  return (
    <>
      <AssetRebalance />
      <VPRebalance />
      <AccountRebalance />
    </>
  );
};

export default RebalanceResults;
