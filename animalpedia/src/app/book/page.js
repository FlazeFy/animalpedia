"use client"
import GetNavbar from "@/components/bars/navbar"
import GetAnimalHeader from "@/components/containers/animal_header"

const builder_animal = [
    {
        animal_slug: "african_buffalo",
        animal_name: "African Buffalo",
        animal_latin_name: "Syncerus caffer caffer",
        animal_img_url: "/assets/samples/animals/buffalo.jpg",
        animal_region: "Rainforest",
        animal_zone: "Africa",
        animal_status: "Near Threatened",
        animal_category: "Mammal"
    }
]

export default function BookPage() {
    return <>
        <GetNavbar active="book"/>
        <div className="content-grid">
            {
                builder_animal.map((data, i, idx) => {
                    return (
                        <GetAnimalHeader builder={data}/>
                    );
                })
            }
        </div>
    </>
}