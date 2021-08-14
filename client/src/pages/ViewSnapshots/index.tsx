import React from "react";
import CardViewSnapshotsTable from "../../components/CardViewSnapshotsTable";

interface AddSnapshotsProps {}

const AddSnapshots: React.FC<AddSnapshotsProps> = () => {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        <CardViewSnapshotsTable />
      </div>
    </div>
  );
};

export default AddSnapshots;
