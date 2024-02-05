"use client"

// Components
import GetFooter from "@/components/bars/footer"
import GetNavbar from "@/components/bars/navbar"

// Usecases
import GetCreator from "./usecases/getCreator"

// Usecases

export default function AboutPage() {
    return <>
        <GetNavbar active="about"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetCreator/>
            </div>
            <GetFooter/>
        </div>
    </>
}