import React from "react";
import CardViewAssetsTable from "../../components/CardViewAssetsTable";

interface ViewAssetsProps {}

const ViewAssets: React.FC<ViewAssetsProps> = () => {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        <CardViewAssetsTable />
      </div>
    </div>
  );
};

export default ViewAssets;
