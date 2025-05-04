import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateUsernameForm from "./UpdateUsernameForm";

export default function SettingsInfo() {
  return (
    <div className="space-y-12">
      <UpdatePasswordForm />
      <UpdateUsernameForm />
    </div>
  );
}
