import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    console.log("***** ADMIN SEEDING STARTED ****");
    const adminData = {
      name: "Foysal",
      email: "admin.foysal@gmail.com",
      role: UserRole.ADMIN,
      password: "admin1234",
      phone: "01869631974",
    };

    console.log("**** Cheching Admin Exists  or Not ****");

    const existUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existUser) {
      throw new Error("User already exists");
    }

    console.log("**** No Admin Found ****");
    console.log("**** Creating Admin ****");

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: process.env.APP_URL!,
        },
        body: JSON.stringify(adminData),
      },
    );

    console.log("**** Admin Created ****");
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("**** Email Varification Status Updated ****");
    }
    console.log("***** SUCCESSFULLY SEEDED ADMIN *****");
  } catch (err) {
    console.log(err);
  }
}

seedAdmin();
