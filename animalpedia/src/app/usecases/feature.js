import GetBreakLine from "../../components/others/breakLine";

export default function GetFeature({ctx}) {
    return (
        <>
            <GetBreakLine length={3}/>
            <div className='mt-4 text-center row' id={ctx}>
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <GetBreakLine length={3}/>
                    <div id="carouselExampleSlidesOnly" className="carousel slide mt-4" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div class="carousel-item active">
                                <img src="http://localhost:3000/assets/background/animalpedia.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
                                <h4 className="text-white">Get to know about animal profile</h4>
                            </div>
                            <div className="carousel-item">
                                <img src="http://localhost:3000/assets/background/news.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
                                <h4 className="text-white">See every news about animal environment around the world</h4>
                            </div>
                            <div className="carousel-item">
                                <img src="http://localhost:3000/assets/wishlist.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
                                <h4 className="text-white">See all stats to get a new knowledge and insight</h4>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <GetBreakLine length={5}/>
                    <h1 style={{fontSize:"var(--textXJumbo)"}}>OUR FEATURE</h1>
                    <GetBreakLine length={1}/>
                    <h6 className="text-white" style={{fontSize:"var(--textJumbo)"}}>We have many feature to make sure you can get information about animal as many as possible</h6>
                </div> 
            </div>
            <GetBreakLine length={5}/>
        </>
    )
}