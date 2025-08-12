import { Suspense } from "react";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
 return (
        <Suspense fallback={null}>
            <NavbarClient />
        </Suspense>
    );
}