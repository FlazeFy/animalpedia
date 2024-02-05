"use client"

import GetFooter from "@/components/bars/footer";
import GetNavbar from "@/components/bars/navbar";
import GetBreakLine from "@/components/others/breakLine";
import GetDctIntro from "./usecases/dct_intro";
import GetFeature from "./usecases/feature";
import GetWelcoming from "./usecases/welcoming";

const animalRegion = [
  'Tundra','Taiga','Savannah','Rainforest','Desert','Temperate'
]

const animalZone = [
  'Asia','Europe','Oceania','Antartica','South America','North America','Africa'
]

const animalStatus = [
  'Not Evaluated','Least Concern', 'Vulnerable','Critically Endangered','Near Threatened','Endangered'
]

const animalCategory = [
  'Reptile','Mammal','Bird','Arthropod','Amphibian'
]

const Home_Index = () => {
    return <>
        <GetNavbar active="home"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetBreakLine length={2}/>
                <GetWelcoming ctx="welcoming"/>
                <GetBreakLine length={2}/>
                <GetFeature ctx="feature"/>
                <GetBreakLine length={2}/>
                <GetDctIntro ctx="ANIMALS FROM VARIOUS REGION..." img="http://localhost:3000/assets/background/region.png" items={animalRegion}/>
                <GetBreakLine length={2}/>
                <GetDctIntro ctx="VARIOUS ZONE" img="http://localhost:3000/assets/background/zone.png" items={animalZone}/>
                <GetBreakLine length={2}/>
                <GetDctIntro ctx="VARIOUS STATUS" img="http://localhost:3000/assets/background/status.png" items={animalStatus}/>
                <GetBreakLine length={2}/>
                <GetDctIntro ctx="VARIOUS CATEGORY" img="http://localhost:3000/assets/background/category.png" items={animalCategory}/>
                <GetBreakLine length={2}/>
            </div>
            <GetFooter/>
        </div>
    </>
}

export default Home_Index;