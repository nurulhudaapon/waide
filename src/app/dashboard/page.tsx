import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
    async function handleLogout() {
        "use server";
        const cookieStore = cookies();
        cookieStore.delete("user");
        return redirect("/user/login");
    }
    
    return <main>
        <h1>Dashboard</h1>
        <form action={handleLogout}>
            <input type="submit" value="Logout" />
        </form>
    </main>
}