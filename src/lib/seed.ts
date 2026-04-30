import User from "@/models/user";
import { USER_ROLES } from "@/types/user";

export const seedSuperAdmin = async () => {
  const adminEmail = process.env.SUPER_ADMIN_EMAIL;
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn("Super admin credentials not found in environment variables.");
    return;
  }

  const isExistSuperAdmin = await User.findOne({
    email: adminEmail,
    role: USER_ROLES.SUPER_ADMIN,
  });

  if (!isExistSuperAdmin) {
    console.log("Seeding super admin...");
    await User.create({
      name: "Administrator",
      email: adminEmail,
      role: USER_ROLES.SUPER_ADMIN,
      password: adminPassword,
      verified: true,
      status: "active",
    });
    console.log("Super admin seeded successfully.");
  }
};
