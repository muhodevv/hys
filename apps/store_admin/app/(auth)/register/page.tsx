"use client"

import FeaturesSlider from "./components/FeaturesSlider";
import StartForm from "./components/StartForm";

export default function RegisterPage() {
    return (
        <div className="block lg:flex items-start gap-x-2">
            <div className="lg:flex-1 m-8">
                <h1 className="font-bold text-2xl px-4 py-4 mb-4">Ecom</h1>
                <StartForm />
            </div>
            <div className="hidden lg:flex h-screen sticky top-0 items-stretch md:flex-1 ml-8">
                <FeaturesSlider />
            </div>
        </div>
    );
}