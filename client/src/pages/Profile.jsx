import DashboardLayout from "../layouts/DashboardLayout";

const Profile = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <DashboardLayout>

      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg">

        <h1 className="text-3xl font-bold mb-6">
          Admin Profile
        </h1>

        <div className="space-y-5">

          <div>
            <p className="text-gray-400">
              Name
            </p>

            <h2 className="text-2xl">
              {
                user?.user?.name
              }
            </h2>
          </div>

          <div>
            <p className="text-gray-400">
              Email
            </p>

            <h2 className="text-2xl">
              {
                user?.user?.email
              }
            </h2>
          </div>

        </div>
      </div>

    </DashboardLayout>
  );
};

export default Profile;