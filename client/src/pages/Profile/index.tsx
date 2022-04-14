import CAGSettingsForm from "../../components/Profile/CAGSettingsForm";
import DeleteAccountForm from "../../components/Profile/DeleteAccountForm";
import ExportDataForm from "../../components/Profile/ExportDataForm";
import NotificationForm from "../../components/Profile/NotificationForm";
import PasswordForm from "../../components/Profile/PasswordForm";

const Profile = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <NotificationForm />
        <CAGSettingsForm />
        <PasswordForm />
        <ExportDataForm />
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default Profile;
