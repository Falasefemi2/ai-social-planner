import { SignUp } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

export default function Page() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-primary">
            <SignUp
                appearance={{
                    baseTheme: dark,
                }}
                path="/sign-up"
            />
        </div>
    );
}