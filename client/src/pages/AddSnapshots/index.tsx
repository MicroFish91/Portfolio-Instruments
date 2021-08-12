import React from "react";
import CardAddSnapshotsForm from "../../components/CardAddSnapshotsForm";
import CardAddSnapshotsTable from "../../components/CardAddSnapshotsTable";

interface AddSnapshotsProps {}

const AddSnapshots: React.FC<AddSnapshotsProps> = () => {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        <CardAddSnapshotsForm />
        <CardAddSnapshotsTable />
      </div>
    </div>
  );
};

export default AddSnapshots;
