"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetCreator from "./usecases/getCreator"

// Usecases

export default function AboutPage() {
    return <>
        <GetNavbar active="about"/>
        <div className="content-grid">
            <GetCreator/>
        </div>
    </>
}