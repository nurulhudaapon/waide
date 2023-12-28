import { cookies } from "next/headers";
import { getQuery } from "../../../query";
import { getConnection } from "../../../query/db";
import { hashPassword } from "./algo";
import { redirect } from "next/navigation";

const connection = getConnection();

export default async function UserSignUp() {
  async function handleSignin(formData: FormData) {
    "use server";

    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    let success = false;

    connection.query(
      getQuery("login_user"),
      Object.values(rawFormData),
      (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        const user = results?.at(0);
        if (!user) throw new Error("User not found!");

        const dbPassword = +user.password;
        const passedPassword = String(formData.get("password"));

        const dbHashedPassword = dbPassword;
        const hashedPassword = hashPassword(passedPassword);

        if (dbHashedPassword == hashedPassword)
         { console.log("Login successfull!");
        
        // set user in the cookie
        // redirect to dashboard
        const cookieStore = cookies()
        cookieStore.set('user', JSON.stringify(user));
        success = true;

        }
        else
          console.log("Incorrect passwrd!", {
            dbHashedPassword,
            dbPassword,
            passedPassword,
            hashedPassword,
          });
      }
    );

    return redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl h-[100vh] my-4 mx-auto align-center justify-center flex gap-10">
      <form
        action={handleSignin}
        className="flex flex-col justify-center gap-3"
      >
        <label>
          Email
          <input type="text" name="email" />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
