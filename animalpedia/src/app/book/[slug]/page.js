// Component
import GetFooter from "@/components/bars/footer";
import GetNavbar from "@/components/bars/navbar";
import GetAnimalDetail from "./usecases/getAnimalDetail";

export default function DetailPage({ params }) {
  return <>
    <GetNavbar active="book"/>
    <div className="content-grid">
        <div style={{minHeight:"100vh"}}>
          <GetAnimalDetail ctx="get_animal_detail" slug={params.slug}/>
        </div>
        <GetFooter/>
    </div>
  </>
}