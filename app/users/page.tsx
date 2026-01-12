import Section from "@/components/util/Section";
import { prisma } from "@/lib/db/client";

const UserPage = async () => {
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <>
      <Section>
        <h2 className="text-xl">Users</h2>
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-amber-50 rounded text-gray-800">
            <div className="flex space-x-2 ">
              <div>{user.name}</div>
              <div>{user.email}</div>
            </div>
            <div>Role: {user.role}</div>
          </div>
        ))}
      </Section>
    </>
  );
};

export default UserPage;
