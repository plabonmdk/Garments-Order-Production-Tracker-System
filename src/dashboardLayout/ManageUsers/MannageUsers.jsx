import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/users`);
      return res.data;
    },
  });

  const updateUser = async (id, payload) => {
    const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/users/${id}`, payload);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Success", "User updated successfully", "success");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className="font-semibold">{user.role}</span>
                <br />
                <span
                  className={
                    user.status === "active"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {user.status}
                </span>
              </td>

              <td className="flex gap-2">
                <button
                  onClick={() => updateUser(user._id, { role: "manager" })}
                  className="btn btn-xs btn-info"
                >
                  Make Manager
                </button>

                <button
                  onClick={() => updateUser(user._id, { role: "buyer" })}
                  className="btn btn-xs btn-success"
                >
                  Make Buyer
                </button>

                <button
                  onClick={() =>
                    updateUser(user._id, { status: "suspended" })
                  }
                  className="btn btn-xs btn-warning"
                >
                  Suspend
                </button>

                <button
                  onClick={() => updateUser(user._id, { status: "active" })}
                  className="btn btn-xs btn-primary"
                >
                  Activate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
